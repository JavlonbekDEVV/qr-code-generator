import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export function CTA() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <div
          ref={ref}
          className={`reveal ${visible ? '' : 'opacity-0'}`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-emerald-700/50 bg-gradient-to-br from-emerald-850 via-emerald-800 to-emerald-850 px-6 py-16 text-center sm:px-12 lg:py-20">
            {/* Glow accents */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-48 w-[500px] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[80px]" />
              <div className="absolute bottom-0 left-1/4 h-32 w-32 rounded-full bg-lime-500/5 blur-[60px]" />
              <div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-emerald-500/10 blur-[60px]" />
            </div>

            {/* Grid overlay */}
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl lg:text-5xl">
                Ready to create your{' '}
                <span className="text-gradient-lime">QR?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-gray-400 lg:text-lg">
                Turn any link, message or contact information into a beautiful
                QR code.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="#generator"
                  className="btn-primary group text-base"
                >
                  Create QR Code
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
