
import { useRef, useState } from 'react';
import { Check, Copy, Download, Share2 } from 'lucide-react';
import { QRCodeArt } from '@/components/QRCodeArt';
import type { QRConfig } from '@/types';
import { QR_TYPE_LABELS } from '@/types';
import { getQRContent } from '@/utils/qrData';

interface QRPreviewProps {
  config: QRConfig;
}

export function QRPreview({ config }: QRPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const value = getQRContent(config);

  function getSvgBlob(): Blob {
    const svg = previewRef.current?.querySelector('svg');

    if (!svg) {
      throw new Error('QR code is not ready.');
    }

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    return new Blob(
      [new XMLSerializer().serializeToString(clone)],
      { type: 'image/svg+xml;charset=utf-8' },
    );
  }

  async function getPngBlob(): Promise<Blob> {
    const svgBlob = getSvgBlob();
    const objectUrl = URL.createObjectURL(svgBlob);

    try {
      const img = new Image();
      img.src = objectUrl;
      await img.decode();

      const canvas = document.createElement('canvas');
      canvas.width = config.size;
      canvas.height = config.size;

      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Canvas is not available.');
      }

      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      return await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('PNG export failed.'));
          }
        }, 'image/png');
      });
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function handleDownloadSvg() {
    try {
      downloadBlob(getSvgBlob(), 'qr-code.svg');
    } catch (error) {
      console.error('SVG download failed:', error);
      alert('SVG download failed. Please try again.');
    }
  }

  async function handleDownloadPng() {
    try {
      const blob = await getPngBlob();
      downloadBlob(blob, 'qr-code.png');
    } catch (error) {
      console.error('PNG download failed:', error);
      alert('PNG download failed. Please try again.');
    }
  }

  async function handleCopy() {
    if (!value || busy) return;

    setBusy(true);

    try {
      const blob = await getPngBlob();

      if (
        navigator.clipboard?.write &&
        typeof ClipboardItem !== 'undefined'
      ) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
      } else {
        await navigator.clipboard.writeText(value);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      alert(
        'Could not copy the QR code. Please try downloading it instead.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      ref={previewRef}
      className="card-surface flex flex-col items-center gap-6 p-6 sm:p-8 lg:sticky lg:top-24"
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
          <span className="label-text">Live preview</span>
        </div>

        <span className="rounded-full border border-emerald-700/60 bg-emerald-900/60 px-3 py-1 text-xs font-medium text-gray-400">
          {QR_TYPE_LABELS[config.type]}
        </span>
      </div>

      {/* QR display */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-lime-400/5 blur-xl" />

        <div className="relative rounded-2xl border border-emerald-700/40 bg-emerald-900/40 p-5 transition-transform duration-300 hover:scale-[1.02]">
          <QRCodeArt
            value={value}
            color={config.qrColor}
            bgColor={config.bgColor}
            size={config.size}
            margin={config.margin}
            pattern={config.pattern}
            eyeStyle={config.eyeStyle}
            errorCorrection={config.errorCorrection}
            logoUrl={config.logoPreviewUrl}
          />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400/20">
          <Check className="h-3 w-3 text-lime-400" />
        </div>

        <p className="text-sm font-medium text-gray-300">
          {value ? 'Your QR code is ready' : 'Enter content to create a QR code'}
        </p>
      </div>

      {/* Download buttons */}
      <div className="flex w-full flex-col gap-2.5">
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={!value || busy}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Download PNG
        </button>

        <button
          type="button"
          onClick={handleDownloadSvg}
          disabled={!value || busy}
          className="btn-secondary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Download SVG
        </button>
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopy}
        disabled={!value || busy}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-800/60 px-4 py-2.5 text-sm font-medium text-gray-400 transition-all hover:border-lime-500/40 hover:text-lime-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-lime-400" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            {busy ? 'Copying...' : 'Copy QR'}
          </>
        )}
      </button>

      {/* Share hint */}
      <div className="flex w-full items-center justify-center gap-2 border-t border-emerald-800/50 pt-4 text-xs text-gray-600">
        <Share2 className="h-3.5 w-3.5" />
        Share anywhere — print, web, social
      </div>
    </div>
  );
}
