import {
  Gauge,
  Palette,
  Image,
  FileDown,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const FEATURES = [
  {
    icon: Gauge,
    title: 'Fast Generation',
    description: 'Generate QR codes in seconds with our optimized rendering engine.',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'Change colors, patterns, size and style to match your brand.',
  },
  {
    icon: Image,
    title: 'Logo Support',
    description: 'Add your brand logo to the center of your QR code instantly.',
  },
  {
    icon: FileDown,
    title: 'Multiple Formats',
    description: 'Download in PNG for print or SVG for crisp scalable graphics.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Create QR codes from any device with our responsive interface.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description: 'Your data stays private — nothing is stored or tracked.',
  },
];

export function Features() {
  const { ref, visible } = useReveal();

  return (
    <section id="features" className="py-20 lg:py-28">
      {/* Subtle background accent */}
      <div className="pointer-events-none relative">
        <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-lime-500/5 blur-[100px]" />
      </div>

      <div className="container-page relative">
        <div ref={ref} className={`reveal ${visible ? '' : 'opacity-0'}`}>
          {/* Heading */}
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-eyebrow mb-3">Features</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              Everything you need to create{' '}
              <span className="text-gradient-lime">stunning QR codes</span>
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Powerful customization tools wrapped in a clean, premium interface.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="card-surface group p-6 transition-all duration-300 hover:border-lime-500/30 hover:shadow-[0_8px_40px_rgba(163,230,53,0.06)]"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 ring-1 ring-lime-400/20 transition-all duration-300 group-hover:bg-lime-400/15 group-hover:ring-lime-400/40">
                  <feature.icon className="h-6 w-6 text-lime-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
