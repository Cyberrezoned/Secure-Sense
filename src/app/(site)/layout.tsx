import { SiteHeader } from '@/components/site-header';
import { BrandScope } from '@/components/brand-scope';
import { SiteFooter } from '@/components/site-footer';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { COMPANY_DESCRIPTION } from '@/lib/company';
import { CONTACT_EMAIL } from '@/lib/contact';

/** Public marketing chrome. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, alternateName: 'Sule Zeen', url: SITE_URL, description: COMPANY_DESCRIPTION, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/brand/sulezeen-logo.png` }, email: CONTACT_EMAIL, sameAs: ['https://github.com/Cyberrezoned'] },
          { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, alternateName: 'Sule Zeen', publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: 'en-NG' },
        ],
      }).replace(/</g, '\\u003c') }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <BrandScope>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </BrandScope>
    </>
  );
}
