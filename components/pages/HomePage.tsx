"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Clapperboard, Compass, Gamepad2, Heart, Search, Sparkles, Users } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { games } from "@/lib/games";

export function HomePage() {
  const gamesOfWeek = games.filter((game) => game.featuredWeek).slice(0, 3);
  const demos = games.filter((game) => game.newDemo).slice(0, 4);
  const popular = [...games].sort((a, b) => b.interest - a.interest).slice(0, 6);

  return (
    <>
      <section className="container-shell grid min-h-[calc(100vh-4.35rem)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="reveal-card">
          <span className="eyebrow"><Sparkles size={15} /> Игры, которые ты мог пропустить</span>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
            Находи инди-игры раньше, чем о них заговорят все
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 muted sm:text-xl">
            PlayFound — игровая платформа для игроков: каталог, короткие ролики, избранное, библиотека, форум, друзья и будущие покупки без подписочной модели.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalog" className="btn btn-primary">
              Смотреть каталог <ArrowRight size={18} />
            </Link>
            <Link href="/clips" className="btn btn-secondary">
              <Clapperboard size={18} /> Ролики игр
            </Link>
            <Link href="/forum" className="btn btn-ghost">
              Обсуждения
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {["12 игр в каталоге", "без подписок", "9 валют и 10 языков"].map((stat) => (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] px-4 py-3" key={stat}>
                <p className="text-sm font-black text-[var(--accent-2)]">{stat}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal-card" style={{ animationDelay: "120ms" }}>
          <div className="player-first-gradient glass-card overflow-hidden rounded-[2rem] p-5">
            <div className="grid gap-4">
              {popular.slice(0, 3).map((game, index) => (
                <Link href={`/games/${game.slug}`} className={`interactive-card flex items-center gap-4 rounded-[1.5rem] border border-[var(--line)] bg-black/20 p-3 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--line-strong)] ${index === 1 ? "ml-8" : ""}`} key={game.id}>
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-xl font-black text-[var(--accent-2)]">
                    0{index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xl font-black">{game.title}</span>
                    <span className="mt-1 block truncate text-sm muted">{game.shortDescription.ru}</span>
                  </span>
                  <span className="ml-auto hidden rounded-full bg-white px-3 py-1 text-xs font-black text-[#062012] sm:block">
                    {game.interest}%
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[["Радар", "новые демо"], ["Wishlist", "сохрани игру"], ["Forum", "обсуди релиз"]].map(([value, label]) => (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={value}>
                  <p className="text-2xl font-black text-[var(--accent-2)]">{value}</p>
                  <p className="text-xs font-bold uppercase muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-4 pb-16 md:grid-cols-4">
        {[
          { icon: <Search size={20} />, title: "Поиск", text: "жанры, цена, язык, платформа" },
          { icon: <Clapperboard size={20} />, title: "Shorts", text: "ролики сразу открываются в просмотре" },
          { icon: <Heart size={20} />, title: "Библиотека", text: "wishlist, купленные и скачанные игры" },
          { icon: <Users size={20} />, title: "Друзья", text: "добавление по ID игрока" }
        ].map((item, index) => (
          <article className="interactive-card glass-card rounded-[1.5rem] p-5 reveal-card" style={{ animationDelay: `${index * 80}ms` }} key={item.title}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">{item.icon}</span>
            <h3 className="mt-4 text-xl font-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 muted">{item.text}</p>
          </article>
        ))}
      </section>

      <Showcase eyebrow="Игры недели" title="Подборка для игроков" text="Проекты, которые уже можно открыть, сохранить, обсудить и показать друзьям." games={gamesOfWeek} />
      <Showcase eyebrow="Новые демо" title="Попробуй до релиза" text="Демо-версии и ранние сборки — лучший способ найти игру раньше остальных." games={demos} compact />

      <section className="section-pad border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--panel-soft)_58%,transparent)]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="eyebrow"><BadgeCheck size={15} /> Без подписок</span>
            <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">Модель как у магазина, а не подписочного сервиса</h2>
            <p className="mt-4 text-lg leading-8 muted">
              В PlayFound могут быть бесплатные игры, разовые покупки, донаты, промокоды и скидки. Никаких обязательных подписок для игроков.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Бесплатные демо", "Разовые покупки", "Промокоды", "Донаты авторам", "Скидки", "Будущие платежи через backend"].map((item) => (
              <article className="glass-card rounded-[1.25rem] p-5" key={item}>
                <p className="text-xl font-black">{item}</p>
                <p className="mt-2 text-sm leading-6 muted">Механика описана в концепции и готова для дальнейшей реализации.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-4 lg:grid-cols-2">
          <AudienceBlock icon={<Gamepad2 size={24} />} title="В первую очередь — игроки" text="Главная ценность PlayFound — найти игру, которую не покажут большие алгоритмы: по жанру, языку, цене, тегам и коротким роликам." href="/catalog" action="Открыть каталог" />
          <AudienceBlock icon={<Compass size={24} />} title="Разработчики — в футере и кабинете" text="Авторы могут стать разработчиками, но это не должно мешать игрокам. Возможность спрятана в футере и на отдельной странице." href="/developers" action="Для разработчиков" />
        </div>
      </section>
    </>
  );
}

function Showcase({ eyebrow, title, text, games: showcaseGames, compact }: { eyebrow: string; title: string; text: string; games: typeof games; compact?: boolean }) {
  return (
    <section className="container-shell pb-16">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">{title}</h2>
          <p className="mt-3 leading-7 muted">{text}</p>
        </div>
        <Link href="/catalog" className="btn btn-secondary">Каталог <ArrowRight size={18} /></Link>
      </div>
      <div className={`grid gap-4 ${compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3"}`}>
        {showcaseGames.map((game, index) => <div className="reveal-card" style={{ animationDelay: `${index * 70}ms` }} key={game.id}><GameCard game={game} compact={compact} /></div>)}
      </div>
    </section>
  );
}

function AudienceBlock({ icon, title, text, href, action }: { icon: React.ReactNode; title: string; text: string; href: string; action: string }) {
  return (
    <article className="interactive-card glass-card rounded-[1.75rem] p-7">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">{icon}</span>
      <h3 className="mt-5 text-3xl font-black">{title}</h3>
      <p className="mt-3 leading-7 muted">{text}</p>
      <Link href={href} className="btn btn-primary mt-6 w-fit">{action} <ArrowRight size={18} /></Link>
    </article>
  );
}
