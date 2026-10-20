import { ArrowRight, Sparkles } from 'lucide-react';
import { QRCodeArt } from '@/components/QRCodeArt';

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-lime-500/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px]" />
        <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-lime-400/5 blur-[80px]" />
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: copy */}
          <div className="reveal text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-1.5 text-xs font-medium text-lime-400">
              <Sparkles className="h-3.5 w-3.5" />
              Free · No signup required
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-50 sm:text-5xl lg:text-6xl">
              Create beautiful QR codes in{' '}
              <span className="relative inline-block">
                <span className="text-gradient-lime">seconds</span>
                <span className="absolute -bottom-1 -right-6 font-script text-2xl text-lime-400/70 sm:text-3xl">
                  Style.
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-400 lg:mx-0 lg:text-lg">
              Generate, customize and download professional QR codes for your
              links, business, products and everyday needs.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <a href="#generator" className="btn-primary group w-full sm:w-auto">
                Create QR Code
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#features" className="btn-secondary w-full sm:w-auto">
                Explore Features
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500 lg:justify-start">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                No watermark
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                PNG & SVG
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                Unlimited
              </div>
            </div>
          </div>

          {/* Right: hero QR visual */}
          <div className="reveal relative flex justify-center lg:justify-end" style={{ animationDelay: '0.15s' }}>
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 animate-glowPulse rounded-3xl bg-lime-400/10 blur-2xl" />

              {/* Floating card */}
              <div className="card-surface relative flex flex-col items-center gap-4 p-8 glow-lime">
                <div className="flex items-center gap-2 self-start">
                  <div className="h-2 w-2 rounded-full bg-lime-400" />
                  <span className="label-text">Live preview</span>
                </div>

                <div className="rounded-2xl border border-emerald-700/40 p-4">
                  <QRCodeArt
                    color="#a3e635"
                    bgColor="#03150e"
                    size={200}
                    pattern="rounded"
                    eyeStyle="rounded"
                  />
                </div>

                <div className="flex w-full items-center gap-2">
                  <div className="flex-1 rounded-lg bg-lime-400 px-3 py-2 text-center text-xs font-semibold text-emerald-950">
                    Download PNG
                  </div>
                  <div className="flex-1 rounded-lg border border-emerald-700 px-3 py-2 text-center text-xs font-semibold text-gray-300">
                    Download SVG
                  </div>
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute -left-4 top-6 hidden rounded-xl border border-emerald-700/60 bg-emerald-850/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:block">
                <p className="text-xs text-gray-400">Pattern</p>
                <p className="text-sm font-semibold text-lime-400">Rounded</p>
              </div>
              <div className="absolute -right-2 bottom-10 hidden rounded-xl border border-emerald-700/60 bg-emerald-850/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:block">
                <p className="text-xs text-gray-400">Error Correction</p>
                <p className="text-sm font-semibold text-lime-400">High</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
