import { Logo } from '@/components/logo';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary glow-sm" />
              <span className="font-bold">Secure Sense</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground sm:text-left">
              The future of cybersecurity, today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Secure Sense. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
