"use client";

import {
  Brush,
  Languages,
  MonitorSmartphone,
  Moon,
  Palette,
  Sparkles,
  Sun,
  Gamepad2,
  WalletCards,
  X,
  Zap
} from "lucide-react";
import {
  type Currency,
  type MarketLanguage,
  type ThemeName,
  usePlayFound
} from "@/lib/settings-context";

type Props = {
  open: boolean;
  onClose: () => void;
};

const themes: Array<{
  value: ThemeName;
  label: string;
  text: string;
  color: string;
  icon: React.ReactNode;
}> = [
  { value: "darkGreen", label: "Dark Green", text: "главная тема PlayFound", color: "#38d574", icon: <Palette size={17} /> },
  { value: "pureDark", label: "Pure Dark", text: "строже и темнее", color: "#f4f7f4", icon: <Moon size={17} /> },
  { value: "light", label: "Minimal Light", text: "светлая версия", color: "#118846", icon: <Sun size={17} /> },
  { value: "streetStyle", label: "Street Style", text: "постеры, граффити, дерзость", color: "#ffcb45", icon: <Brush size={17} /> },
  { value: "pixel90s", label: "Pixel 90s", text: "ретро и CRT-настроение", color: "#7dfdff", icon: <MonitorSmartphone size={17} /> },
  { value: "darkNeon", label: "Dark Neon", text: "киберпанк и glow", color: "#b95cff", icon: <Sparkles size={17} /> },
  { value: "fantasyScroll", label: "Fantasy Scroll", text: "пергамент и руны", color: "#d6ad61", icon: <Palette size={17} /> },
  { value: "arcadeClub", label: "Arcade Club", text: "яркие кнопки и автоматы", color: "#ffe14f", icon: <Gamepad2 size={17} /> },
  { value: "horrorVhs", label: "Horror VHS", text: "шум, тревога, красный", color: "#ff4f65", icon: <Zap size={17} /> },
  { value: "softIndie", label: "Soft Indie", text: "мягко и уютно", color: "#ff9fcf", icon: <Sun size={17} /> }
];

const languages: Array<{ value: MarketLanguage; label: string }> = [
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "pl", label: "Polski" },
  { value: "uk", label: "Українська" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" }
];

const currencies: Currency[] = ["USD", "EUR", "RUB", "GBP", "PLN", "UAH", "CNY", "JPY", "KRW"];

export function SettingsPanel({ open, onClose }: Props) {
  const { settings, setSetting, t } = usePlayFound();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 p-3 backdrop-blur-md sm:p-6">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label={t.settings.close}
        onClick={onClose}
      />
      <aside className="surface relative max-h-[calc(100vh-1.5rem)] w-full max-w-xl overflow-hidden overflow-y-auto rounded-[1.5rem] sm:max-h-[calc(100vh-3rem)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] p-5">
          <div>
            <h2 className="text-2xl font-black">Настройки PlayFound</h2>
            <p className="mt-1 text-sm muted">Темы, язык, валюта, компактность и анимации сохраняются в браузере.</p>
          </div>
          <button type="button" className="btn btn-ghost h-10 w-10 px-0" aria-label={t.settings.close} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-black"><Languages size={16} /> Язык интерфейса</span>
              <select
                className="input"
                value={settings.language}
                onChange={(event) => setSetting("language", event.target.value as "ru" | "en")}
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-black"><Languages size={16} /> Локализация игр</span>
              <select
                className="input"
                value={settings.marketLanguage}
                onChange={(event) => setSetting("marketLanguage", event.target.value as MarketLanguage)}
              >
                {languages.map((language) => (
                  <option value={language.value} key={language.value}>{language.label}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="inline-flex items-center gap-2 text-sm font-black"><WalletCards size={16} /> Валюта магазина</span>
            <select
              className="input"
              value={settings.currency}
              onChange={(event) => setSetting("currency", event.target.value as Currency)}
            >
              {currencies.map((currency) => (
                <option value={currency} key={currency}>{currency}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-3">
            <span className="text-sm font-black">Дизайн-тема</span>
            <div className="grid gap-2 sm:grid-cols-3">
              {themes.map((theme) => (
                <button
                  type="button"
                  key={theme.value}
                  className={`interactive-card rounded-2xl border p-3 text-left transition ${
                    settings.theme === theme.value
                      ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]"
                      : "border-[var(--line)] bg-[var(--panel-soft)] hover:border-[var(--line-strong)]"
                  }`}
                  onClick={() => setSetting("theme", theme.value)}
                >
                  <span className="mb-3 flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: theme.color, color: "#051008" }}>
                      {theme.icon}
                    </span>
                    <span className="font-black">{theme.label}</span>
                  </span>
                  <span className="block text-xs leading-5 muted">{theme.text}</span>
                </button>
              ))}
            </div>
          </div>

          <SettingToggle
            checked={settings.compactMode}
            label="Компактные карточки"
            text="Больше игр помещается на экране каталога."
            onChange={(value) => setSetting("compactMode", value)}
          />
          <SettingToggle
            checked={settings.reduceAnimations}
            label="Уменьшить анимации"
            text="Оставляет интерфейс спокойнее и быстрее."
            icon={<Zap size={18} />}
            onChange={(value) => setSetting("reduceAnimations", value)}
          />
        </div>
      </aside>
    </div>
  );
}

function SettingToggle({
  checked,
  label,
  text,
  icon,
  onChange
}: {
  checked: boolean;
  label: string;
  text: string;
  icon?: React.ReactNode;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 text-left transition hover:border-[var(--line-strong)]"
      onClick={() => onChange(!checked)}
    >
      <span className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">
          {icon ?? <Palette size={18} />}
        </span>
        <span>
          <span className="block font-black">{label}</span>
          <span className="mt-1 block text-sm leading-6 muted">{text}</span>
        </span>
      </span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full border transition ${checked ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--line-strong)] bg-[var(--panel-strong)]"}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}
