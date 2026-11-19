"""Update the public headline index from publisher RSS feeds (standard library only)."""
import html
import json
import sys
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

SEED = Path(__file__).resolve().parents[1] / 'src/data/news/headlines.json'
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
    with urlopen(request, timeout=20) as response:
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
    return items


def refresh(index):
    baseline = index if index.exists() else SEED
    previous = json.loads(baseline.read_text(encoding='utf-8')) if baseline.exists() else {}
    updated = {}
    failures = []
    with ThreadPoolExecutor(max_workers=len(SOURCES)) as pool:
        pending = [(source, pool.submit(read_feed, source)) for source in SOURCES]
        for (topic, publisher, _), future in pending:
            retained = [item for item in previous.get(topic, []) if item['publisher'] == publisher]
            try:
                stories = future.result()
            except Exception as error:
                failures.append(publisher)
                print(f'{publisher}: {error}. Keeping previous headlines.', file=sys.stderr)
                stories = []
            unique = {item['url']: item for item in [*retained, *stories]}
            updated.setdefault(topic, []).extend(sorted(unique.values(), key=lambda item: item['date'], reverse=True)[:4])
    for topic, stories in updated.items():
        unique = {item['url']: item for item in stories}
        updated[topic] = sorted(unique.values(), key=lambda item: item['date'], reverse=True)
    if updated != previous or not index.exists():
        index.write_bytes((json.dumps(updated, indent=2, ensure_ascii=False) + '\n').encode('utf-8'))
    return int(len(failures) == len(SOURCES))


if __name__ == '__main__':
    sys.exit(refresh(Path(sys.argv[1]) if len(sys.argv) > 1 else SEED))
