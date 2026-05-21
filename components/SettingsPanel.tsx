"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  Bell,
  HelpCircle,
  Languages,
  Lock,
  Mail,
  Shield,
  SlidersHorizontal,
  WalletCards,
  X,
  Zap
} from "lucide-react";
import {
  type Currency,
  type MarketLanguage,
  usePlayFound
} from "@/lib/settings-context";

type Props = {
  open: boolean;
  onClose: () => void;
};

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
  const [email, setEmail] = useState("");
  const [supportText, setSupportText] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const mockSave = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(null), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/62 p-3 backdrop-blur-md sm:p-6">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label={t.settings.close}
        onClick={onClose}
      />
      <aside className="surface relative max-h-[calc(100vh-1.5rem)] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-[1.5rem] sm:max-h-[calc(100vh-3rem)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] p-5">
          <div>
            <h2 className="text-2xl font-black">Настройки</h2>
            <p className="mt-1 text-sm muted">Язык, валюта, приватность, уведомления, почта и поддержка. Темы оформления перенесены в профиль.</p>
          </div>
          <button type="button" className="btn btn-ghost h-11 w-11 px-0" aria-label={t.settings.close} onClick={onClose}>
            <X size={21} />
          </button>
        </div>

        <div className="grid gap-5 p-5">
          {notice ? <div className="rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] p-4 text-sm font-black text-[var(--accent-2)]">{notice}</div> : null}

          <SettingsSection icon={<SlidersHorizontal size={18} />} title="Интерфейс магазина" text="Здесь находятся язык и валюта, а не в каталоге.">
            <div className="grid gap-4 sm:grid-cols-3">
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
                <span className="inline-flex items-center gap-2 text-sm font-black"><Languages size={16} /> Язык игр</span>
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
              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-black"><WalletCards size={16} /> Валюта</span>
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
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SettingToggle
                checked={settings.compactMode}
                label="Компактные карточки"
                text="Больше игр помещается на экране каталога."
                onChange={(value) => setSetting("compactMode", value)}
              />
              <SettingToggle
                checked={settings.reduceAnimations}
                label="Уменьшить анимации"
                text="Для слабых устройств и спокойного интерфейса."
                icon={<Zap size={18} />}
                onChange={(value) => setSetting("reduceAnimations", value)}
              />
            </div>
          </SettingsSection>

          <SettingsSection icon={<Shield size={18} />} title="Конфиденциальность" text="Mock-настройки приватности для прототипа.">
            <div className="grid gap-3 sm:grid-cols-2">
              <SettingToggle
                checked={settings.privateProfile}
                label="Приватный профиль"
                text="Скрывает библиотеку и активность от незнакомых пользователей."
                icon={<Lock size={18} />}
                onChange={(value) => setSetting("privateProfile", value)}
              />
              <SettingToggle
                checked={settings.friendRequests}
                label="Заявки в друзья"
                text="Разрешить другим игрокам находить тебя по ID."
                icon={<Bell size={18} />}
                onChange={(value) => setSetting("friendRequests", value)}
              />
            </div>
          </SettingsSection>

          <SettingsSection icon={<Bell size={18} />} title="Уведомления" text="Что PlayFound может показывать в центре уведомлений.">
            <div className="grid gap-3 sm:grid-cols-2">
              <SettingToggle
                checked={settings.emailDigest}
                label="Email-дайджест"
                text="Подборки игр, скидки и новые демо раз в неделю."
                icon={<Mail size={18} />}
                onChange={(value) => setSetting("emailDigest", value)}
              />
              <SettingToggle
                checked={settings.productNews}
                label="Новости платформы"
                text="Изменения каталога, форума, роликов и аккаунта."
                onChange={(value) => setSetting("productNews", value)}
              />
            </div>
          </SettingsSection>

          <SettingsSection icon={<Mail size={18} />} title="Смена почты" text="Пока это mock-форма. Реальная смена почты будет через код подтверждения.">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="new-email@example.com" />
              <button type="button" className="btn btn-primary" onClick={() => mockSave(email ? "Запрос на смену почты сохранён в mock-режиме." : "Сначала введи новую почту.")}>Сохранить</button>
            </div>
          </SettingsSection>

          <SettingsSection icon={<HelpCircle size={18} />} title="Поддержка" text="Быстрый способ написать в поддержку из настроек.">
            <textarea className="input min-h-28 resize-y" value={supportText} onChange={(event) => setSupportText(event.target.value)} placeholder="Опиши проблему, баг или вопрос" />
            <button type="button" className="btn btn-primary mt-3" onClick={() => mockSave(supportText.trim() ? "Обращение отправлено в mock-поддержку." : "Опиши проблему перед отправкой.")}>Отправить обращение</button>
          </SettingsSection>
        </div>
      </aside>
    </div>
  );
}

function SettingsSection({ icon, title, text, children }: { icon: ReactNode; title: string; text: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--panel-soft)] p-4">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">{icon}</span>
        <div>
          <h3 className="text-lg font-black">{title}</h3>
          <p className="mt-1 text-sm leading-6 muted">{text}</p>
        </div>
      </div>
      {children}
    </section>
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
  icon?: ReactNode;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="flex min-h-28 items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-4 text-left transition hover:border-[var(--line-strong)]"
      onClick={() => onChange(!checked)}
    >
      <span className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">
          {icon ?? <Shield size={18} />}
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
