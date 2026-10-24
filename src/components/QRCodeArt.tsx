
import { useMemo } from 'react';
import QRCode from 'qrcode';
import type { EyeStyle, PatternStyle, ErrorCorrection } from '@/types';

interface QRCodeArtProps {
  value: string;
  color: string;
  bgColor: string;
  size?: number;
  margin?: number;
  pattern?: PatternStyle;
  eyeStyle?: EyeStyle;
  errorCorrection?: ErrorCorrection;
  logoUrl?: string | null;
  className?: string;
}

export function QRCodeArt({
  value,
  color,
  bgColor,
  size = 240,
  margin = 4,
  pattern = 'square',
  eyeStyle = 'square',
  errorCorrection = 'high',
  logoUrl = null,
  className = '',
}: QRCodeArtProps) {
  const matrix = useMemo(() => {
    if (typeof value !== 'string' || !value.trim()) return null;

    try {
      const levels = {
        low: 'L',
        medium: 'M',
        high: 'Q',
        maximum: 'H',
      } as const;

      const qr = QRCode.create(value, {
        errorCorrectionLevel: levels[errorCorrection],
      });

      const count = qr.modules.size;

      return Array.from({ length: count }, (_, row) =>
        Array.from(
          { length: count },
          (_, col) => qr.modules.data[row * count + col] === 1,
        ),
      );
    } catch (error) {
      console.error('QR generation failed:', error);
      return null;
    }
  }, [value, errorCorrection]);

  if (!matrix) {
    return (
      <div
        className={`flex items-center justify-center text-center text-sm ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: bgColor,
          color,
        }}
      >
        Enter content to generate your QR code
      </div>
    );
  }

  const count = matrix.length;
  const safeMargin = Math.max(0, margin);
  const cellSize = size / (count + safeMargin * 2);
  const offset = safeMargin * cellSize;
  const logoSize = size * 0.18;
  const logoXY = (size - logoSize) / 2;

  // Keep the three QR finder patterns square for better scanning.
  const isFinder = (row: number, col: number) =>
    (row < 7 && col < 7) ||
    (row < 7 && col >= count - 7) ||
    (row >= count - 7 && col < 7);

  // The QR matrix already contains the finder patterns.
  // Keep them intact rather than drawing decorative eyes over them.
  void eyeStyle;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Generated QR code"
      shapeRendering="geometricPrecision"
    >
      <rect width={size} height={size} fill={bgColor} />

      {matrix.map((row, r) =>
        row.map((on, c) => {
          if (!on) return null;

          const x = offset + c * cellSize;
          const y = offset + r * cellSize;
          const finder = isFinder(r, c);

          if (pattern === 'dots' && !finder) {
            return (
              <circle
                key={`${r}-${c}`}
                cx={x + cellSize / 2}
                cy={y + cellSize / 2}
                r={cellSize * 0.43}
                fill={color}
              />
            );
          }

          return (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width={cellSize + 0.03}
              height={cellSize + 0.03}
              rx={pattern === 'rounded' && !finder ? cellSize * 0.25 : 0}
              fill={color}
            />
          );
        }),
      )}

      {logoUrl && (
        <>
          <rect
            x={logoXY - cellSize * 1.5}
            y={logoXY - cellSize * 1.5}
            width={logoSize + cellSize * 3}
            height={logoSize + cellSize * 3}
            rx={cellSize}
            fill={bgColor}
          />
          <image
            href={logoUrl}
            x={logoXY}
            y={logoXY}
            width={logoSize}
            height={logoSize}
            preserveAspectRatio="xMidYMid meet"
          />
        </>
      )}
    </svg>
  );
}
