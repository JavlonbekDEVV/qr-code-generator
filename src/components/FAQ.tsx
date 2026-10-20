import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const FAQS = [
  {
    question: 'What is a QR code?',
    answer:
      'A QR code (Quick Response code) is a two-dimensional barcode that stores information such as URLs, text, contact details or Wi-Fi credentials. When scanned with a smartphone camera, it instantly displays the encoded content.',
  },
  {
    question: 'Can I add my logo?',
    answer:
      'Yes. Upload a PNG, JPG or SVG logo and it will be placed in the center of your QR code. We recommend using a higher error correction level when adding a logo to ensure the QR remains scannable.',
  },
  {
    question: 'What formats can I download?',
    answer:
      'You can download your QR code in two formats: PNG for everyday use like printing and sharing on social media, and SVG for scalable, high-resolution graphics that stay crisp at any size.',
  },
  {
    question: 'Can I customize the QR code?',
    answer:
      'Absolutely. You can change the QR color, background color, dot pattern, eye style, size, margin and error correction level. Every change is reflected instantly in the live preview.',
  },
  {
    question: 'Does the QR code expire?',
    answer:
      'No. QR codes generated with QRgen never expire. Once downloaded, they work indefinitely. The content is encoded directly into the QR code, so there is no dependency on any external service.',
  },
  {
    question: 'Can I use QR codes commercially?',
    answer:
      'Yes. All QR codes created with QRgen are free to use for both personal and commercial purposes. There are no watermarks, licensing fees or usage restrictions.',
  },
];

export function FAQ() {
  const { ref, visible } = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? '' : 'opacity-0'}`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-eyebrow mb-3">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`card-surface overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-lime-500/30'
                      : 'hover:border-emerald-600/60'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-gray-100 sm:text-base">
                      {faq.question}
                    </span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-lime-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
