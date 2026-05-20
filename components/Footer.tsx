"use client";

import Link from "next/link";
import { Gamepad2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function Footer() {
  const { session } = useAuth();

  const playerLinks = [
    { href: "/catalog", label: "Каталог" },
    { href: "/clips", label: "Ролики" },
    { href: "/forum", label: "Форум" },
    { href: "/jobs", label: "Вакансии" },
    { href: "/notifications", label: "Уведомления" },
    { href: "/profile", label: "Профиль" }
  ];

  const serviceLinks = [
    { href: "/support", label: "Поддержка" },
    { href: "/about", label: "О проекте" },
    { href: "/developers", label: session?.activeRole === "player" ? "Стать разработчиком" : "Для разработчиков" },
    ...(session?.activeRole === "developer"
      ? [{ href: "/developer/games", label: "Мои игры" }, { href: "/submit", label: "Добавить игру" }]
      : []),
    ...(session?.activeRole === "admin" ? [{ href: "/admin", label: "Админка" }] : [])
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)]">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
              <Gamepad2 size={22} color="var(--accent-2)" />
            </span>
            <span>
              <span className="block text-xl font-black">PlayFound</span>
              <span className="block text-xs font-black uppercase tracking-[0.12em] text-[var(--muted)]">Инди-игры для игроков</span>
            </span>
          </div>
          <p className="mt-4 max-w-md leading-7 muted">
            PlayFound в первую очередь помогает игрокам находить новые инди-игры: каталог, ролики, избранное, форум, друзья и библиотека.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 muted">
            Без подписок. Только бесплатные игры, разовые покупки, донаты, промокоды и будущая комиссия с продаж после подключения backend.
          </p>
        </div>

        <div>
          <h3 className="font-black">Игрокам</h3>
          <div className="mt-4 grid gap-3">
            {playerLinks.map((link) => (
              <Link href={link.href} className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-2)]" key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black">Платформа</h3>
          <div className="mt-4 grid gap-3">
            {serviceLinks.map((link) => (
              <Link href={link.href} className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-2)]" key={`${link.href}-${link.label}`}>
                {link.label}
              </Link>
            ))}
          </div>
          {session?.activeRole === "player" ? (
            <Link href="/developers" className="btn btn-secondary mt-5 w-fit">
              <ShieldCheck size={17} />
              Стать разработчиком
            </Link>
          ) : null}
        </div>

        <div>
          <h3 className="font-black">Контакты и соцсети</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-[var(--muted)]">
            <a href="mailto:hello@playfound.local" className="hover:text-[var(--accent-2)]">hello@playfound.local</a>
            <span>press@playfound.local</span>
            <span>partners@playfound.local</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Telegram", "VK", "YouTube", "Discord"].map((social) => (
              <a href="https://example.com" target="_blank" rel="noreferrer" key={social} className="rounded-full border border-[var(--line)] px-3 py-2 text-sm font-bold text-[var(--muted-strong)] transition hover:border-[var(--line-strong)] hover:text-[var(--accent-2)]">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
