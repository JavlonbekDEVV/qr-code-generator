export type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'contact';

export type PatternStyle = 'square' | 'rounded' | 'dots';

export type EyeStyle = 'square' | 'rounded' | 'circle';

export type ErrorCorrection = 'low' | 'medium' | 'high' | 'maximum';

export interface QRConfig {
  type: QRType;
  url: string;
  text: string;
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'none';
    hidden: boolean;
  };
  email: {
    address: string;
    subject: string;
    body: string;
  };
  phone: string;
  contact: {
    name: string;
    phone: string;
    email: string;
    organization: string;
  };
  qrColor: string;
  bgColor: string;
  size: number;
  margin: number;
  errorCorrection: ErrorCorrection;
  pattern: PatternStyle;
  eyeStyle: EyeStyle;
  logo: File | null;
  logoPreviewUrl: string | null;
}

export interface HistoryItem {
  id: string;
  name: string;
  type: QRType;
  date: string;
  qrColor: string;
  bgColor: string;
}

export const QR_TYPE_LABELS: Record<QRType, string> = {
  url: 'URL',
  text: 'Text',
  wifi: 'Wi-Fi',
  email: 'Email',
  phone: 'Phone',
  contact: 'Contact',
};

export const PRESET_QR_COLORS = [
  '#a3e635',
  '#22c55e',
  '#0d3826',
  '#f8fafc',
  '#f97316',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
];

export const PRESET_BG_COLORS = [
  '#03150e',
  '#ffffff',
  '#0a2e20',
  '#f0fdf4',
  '#1c1917',
  '#fef3c7',
  '#1e293b',
  '#fafafa',
];

export const MOCK_HISTORY: HistoryItem[] = [
  {
    id: '1',
    name: 'Restaurant Menu',
    type: 'url',
    date: 'September 13, 2026',
    qrColor: '#a3e635',
    bgColor: '#03150e',
  },
  {
    id: '2',
    name: 'Office Wi-Fi',
    type: 'wifi',
    date: 'September 10, 2026',
    qrColor: '#22c55e',
    bgColor: '#0a2e20',
  },
  {
    id: '3',
    name: 'Business Card',
    type: 'contact',
    date: 'September 8, 2026',
    qrColor: '#f8fafc',
    bgColor: '#1c1917',
  },
  {
    id: '4',
    name: 'Support Email',
    type: 'email',
    date: 'September 5, 2026',
    qrColor: '#06b6d4',
    bgColor: '#ffffff',
  },
  {
    id: '5',
    name: 'Product Launch Page',
    type: 'url',
    date: 'September 2, 2026',
    qrColor: '#a3e635',
    bgColor: '#0d3826',
  },
  {
    id: '6',
    name: 'Customer Hotline',
    type: 'phone',
    date: 'August 28, 2026',
    qrColor: '#f97316',
    bgColor: '#fef3c7',
  },
];
