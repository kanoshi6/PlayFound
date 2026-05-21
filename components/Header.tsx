"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
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
import { useState, type ReactNode } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useAuth } from "@/lib/auth-context";
import { usePlayFound } from "@/lib/settings-context";

const playerNav = [
  { href: "/catalog", label: "Каталог", icon: Gamepad2 },
  { href: "/clips", label: "Ролики", icon: Clapperboard },
  { href: "/forum", label: "Форум", icon: MessageSquare }
] as const;

export function Header() {
  const pathname = usePathname();
  const { wishlistCount } = usePlayFound();
  const { loaded, session, currentUser, developerProfile, logout } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const nav = (
    <nav className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-1">
      <NavLink href="/" label="Главная" active={pathname === "/"} onClick={closeMenu} />
      {playerNav.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.href} href={item.href} label={item.label} active={pathname.startsWith(item.href)} onClick={closeMenu} icon={<Icon size={15} />} />
        );
      })}
    </nav>
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] backdrop-blur-2xl">
        <div className="mx-auto flex min-h-[4.35rem] w-full max-w-[1440px] items-center justify-between gap-2 px-2 sm:px-0">
          <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] shadow-glow transition group-hover:scale-105">
              <Gamepad2 size={22} color="var(--accent-2)" />
            </span>
            <span className="hidden min-w-0 flex-col leading-none sm:flex">
              <span className="whitespace-nowrap text-lg font-black tracking-normal">PlayFound</span>
              <span className="mt-1 hidden whitespace-nowrap text-[0.64rem] font-black uppercase tracking-[0.08em] text-[var(--muted)] 2xl:block">
                инди-платформа
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center xl:flex">{nav}</div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              href="/catalog"
              className="hidden h-10 items-center gap-2 rounded-full border border-[var(--line)] px-3 text-sm font-black text-[var(--muted-strong)] transition hover:border-[var(--line-strong)] md:flex"
              title="Wishlist"
            >
              <Heart size={16} color="var(--accent)" />
              {wishlistCount}
            </Link>
            <Link
              href="/notifications"
              className="hidden h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--muted-strong)] transition hover:border-[var(--line-strong)] hover:text-[var(--text)] md:grid"
              title="Уведомления"
            >
              <Bell size={17} />
            </Link>
            <button type="button" className="btn btn-ghost h-10 w-10 px-0" aria-label="Настройки" onClick={() => setSettingsOpen(true)}>
              <Settings size={18} />
            </button>

            {loaded && !session ? (
              <>
                <Link href="/login" className="btn btn-secondary hidden md:flex">
                  <LogIn size={17} />
                  Войти
                </Link>
                <Link href="/register" className="btn btn-primary hidden md:flex">
                  <UserPlus size={17} />
                  Регистрация
                </Link>
              </>
            ) : null}

            {loaded && session && session.activeRole !== "admin" ? (
              <>
                <Link href="/profile" className="btn btn-secondary hidden md:flex">
                  <User size={17} />
                  <span className="max-w-24 truncate" style={{ color: currentUser?.nicknameColor }}>
                    {session.activeRole === "developer" ? developerProfile?.displayName ?? session.displayName : session.displayName}
                  </span>
                </Link>
                {session.activeRole === "developer" ? (
                  <>
                    <Link href="/developer/games" className="btn btn-secondary hidden 2xl:flex">Мои игры</Link>
                    <Link href="/submit" className="btn btn-primary hidden 2xl:flex"><Plus size={17} /> Добавить</Link>
                  </>
                ) : null}
                <button type="button" className="btn btn-ghost hidden md:flex" onClick={logout}>
                  <LogOut size={17} />
                  Выйти
                </button>
              </>
            ) : null}

            {loaded && session?.activeRole === "admin" ? (
              <>
                <Link href="/admin" className="btn btn-primary hidden md:flex"><ShieldCheck size={17} /> Админка</Link>
                <button type="button" className="btn btn-ghost hidden md:flex" onClick={logout}><LogOut size={17} /> Выйти</button>
              </>
            ) : null}

            <button type="button" className="btn btn-secondary h-10 w-10 px-0 xl:hidden" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} onClick={() => setMenuOpen((current) => !current)}>
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-[var(--line)] xl:hidden">
            <div className="container-shell grid gap-4 py-4">
              {nav}
              {loaded && !session ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link href="/login" onClick={closeMenu} className="btn btn-secondary"><LogIn size={18} /> Войти</Link>
                  <Link href="/register" onClick={closeMenu} className="btn btn-primary"><UserPlus size={18} /> Регистрация</Link>
                </div>
              ) : null}
              {loaded && session && session.activeRole !== "admin" ? (
                <div className="grid gap-2">
                  <Link href="/profile" onClick={closeMenu} className="btn btn-secondary"><User size={18} /> Профиль</Link>
                  {session.activeRole === "developer" ? (
                    <>
                      <Link href="/developer/games" onClick={closeMenu} className="btn btn-secondary">Мои игры</Link>
                      <Link href="/submit" onClick={closeMenu} className="btn btn-primary"><Plus size={18} /> Добавить игру</Link>
                      <Link href="/jobs" onClick={closeMenu} className="btn btn-secondary">Вакансии</Link>
                    </>
                  ) : null}
                  <button type="button" className="btn btn-ghost" onClick={logout}><LogOut size={18} /> Выйти</button>
                </div>
              ) : null}
              {loaded && session?.activeRole === "admin" ? (
                <div className="grid gap-2">
                  <Link href="/admin" onClick={closeMenu} className="btn btn-primary"><ShieldCheck size={18} /> Админка</Link>
                  <button type="button" className="btn btn-ghost" onClick={logout}><LogOut size={18} /> Выйти</button>
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

function NavLink({ href, label, active, icon, onClick }: { href: string; label: string; active: boolean; icon?: ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-black leading-none transition ${
        active
          ? "bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent-2)]"
          : "text-[var(--muted-strong)] hover:bg-[color-mix(in_srgb,var(--accent)_9%,transparent)] hover:text-[var(--text)]"
      }`}
    >
      {icon ? <span className="mr-1.5 shrink-0">{icon}</span> : null}
      {label}
    </Link>
  );
}
