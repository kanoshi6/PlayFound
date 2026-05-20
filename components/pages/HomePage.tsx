"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Eye,
  Rocket,
  Sparkles,
  Users
} from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { PricingCards } from "@/components/PricingCards";
import { games } from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";

export function HomePage() {
  const { t } = usePlayFound();
  const gamesOfWeek = games.filter((game) => game.featuredWeek).slice(0, 3);
  const demos = games.filter((game) => game.newDemo).slice(0, 4);

  return (
    <>
      <section className="container-shell grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
        <div>
          <span className="eyebrow">
            <Sparkles size={15} />
            {t.home.heroEyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
            {t.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 muted sm:text-xl">
            {t.home.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalog" className="btn btn-primary">
              {t.common.watchGames}
              <ArrowRight size={18} />
            </Link>
            <Link href="/submit" className="btn btn-secondary">
              {t.common.addGame}
            </Link>
            <Link href="/developers" className="btn btn-ghost">
              {t.common.forDevelopers}
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {t.home.liveStats.map((stat) => (
              <div
                className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] px-4 py-3"
                key={stat}
              >
                <p className="text-sm font-black text-[var(--accent-2)]">
                  {stat}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-card overflow-hidden rounded-[2rem]">
            <div
              className="media-frame aspect-[4/4.4]"
              style={
                {
                  "--media-gradient":
                    "linear-gradient(135deg, #050806, #10281a 36%, #1e7e4c 67%, #75e89a)"
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                <div className="flex justify-between gap-3">
                  <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs font-black uppercase text-white backdrop-blur">
                    PlayFound alpha
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#062012]">
                    wishlist +94%
                  </span>
                </div>
                <div>
                  <p className="max-w-sm text-4xl font-black leading-tight text-white sm:text-5xl">
                    Indie games before the noise
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Demo", "04"],
                      ["Reviews", "128"],
                      ["Launch", "Q3"]
                    ].map(([label, value]) => (
                      <div
                        className="rounded-2xl border border-white/18 bg-black/24 p-3 text-white backdrop-blur"
                        key={label}
                      >
                        <p className="text-2xl font-black">{value}</p>
                        <p className="text-xs font-bold uppercase text-white/70">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Showcase
        eyebrow={t.home.weekTitle}
        title={t.home.weekTitle}
        text={t.home.weekText}
        games={gamesOfWeek}
      />

      <Showcase
        eyebrow={t.home.demoTitle}
        title={t.home.demoTitle}
        text={t.home.demoText}
        games={demos}
        compact
      />

      <section className="section-pad border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--panel-soft)_58%,transparent)]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="eyebrow">
              <BadgeCheck size={15} />
              PlayFound
            </span>
            <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
              {t.home.whyTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 muted">{t.home.whyText}</p>
          </div>
          <div className="grid gap-4">
            {t.home.whyItems.map((item, index) => (
              <article
                className="glass-card flex gap-4 rounded-[1.25rem] p-5"
                key={item}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-sm font-black text-[var(--accent-2)]">
                  {index + 1}
                </span>
                <p className="leading-7 muted">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Rocket size={15} />
            Flow
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
            {t.home.howTitle}
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.home.howSteps.map((step, index) => (
            <article className="glass-card rounded-[1.25rem] p-6" key={step.title}>
              <span className="text-sm font-black text-[var(--accent-2)]">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-2xl font-black">{step.title}</h3>
              <p className="mt-3 leading-7 muted">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-4 pb-16 lg:grid-cols-2">
        <AudienceBlock
          icon={<Users size={24} />}
          title={t.home.playersTitle}
          text={t.home.playersText}
          href="/catalog"
          action={t.home.viewCatalog}
        />
        <AudienceBlock
          icon={<Eye size={24} />}
          title={t.home.devsTitle}
          text={t.home.devsText}
          href="/developers"
          action={t.common.forDevelopers}
        />
      </section>

      <section className="section-pad border-y border-[var(--line)]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">
              <Rocket size={15} />
              Future
            </span>
            <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
              {t.home.futureTitle}
            </h2>
          </div>
          <div className="glass-card rounded-[1.5rem] p-6">
            <p className="text-lg leading-8 muted">{t.home.futureText}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.home.futureItems.map((item) => (
                <span
                  className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] px-4 py-3 font-black text-[var(--muted-strong)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="mb-8 max-w-3xl">
          <span className="eyebrow">
            <CircleDollarSign size={15} />
            Promo
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
            {t.home.pricingTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 muted">{t.home.pricingText}</p>
        </div>
        <PricingCards />
      </section>
    </>
  );
}

function Showcase({
  eyebrow,
  title,
  text,
  games: showcaseGames,
  compact
}: {
  eyebrow: string;
  title: string;
  text: string;
  games: typeof games;
  compact?: boolean;
}) {
  const { t } = usePlayFound();

  return (
    <section className="container-shell pb-16">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 leading-7 muted">{text}</p>
        </div>
        <Link href="/catalog" className="btn btn-secondary">
          {t.nav.catalog}
          <ArrowRight size={18} />
        </Link>
      </div>
      <div
        className={`grid gap-4 ${
          compact
            ? "md:grid-cols-2 xl:grid-cols-4"
            : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {showcaseGames.map((game) => (
          <GameCard game={game} compact={compact} key={game.id} />
        ))}
      </div>
    </section>
  );
}

function AudienceBlock({
  icon,
  title,
  text,
  href,
  action
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  action: string;
}) {
  return (
    <article className="glass-card rounded-[1.5rem] p-6">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent-2)]">
        {icon}
      </span>
      <h2 className="mt-5 text-3xl font-black">{title}</h2>
      <p className="mt-3 leading-7 muted">{text}</p>
      <Link href={href} className="btn btn-secondary mt-6">
        {action}
        <ArrowRight size={18} />
      </Link>
    </article>
  );
}
