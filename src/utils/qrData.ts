
import type { QRConfig } from '@/types';

export function getQRContent(config: QRConfig): string {
  switch (config.type) {
    case 'url':
      return config.url.trim();

    case 'text':
      return config.text;

    case 'wifi': {
      const escapeWifi = (value: string) =>
        value.replace(/([\\;,:"])/g, '\\$1');

      const encryption =
        config.wifi.encryption === 'none'
          ? 'nopass'
          : config.wifi.encryption;

      const password =
        config.wifi.encryption === 'none'
          ? ''
          : `P:${escapeWifi(config.wifi.password)};`;

      return `WIFI:T:${encryption};S:${escapeWifi(
        config.wifi.ssid
      )};${password}H:${config.wifi.hidden ? 'true' : 'false'};;`;
    }

    case 'email': {
      const { address, subject, body } = config.email;
      const params = new URLSearchParams();

      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);

      const query = params.toString();

      return `mailto:${address.trim()}${query ? `?${query}` : ''}`;
    }

    case 'phone':
      return config.phone.trim()
        ? `tel:${config.phone.trim()}`
        : '';

    case 'contact': {
      const { name, phone, email, organization } = config.contact;

      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        ...(organization ? [`ORG:${organization}`] : []),
        ...(phone ? [`TEL:${phone}`] : []),
        ...(email ? [`EMAIL:${email}`] : []),
        'END:VCARD',
      ].join('\n');
    }

    default:
      return '';
  }
}
