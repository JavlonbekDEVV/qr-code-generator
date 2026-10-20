import { MousePointerClick, Palette, Download } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const STEPS = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'Choose your content',
    description: 'Select a QR type — URL, text, Wi-Fi, email, phone or contact — and enter your data.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Customize your QR',
    description: 'Pick colors, patterns, eye styles, add a logo and fine-tune every detail.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Download and share',
    description: 'Export your QR code as PNG or SVG and share it anywhere — print, web or social.',
  },
];

export function HowItWorks() {
  const { ref, visible } = useReveal();

  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? '' : 'opacity-0'}`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-eyebrow mb-3">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              Three simple steps
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-lime-500/20 to-transparent lg:block" />

            <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center lg:px-4"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* Number circle */}
                  <div className="relative z-10 mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-lime-400/30 bg-emerald-850 shadow-[0_0_30px_rgba(163,230,53,0.1)]">
                    <span className="text-2xl font-bold text-lime-400">
                      {step.number}
                    </span>
                  </div>

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-400/10">
                    <step.icon className="h-5 w-5 text-lime-400" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-gray-100">
                    {step.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
