"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function Footer() {
  const { session } = useAuth();

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/catalog", label: "Каталог" },
    { href: "/clips", label: "Ролики" },
    { href: "/forum", label: "Форум" },
    { href: "/jobs", label: "Вакансии" },
    { href: "/developers", label: "Для разработчиков" },
    { href: "/support", label: "Поддержка" },
    ...(session?.activeRole === "developer"
      ? [{ href: "/submit", label: "Добавить игру" }, { href: "/developer/games", label: "Мои игры" }]
      : []),
    ...(session?.activeRole === "admin" ? [{ href: "/admin", label: "Админка" }] : []),
    { href: "/about", label: "О проекте" }
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_76%,transparent)]">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
              <Gamepad2 size={22} color="var(--accent-2)" />
            </span>
            <span className="text-xl font-black">PlayFound</span>
          </div>
          <p className="mt-4 max-w-md leading-7 muted">
            Платформа для публикации, продвижения и будущей продажи инди-игр: каталог, ролики, форум, вакансии, профили и модерация.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 muted">
            На первом этапе PlayFound — client-only прототип без подписок. В продакшене нужны backend, база данных, платежи, проверка файлов и юридические документы.
          </p>
        </div>

        <div>
          <h3 className="font-black">Навигация</h3>
          <div className="mt-4 grid gap-3">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-2)]"
                key={`${link.href}-${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black">Контакты</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-[var(--muted)]">
            <a href="mailto:hello@playfound.local" className="hover:text-[var(--accent-2)]">
              hello@playfound.local
            </a>
            <span>press@playfound.local</span>
            <span>partners@playfound.local</span>
          </div>
        </div>

        <div>
          <h3 className="font-black">Соцсети</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Telegram", "VK", "YouTube", "Discord"].map((social) => (
              <a
                href="https://example.com"
                target="_blank"
                rel="noreferrer"
                key={social}
                className="rounded-full border border-[var(--line)] px-3 py-2 text-sm font-bold text-[var(--muted-strong)] transition hover:border-[var(--line-strong)] hover:text-[var(--accent-2)]"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
