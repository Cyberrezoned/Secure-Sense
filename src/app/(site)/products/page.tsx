import { permanentRedirect } from 'next/navigation';
import { cybersecurityCommunity } from '@/lib/company';

/** Legacy product links resolve to the ZeenTheCyber community hub. */
export default function ProductsPage() {
  permanentRedirect(cybersecurityCommunity.href);
}
