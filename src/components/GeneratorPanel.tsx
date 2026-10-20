import type { QRConfig } from '@/types';

interface GeneratorPanelProps {
  config: QRConfig;
  update: (patch: Partial<QRConfig>) => void;
}

export function GeneratorPanel({ config, update }: GeneratorPanelProps) {
  return (
    <div className="space-y-5">
      {/* URL */}
      {config.type === 'url' && (
        <div>
          <label className="label-text mb-2 block">Website URL</label>
          <input
            type="url"
            value={config.url}
            onChange={(e) => update({ url: e.target.value })}
            placeholder="https://example.com"
            className="input-field"
          />
          {config.url && !config.url.startsWith('http') && (
            <p className="mt-2 text-xs text-orange-400/80">
              Tip: URLs should start with http:// or https://
            </p>
          )}
        </div>
      )}

      {/* Text */}
      {config.type === 'text' && (
        <div>
          <label className="label-text mb-2 block">Text content</label>
          <textarea
            value={config.text}
            onChange={(e) => update({ text: e.target.value })}
            placeholder="Enter any text you want to encode..."
            rows={4}
            className="input-field resize-none"
          />
        </div>
      )}

      {/* Wi-Fi */}
      {config.type === 'wifi' && (
        <div className="space-y-4">
          <div>
            <label className="label-text mb-2 block">Network name (SSID)</label>
            <input
              type="text"
              value={config.wifi.ssid}
              onChange={(e) =>
                update({ wifi: { ...config.wifi, ssid: e.target.value } })
              }
              placeholder="MyNetwork"
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text mb-2 block">Password</label>
            <input
              type="text"
              value={config.wifi.password}
              onChange={(e) =>
                update({ wifi: { ...config.wifi, password: e.target.value } })
              }
              placeholder="Network password"
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text mb-2 block">Encryption</label>
              <select
                value={config.wifi.encryption}
                onChange={(e) =>
                  update({
                    wifi: {
                      ...config.wifi,
                      encryption: e.target.value as 'WPA' | 'WEP' | 'none',
                    },
                  })
                }
                className="input-field cursor-pointer"
              >
                <option value="WPA">WPA / WPA2</option>
                <option value="WEP">WEP</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label className="label-text mb-2 block">Hidden network</label>
              <button
                onClick={() =>
                  update({
                    wifi: { ...config.wifi, hidden: !config.wifi.hidden },
                  })
                }
                className={`flex h-[46px] w-full items-center justify-between rounded-xl border px-4 text-sm transition-all ${
                  config.wifi.hidden
                    ? 'border-lime-400/40 bg-lime-400/10 text-lime-400'
                    : 'border-emerald-700/70 bg-emerald-900/70 text-gray-400'
                }`}
              >
                {config.wifi.hidden ? 'Yes' : 'No'}
                <div
                  className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                    config.wifi.hidden ? 'bg-lime-400' : 'bg-emerald-700'
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      config.wifi.hidden ? 'translate-x-4' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email */}
      {config.type === 'email' && (
        <div className="space-y-4">
          <div>
            <label className="label-text mb-2 block">Email address</label>
            <input
              type="email"
              value={config.email.address}
              onChange={(e) =>
                update({
                  email: { ...config.email, address: e.target.value },
                })
              }
              placeholder="hello@example.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text mb-2 block">Subject</label>
            <input
              type="text"
              value={config.email.subject}
              onChange={(e) =>
                update({ email: { ...config.email, subject: e.target.value } })
              }
              placeholder="Email subject"
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text mb-2 block">Message body</label>
            <textarea
              value={config.email.body}
              onChange={(e) =>
                update({ email: { ...config.email, body: e.target.value } })
              }
              placeholder="Pre-filled message..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>
      )}

      {/* Phone */}
      {config.type === 'phone' && (
        <div>
          <label className="label-text mb-2 block">Phone number</label>
          <input
            type="tel"
            value={config.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="input-field"
          />
        </div>
      )}

      {/* Contact */}
      {config.type === 'contact' && (
        <div className="space-y-4">
          <div>
            <label className="label-text mb-2 block">Full name</label>
            <input
              type="text"
              value={config.contact.name}
              onChange={(e) =>
                update({
                  contact: { ...config.contact, name: e.target.value },
                })
              }
              placeholder="John Doe"
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text mb-2 block">Phone</label>
            <input
              type="tel"
              value={config.contact.phone}
              onChange={(e) =>
                update({
                  contact: { ...config.contact, phone: e.target.value },
                })
              }
              placeholder="+1 (555) 123-4567"
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text mb-2 block">Email</label>
            <input
              type="email"
              value={config.contact.email}
              onChange={(e) =>
                update({
                  contact: { ...config.contact, email: e.target.value },
                })
              }
              placeholder="john@example.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text mb-2 block">Organization</label>
            <input
              type="text"
              value={config.contact.organization}
              onChange={(e) =>
                update({
                  contact: { ...config.contact, organization: e.target.value },
                })
              }
              placeholder="Company name"
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
}
