"""Update the public headline index from publisher RSS feeds (standard library only)."""
import html
import json
from http.server import BaseHTTPRequestHandler
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from urllib.parse import parse_qs, urlsplit
from urllib.request import Request, urlopen

SOURCES = [
    ('cyber', 'UK National Cyber Security Centre', 'https://www.ncsc.gov.uk/api/1/services/v1/news-rss-feed.xml'),
    ('cyber', 'Center for Internet Security', 'https://www.cisecurity.org/feed/advisories'),
    ('supply', 'Food Business Africa', 'https://www.foodbusinessafrica.com/feed/'),
    ('supply', 'Supply Chain Dive', 'https://www.supplychaindive.com/feeds/news/'),
    ('studio', 'YouTube Blog', 'https://blog.youtube/rss/'),
    ('studio', 'Buffer', 'https://buffer.com/resources/rss/'),
]


def https_url(value):
    value = (value or '').strip()
    parsed = urlsplit(value)
    return value if parsed.scheme == 'https' and parsed.hostname and not parsed.username and not parsed.password else ''


class FeedDescription(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.image = ''

    def handle_data(self, text):
        self.parts.append(text)

    def handle_starttag(self, tag, attrs):
        if tag == 'img' and not self.image:
            self.image = https_url(dict(attrs).get('src'))


def read_feed(source):
    _, name, url = source
    request = Request(url, headers={'User-Agent': 'Secure-Sense-News/1.0', 'Accept': 'application/rss+xml, application/xml, text/xml'})
    with urlopen(request, timeout=7) as response:
        raw = response.read(4_000_001)
    if len(raw) > 4_000_000 or b'<!DOCTYPE' in raw.upper():
        raise ValueError('Unsupported feed document')
    items = []
    for entry in ET.fromstring(raw).findall('./channel/item'):
        title = ' '.join(html.unescape(entry.findtext('title') or '').split())
        try:
            link = https_url(entry.findtext('link'))
            published = parsedate_to_datetime(entry.findtext('pubDate') or '')
            if published.tzinfo is None:
                continue
            date = published.astimezone(timezone.utc)
        except (TypeError, ValueError, OverflowError):
            continue
        if not title or not link or date > datetime.now(timezone.utc):
            continue
        description = FeedDescription()
        description.feed(entry.findtext('description') or '')
        words = ' '.join(description.parts).split()
        excerpt = ' '.join(words[:24]) + ('\u2026' if len(words) > 24 else '')
        media = entry.find('{http://search.yahoo.com/mrss/}content')
        image = https_url(media.get('url')) if media is not None else description.image
        items.append({'title': title, 'url': link, 'date': date.isoformat(), 'publisher': name,
                      'excerpt': excerpt, 'image': image})
    if not items:
        raise ValueError('No dated stories in feed')
    unique = {item['url']: item for item in items}
    return sorted(unique.values(), key=lambda item: item['date'], reverse=True)[:4]

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        name = parse_qs(urlsplit(self.path).query).get('publisher', [''])[0]
        source = next((source for source in SOURCES if source[1] == name), None)
        if source is None:
            self.send_error(404)
            return
        try:
            items = read_feed(source)
        except Exception as error:
            print(f'{name}: {error}', flush=True)
            self.send_error(503, 'Publisher temporarily unavailable')
            return
        body = json.dumps(items, ensure_ascii=False).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'public, max-age=60, s-maxage=900, stale-while-revalidate=86400')
        self.end_headers()
        self.wfile.write(body)
