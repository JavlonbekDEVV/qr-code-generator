import { ChevronDown } from 'lucide-react';
import type {
  ErrorCorrection,
  EyeStyle,
  PatternStyle,
  QRConfig,
} from '@/types';
import { PRESET_BG_COLORS, PRESET_QR_COLORS } from '@/types';

interface CustomizationPanelProps {
  config: QRConfig;
  update: (patch: Partial<QRConfig>) => void;
}

const PATTERNS: { value: PatternStyle; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'dots', label: 'Dots' },
];

const EYE_STYLES: { value: EyeStyle; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'circle', label: 'Circle' },
];

const ERROR_LEVELS: { value: ErrorCorrection; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'maximum', label: 'Maximum' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-text mb-3">{children}</p>
  );
}

function ColorPresets({
  presets,
  selected,
  onSelect,
}: {
  presets: string[];
  selected: string;
  onSelect: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          className={`h-7 w-7 rounded-lg border-2 transition-all duration-200 ${
            selected.toLowerCase() === color.toLowerCase()
              ? 'border-lime-400 ring-2 ring-lime-400/30'
              : 'border-emerald-800/60 hover:border-emerald-600'
          }`}
          style={{ backgroundColor: color }}
          aria-label={`Select ${color}`}
        />
      ))}
    </div>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-xl border border-emerald-800/60 bg-emerald-900/50 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-all duration-200 ${
            value === opt.value
              ? 'bg-lime-400 text-emerald-950'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-400">{display}</span>
        <span className="text-sm font-semibold text-lime-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-emerald-800 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-lime-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(163,230,53,0.4)] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-lime-400"
        style={{
          background: `linear-gradient(to right, #a3e635 ${pct}%, #0d3826 ${pct}%)`,
        }}
      />
    </div>
  );
}

export function CustomizationPanel({ config, update }: CustomizationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ChevronDown className="h-4 w-4 text-lime-400" />
        <h3 className="text-sm font-semibold text-gray-200">
          Customize your QR
        </h3>
      </div>

      {/* QR Color */}
      <div>
        <SectionLabel>QR Color</SectionLabel>
        <div className="mb-3 flex items-center gap-3">
          <input
            type="color"
            value={config.qrColor}
            onChange={(e) => update({ qrColor: e.target.value })}
            className="h-10 w-14 cursor-pointer rounded-lg border border-emerald-700/60 bg-transparent"
          />
          <input
            type="text"
            value={config.qrColor}
            onChange={(e) => update({ qrColor: e.target.value })}
            className="input-field flex-1 font-mono text-sm"
          />
        </div>
        <ColorPresets
          presets={PRESET_QR_COLORS}
          selected={config.qrColor}
          onSelect={(c) => update({ qrColor: c })}
        />
      </div>

      {/* Background */}
      <div>
        <SectionLabel>Background</SectionLabel>
        <div className="mb-3 flex items-center gap-3">
          <input
            type="color"
            value={config.bgColor}
            onChange={(e) => update({ bgColor: e.target.value })}
            className="h-10 w-14 cursor-pointer rounded-lg border border-emerald-700/60 bg-transparent"
          />
          <input
            type="text"
            value={config.bgColor}
            onChange={(e) => update({ bgColor: e.target.value })}
            className="input-field flex-1 font-mono text-sm"
          />
        </div>
        <ColorPresets
          presets={PRESET_BG_COLORS}
          selected={config.bgColor}
          onSelect={(c) => update({ bgColor: c })}
        />
      </div>

      {/* Pattern */}
      <div>
        <SectionLabel>Pattern</SectionLabel>
        <SegmentedControl
          options={PATTERNS}
          value={config.pattern}
          onChange={(v) => update({ pattern: v })}
        />
      </div>

      {/* Eye Style */}
      <div>
        <SectionLabel>Eye Style</SectionLabel>
        <SegmentedControl
          options={EYE_STYLES}
          value={config.eyeStyle}
          onChange={(v) => update({ eyeStyle: v })}
        />
      </div>

      {/* Size */}
      <div>
        <SectionLabel>Size</SectionLabel>
        <Slider
          value={config.size}
          min={128}
          max={1024}
          step={32}
          onChange={(v) => update({ size: v })}
          display="Pixels"
        />
      </div>

      {/* Margin */}
      <div>
        <SectionLabel>Margin</SectionLabel>
        <Slider
          value={config.margin}
          min={0}
          max={10}
          onChange={(v) => update({ margin: v })}
          display="Modules"
        />
      </div>

      {/* Error Correction */}
      <div>
        <SectionLabel>Error Correction</SectionLabel>
        <SegmentedControl
          options={ERROR_LEVELS}
          value={config.errorCorrection}
          onChange={(v) => update({ errorCorrection: v })}
        />
        <p className="mt-2 text-xs text-gray-600">
          Higher levels allow more damage while remaining scannable.
        </p>
      </div>
    </div>
  );
}
