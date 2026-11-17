import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { authorizeAdmin } from '@/lib/admin/access';
import { DocumentWorkspace } from '@/components/admin/document-workspace';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Private document workspace',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminPage() {
  // Defense in depth: the server page also rejects requests without credentials.
  const requestHeaders = await headers();
  const access = await authorizeAdmin(process.env, requestHeaders.get('authorization'));
  if (access.outcome !== 'allow') notFound();
  return <DocumentWorkspace />;
}
