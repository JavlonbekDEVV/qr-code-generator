import { QrCode } from 'lucide-react';

const LINKS = [
  { label: 'Generator', href: '#generator' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-emerald-800/50 py-12">
      <div className="container-page">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <a href="#top" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400/10 ring-1 ring-lime-400/30">
                <QrCode className="h-5 w-5 text-lime-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-50">
                QR<span className="text-lime-400">gen</span>
              </span>
            </a>
            <p className="max-w-xs text-center text-xs text-gray-600 sm:text-left">
              Create beautiful, customizable QR codes in seconds.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 transition-colors hover:text-lime-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-emerald-800/40 pt-6 text-center">
          <p className="text-xs text-gray-600">
            © 2026 QRgen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
