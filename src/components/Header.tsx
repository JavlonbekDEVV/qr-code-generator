import { useEffect, useState } from "react";
import { Menu, QrCode, X } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-emerald-800/60 bg-emerald-950/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400/10 ring-1 ring-lime-400/30">
            <QrCode className="h-5 w-5 text-lime-400" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-50">
            QR<span className="text-lime-400">gen</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex"></ul>

        {/* Desktop CTA */}
        <a href="#generator" className="hidden lg:inline-flex btn-primary">
          Create QR
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-800 text-gray-200 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-emerald-800/60 bg-emerald-950/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          <li className="mt-2">
            <a
              href="#generator"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full"
            >
              Create QR
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
