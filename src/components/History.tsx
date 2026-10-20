import { Clock, Download, Pencil } from 'lucide-react';
import { QRCodeArt } from '@/components/QRCodeArt';
import { useReveal } from '@/hooks/useReveal';
import { MOCK_HISTORY, QR_TYPE_LABELS } from '@/types';

export function History() {
  const { ref, visible } = useReveal();

  return (
    <section id="history" className="py-20 lg:py-28">
      <div className="container-page">
        <div
          ref={ref}
          className={`reveal ${visible ? '' : 'opacity-0'}`}
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="section-eyebrow mb-3">History</p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                Recent QR Codes
              </h2>
            </div>
            <div className="hidden items-center gap-2 text-sm text-gray-500 sm:flex">
              <Clock className="h-4 w-4" />
              Last 30 days
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_HISTORY.map((item, i) => (
              <div
                key={item.id}
                className="card-surface group transition-all duration-300 hover:border-lime-500/30 hover:shadow-[0_8px_40px_rgba(163,230,53,0.08)]"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start gap-4 p-5">
                  {/* Mini QR */}
                  <div className="shrink-0 rounded-lg border border-emerald-700/40 p-2">
                    <QRCodeArt
                      color={item.qrColor}
                      bgColor={item.bgColor}
                      size={72}
                      margin={2}
                      pattern="square"
                      eyeStyle="square"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-100">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-lime-400">
                      {QR_TYPE_LABELS[item.type]}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-600">{item.date}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-emerald-800/50 px-5 py-3">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-lime-400/10 px-3 py-2 text-xs font-medium text-lime-400 transition-all hover:bg-lime-400/20">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-700/60 px-3 py-2 text-xs font-medium text-gray-400 transition-all hover:border-lime-500/40 hover:text-lime-400">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
