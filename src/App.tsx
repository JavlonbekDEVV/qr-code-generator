import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QRTypeSelector } from "@/components/QRTypeSelector";
import { GeneratorPanel } from "@/components/GeneratorPanel";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { LogoUploader } from "@/components/LogoUploader";
import { QRPreview } from "@/components/QRPreview";
import { History } from "@/components/History";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from '@/components/FAQ';
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import type { QRConfig } from "@/types";

const DEFAULT_CONFIG: QRConfig = {
  type: "url",
  url: "",
  text: "",
  wifi: {
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  },
  email: {
    address: "",
    subject: "",
    body: "",
  },
  phone: "",
  contact: {
    name: "",
    phone: "",
    email: "",
    organization: "",
  },
  qrColor: "#a3e635",
  bgColor: "#03150e",
  size: 256,
  margin: 4,
  errorCorrection: "high",
  pattern: "rounded",
  eyeStyle: "rounded",
  logo: null,
  logoPreviewUrl: null,
};

function App() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);

  const update = useCallback((patch: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleLogoSelect = useCallback((file: File | null) => {
    setConfig((prev) => {
      if (prev.logoPreviewUrl) {
        URL.revokeObjectURL(prev.logoPreviewUrl);
      }
      if (!file) {
        return { ...prev, logo: null, logoPreviewUrl: null };
      }
      const url = URL.createObjectURL(file);
      return { ...prev, logo: file, logoPreviewUrl: url };
    });
  }, []);

  const generatorSection = useMemo(
    () => (
      <section id="generator" className="py-20 lg:py-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/5 blur-[120px]" />
        </div>

        <div className="container-page relative">
          {/* Section heading */}
          <div className="mb-10 text-center">
            <p className="section-eyebrow mb-3">Generator</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              Create your QR code
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-400">
              Choose your content type, customize the design and download
              instantly.
            </p>
          </div>

          {/* Main workspace */}
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            {/* LEFT: Configuration */}
            <div className="card-surface space-y-7 p-6 sm:p-8">
              <QRTypeSelector
                active={config.type}
                onChange={(type) => update({ type })}
              />

              <div className="h-px bg-emerald-800/50" />

              <GeneratorPanel config={config} update={update} />

              <div className="h-px bg-emerald-800/50" />

              {/* Logo upload */}
              <div>
                <h3 className="mb-1 text-sm font-semibold text-gray-200">
                  Add your logo
                </h3>
                <p className="mb-3 text-xs text-gray-500">
                  Place your brand logo in the center of the QR code.
                </p>
                <LogoUploader
                  logoPreviewUrl={config.logoPreviewUrl}
                  onLogoSelect={handleLogoSelect}
                />
              </div>

              <div className="h-px bg-emerald-800/50" />

              {/* Customization */}
              <CustomizationPanel config={config} update={update} />
            </div>

            {/* RIGHT: Preview */}
            <div>
              <QRPreview config={config} />
            </div>
          </div>
        </div>
      </section>
    ),
    [config, update, handleLogoSelect],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed botanical background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Radial gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950" />
        {/* Soft radial glows */}
        <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-lime-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[150px]" />
        {/* Botanical silhouettes — SVG leaves */}
        <svg
          className="absolute -left-20 top-40 h-96 w-96 opacity-[0.04]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M100 20 C 60 50, 40 100, 60 170 C 80 140, 120 130, 140 160 C 150 110, 130 60, 100 20 Z"
            fill="#a3e635"
          />
          <path d="M100 20 L 100 170" stroke="#a3e635" strokeWidth="1" />
        </svg>
        <svg
          className="absolute -right-16 top-1/3 h-80 w-80 rotate-45 opacity-[0.03]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M100 20 C 60 50, 40 100, 60 170 C 80 140, 120 130, 140 160 C 150 110, 130 60, 100 20 Z"
            fill="#a3e635"
          />
        </svg>
        <svg
          className="absolute bottom-20 left-1/4 h-64 w-64 -rotate-12 opacity-[0.03]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M100 20 C 60 50, 40 100, 60 170 C 80 140, 120 130, 140 160 C 150 110, 130 60, 100 20 Z"
            fill="#84cc16"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          {generatorSection}
          <History />
          <Features />
          <HowItWorks />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
