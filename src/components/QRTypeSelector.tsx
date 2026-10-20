import {
  Contact,
  Mail,
  Phone,
  Link2,
  MessageSquare,
  Wifi,
} from 'lucide-react';
import type { QRType } from '@/types';

const TYPES: { type: QRType; label: string; icon: typeof Link2 }[] = [
  { type: 'url', label: 'URL', icon: Link2 },
  { type: 'text', label: 'Text', icon: MessageSquare },
  { type: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'phone', label: 'Phone', icon: Phone },
  { type: 'contact', label: 'Contact', icon: Contact },
];

interface QRTypeSelectorProps {
  active: QRType;
  onChange: (type: QRType) => void;
}

export function QRTypeSelector({ active, onChange }: QRTypeSelectorProps) {
  return (
    <div>
      <p className="label-text mb-3">QR Type</p>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
        {TYPES.map(({ type, label, icon: Icon }) => {
          const isActive = active === type;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              className={`group flex flex-col items-center gap-2 rounded-xl border px-2 py-3.5 transition-all duration-200 ${
                isActive
                  ? 'border-lime-400 bg-lime-400/10 shadow-[0_0_20px_rgba(163,230,53,0.15)]'
                  : 'border-emerald-800/60 bg-emerald-900/40 hover:border-emerald-600/60 hover:bg-emerald-800/40'
              }`}
              aria-pressed={isActive}
            >
              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive
                    ? 'text-lime-400'
                    : 'text-gray-400 group-hover:text-gray-200'
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-lime-400' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
