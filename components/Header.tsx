"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  Clapperboard,
  Gamepad2,
  Heart,
  LogIn,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  ShieldCheck,
  User,
  UserPlus,
  X
} from "lucide-react";
import { useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useAuth } from "@/lib/auth-context";
import { usePlayFound } from "@/lib/settings-context";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/clips", label: "Ролики", icon: Clapperboard },
  { href: "/forum", label: "Форум", icon: MessageSquare },
  { href: "/jobs", label: "Вакансии", icon: Briefcase },
  { href: "/support", label: "Поддержка" },
  { href: "/about", label: "О проекте" }
] as const;

export function Header() {
  const pathname = usePathname();
  const { wishlistCount } = usePlayFound();
  const { loaded, session, currentUser, logout } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-1">
      {navItems.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = "icon" in item ? item.icon : null;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`inline-flex whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold leading-none transition ${
              active
                ? "bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent-2)]"
                : "text-[var(--muted-strong)] hover:bg-[color-mix(in_srgb,var(--accent)_9%,transparent)] hover:text-[var(--text)]"
            }`}
          >
            {Icon ? <Icon className="mr-1.5" size={15} /> : null}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-2xl">
        <div className="container-shell flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] shadow-glow transition group-hover:scale-105">
              <Gamepad2 size={22} color="var(--accent-2)" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-normal">PlayFound</span>
              <span className="hidden text-xs font-bold uppercase text-[var(--muted)] sm:block">
                инди-платформа
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center xl:flex">{nav}</div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/catalog"
              className="hidden items-center gap-2 rounded-full border border-[var(--line)] px-3 py-2 text-sm font-bold text-[var(--muted-strong)] md:flex"
              title="Wishlist"
            >
              <Heart size={17} color="var(--accent)" />
              {wishlistCount}
            </Link>
            <Link
              href="/notifications"
              className="hidden h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-[var(--muted-strong)] transition hover:border-[var(--line-strong)] hover:text-[var(--text)] md:grid"
              title="Уведомления"
            >
              <Bell size={18} />
            </Link>
            <button
              type="button"
              className="btn btn-ghost h-11 w-11 px-0"
              aria-label="Настройки"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings size={19} />
            </button>

            {loaded && !session ? (
              <>
                <Link href="/login" className="btn btn-secondary hidden md:flex">
                  <LogIn size={18} />
                  Войти
                </Link>
                <Link href="/register" className="btn btn-primary hidden md:flex">
                  <UserPlus size={18} />
                  Регистрация
                </Link>
              </>
            ) : null}

            {loaded && session && session.activeRole !== "admin" ? (
              <>
                <Link href="/profile" className="btn btn-secondary hidden md:flex">
                  <User size={18} />
                  <span className="max-w-32 truncate" style={{ color: currentUser?.nicknameColor }}>
                    {session.displayName}
                  </span>
                </Link>
                {session.activeRole === "player" ? (
                  <Link href="/developers" className="btn btn-ghost hidden lg:flex">
                    Стать разработчиком
                  </Link>
                ) : null}
                {session.activeRole === "developer" ? (
                  <>
                    <Link href="/developer/games" className="btn btn-secondary hidden lg:flex">
                      Мои игры
                    </Link>
                    <Link href="/submit" className="btn btn-primary hidden lg:flex">
                      <Plus size={18} />
                      Добавить игру
                    </Link>
                  </>
                ) : null}
                <button type="button" className="btn btn-ghost hidden md:flex" onClick={logout}>
                  <LogOut size={18} />
                  Выйти
                </button>
              </>
            ) : null}

            {loaded && session?.activeRole === "admin" ? (
              <>
                <Link href="/admin" className="btn btn-primary hidden md:flex">
                  <ShieldCheck size={18} />
                  Админка
                </Link>
                <button type="button" className="btn btn-ghost hidden md:flex" onClick={logout}>
                  <LogOut size={18} />
                  Выйти
                </button>
              </>
            ) : null}

            <button
              type="button"
              className="btn btn-secondary h-11 w-11 px-0 xl:hidden"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-[var(--line)] xl:hidden">
            <div className="container-shell grid gap-4 py-4">
              {nav}
              {loaded && !session ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="btn btn-secondary">
                    <LogIn size={18} />
                    Войти
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="btn btn-primary">
                    <UserPlus size={18} />
                    Регистрация
                  </Link>
                </div>
              ) : null}
              {loaded && session && session.activeRole !== "admin" ? (
                <div className="grid gap-2">
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="btn btn-secondary">
                    <User size={18} />
                    Профиль
                  </Link>
                  {session.activeRole === "player" ? (
                    <Link href="/developers" onClick={() => setMenuOpen(false)} className="btn btn-secondary">
                      Стать разработчиком
                    </Link>
                  ) : null}
                  {session.activeRole === "developer" ? (
                    <>
                      <Link href="/developer/games" onClick={() => setMenuOpen(false)} className="btn btn-secondary">
                        Мои игры
                      </Link>
                      <Link href="/submit" onClick={() => setMenuOpen(false)} className="btn btn-primary">
                        <Plus size={18} />
                        Добавить игру
                      </Link>
                    </>
                  ) : null}
                  <button type="button" className="btn btn-ghost" onClick={logout}>
                    <LogOut size={18} />
                    Выйти
                  </button>
                </div>
              ) : null}
              {loaded && session?.activeRole === "admin" ? (
                <div className="grid gap-2">
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="btn btn-primary">
                    <ShieldCheck size={18} />
                    Админка
                  </Link>
                  <button type="button" className="btn btn-ghost" onClick={logout}>
                    <LogOut size={18} />
                    Выйти
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
