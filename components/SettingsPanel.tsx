"use client";

import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  Moon,
  Palette,
  Send,
  Sun,
  UserPlus,
  X,
  Zap
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { type ThemeName, usePlayFound } from "@/lib/settings-context";
import type { Language } from "@/lib/translations";

type Props = {
  open: boolean;
  onClose: () => void;
};

const themes: Array<{ value: ThemeName; color: string; icon: React.ReactNode }> =
  [
    { value: "darkGreen", color: "#38d574", icon: <Palette size={17} /> },
    { value: "pureDark", color: "#f4f7f4", icon: <Moon size={17} /> },
    { value: "light", color: "#118846", icon: <Sun size={17} /> }
  ];

export function SettingsPanel({ open, onClose }: Props) {
  const { settings, setSetting, t } = usePlayFound();
  const { loaded, session, developerRequest, requestDeveloperAccess } = useAuth();

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
      <aside className="surface relative max-h-[calc(100vh-1.5rem)] w-full max-w-md overflow-hidden overflow-y-auto rounded-[1.5rem] sm:max-h-[calc(100vh-3rem)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] p-5">
          <div>
            <h2 className="text-2xl font-black">{t.settings.title}</h2>
            <p className="mt-1 text-sm muted">{t.settings.subtitle}</p>
          </div>
          <button
            type="button"
            className="btn btn-ghost h-10 w-10 px-0"
            aria-label={t.settings.close}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-5">
          <label className="grid gap-2">
            <span className="text-sm font-black">{t.settings.language}</span>
            <select
              className="input"
              value={settings.language}
              onChange={(event) =>
                setSetting("language", event.target.value as Language)
              }
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </label>

          <div className="grid gap-3">
            <span className="text-sm font-black">{t.settings.theme}</span>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <button
                  type="button"
                  key={theme.value}
                  className={`rounded-2xl border p-3 text-left transition ${
                    settings.theme === theme.value
                      ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]"
                      : "border-[var(--line)] bg-[var(--panel-soft)] hover:border-[var(--line-strong)]"
                  }`}
                  onClick={() => setSetting("theme", theme.value)}
                >
                  <span
                    className="mb-3 grid h-8 w-8 place-items-center rounded-full"
                    style={{ background: theme.color, color: "#051008" }}
                  >
                    {theme.icon}
                  </span>
                  <span className="text-sm font-black">
                    {t.settings[theme.value]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <SettingToggle
            checked={settings.compactMode}
            label={t.settings.compact}
            text={t.settings.compactText}
            onChange={(value) => setSetting("compactMode", value)}
          />
          <SettingToggle
            checked={settings.reduceAnimations}
            label={t.settings.reduceAnimations}
            text={t.settings.reduceAnimationsText}
            icon={<Zap size={18} />}
            onChange={(value) => setSetting("reduceAnimations", value)}
          />

          {loaded ? (
            <DeveloperRequestBox
              onClose={onClose}
              onRequest={requestDeveloperAccess}
              role={session?.activeRole}
              hasPendingRequest={Boolean(developerRequest)}
            />
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function DeveloperRequestBox({
  role,
  hasPendingRequest,
  onRequest,
  onClose
}: {
  role?: "player" | "developer" | "admin";
  hasPendingRequest: boolean;
  onRequest: () => unknown;
  onClose: () => void;
}) {
  const { t } = usePlayFound();

  if (role === "admin") {
    return null;
  }

  if (!role) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">
            <UserPlus size={18} />
          </span>
          <div>
            <h3 className="font-black">{t.settings.developerAccessTitle}</h3>
            <p className="mt-1 text-sm leading-6 muted">
              {t.settings.developerAccessGuest}
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link href="/login" className="btn btn-secondary" onClick={onClose}>
            {t.nav.login}
          </Link>
          <Link href="/register" className="btn btn-primary" onClick={onClose}>
            {t.nav.register}
          </Link>
        </div>
      </div>
    );
  }

  if (role === "developer") {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <h3 className="font-black">{t.settings.developerAccessReady}</h3>
            <p className="mt-1 text-sm leading-6 muted">
              {t.settings.developerAccessReadyText}
            </p>
          </div>
        </div>
        <Link href="/developer/games" className="btn btn-secondary mt-4" onClick={onClose}>
          <BarChart3 size={18} />
          {t.nav.myGames}
        </Link>
      </div>
    );
  }

  if (hasPendingRequest) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">
            <Clock3 size={18} />
          </span>
          <div>
            <h3 className="font-black">{t.settings.developerAccessPending}</h3>
            <p className="mt-1 text-sm leading-6 muted">
              {t.settings.developerAccessPendingText}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">
          <Send size={18} />
        </span>
        <div>
          <h3 className="font-black">{t.settings.developerAccessTitle}</h3>
          <p className="mt-1 text-sm leading-6 muted">
            {t.settings.developerAccessText}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-4 w-full"
        onClick={() => onRequest()}
      >
        <Send size={18} />
        {t.settings.developerAccessAction}
      </button>
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
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
          checked
            ? "border-[var(--accent)] bg-[var(--accent)]"
            : "border-[var(--line-strong)] bg-[var(--panel-strong)]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}
