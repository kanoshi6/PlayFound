"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Heart, MessageSquare, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/GameCard";
import { GameMedia } from "@/components/GameMedia";
import type { Game } from "@/lib/games";
import { getRelatedGames } from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";
import {
  formatInterest,
  getLocalizedList,
  getLocalizedTags
} from "@/lib/utils";

export function GameDetailPage({ game }: { game: Game }) {
  const { settings, t, isWishlisted, toggleWishlist } = usePlayFound();
  const [toast, setToast] = useState("");
  const language = settings.language;
  const related = useMemo(() => getRelatedGames(game), [game]);
  const wishlisted = isWishlisted(game.id);

  const handleWishlist = () => {
    const added = toggleWishlist(game.id);
    setToast(added ? t.game.added : t.game.removed);
    window.setTimeout(() => setToast(""), 2200);
  };

  const handleReview = () => {
    setToast(t.game.reviewToast);
    window.setTimeout(() => setToast(""), 2600);
  };

  return (
    <>
      <section className="container-shell py-8 sm:py-10">
        <div className="glass-card overflow-hidden rounded-[2rem]">
          <GameMedia
            gradient={game.banner}
            title={game.title}
            label={t.statuses[game.status]}
            className="min-h-[28rem] lg:min-h-[34rem]"
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="tag">{t.genres[game.genre]}</span>
              <span className="tag">{game.platforms.join(" · ")}</span>
              <span className="tag">{t.statuses[game.status]}</span>
              <span className="tag">
                {game.priceType === "free" ? t.common.free : t.common.paid}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
              {game.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 muted">
              {game.shortDescription[language]}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className={`btn ${wishlisted ? "btn-primary" : "btn-secondary"}`}
                onClick={handleWishlist}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                {wishlisted ? t.common.wishlisted : t.common.inWishlist}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReview}
              >
                <MessageSquare size={18} />
                {t.common.leaveReview}
              </button>
              <a
                href={game.links[0]?.url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <ExternalLink size={18} />
                {t.common.goToGame}
              </a>
            </div>
            {toast ? (
              <p className="mt-4 rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-4 py-3 text-sm font-bold text-[var(--accent-2)]">
                {toast}
              </p>
            ) : null}
          </div>

          <aside className="surface h-fit rounded-[1.5rem] p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-black">{t.common.rating}</span>
              <span className="inline-flex items-center gap-2 text-xl font-black text-[var(--accent-2)]">
                <Star size={18} fill="var(--accent)" color="var(--accent)" />
                {game.rating.toFixed(1)}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
              <span className="font-black">{t.common.audienceInterest}</span>
              <span className="text-xl font-black text-[var(--accent-2)]">
                {formatInterest(game.interest)}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {getLocalizedTags(game, language).map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="container-shell grid gap-10 pb-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-10">
          <ContentBlock title={t.game.screenshots}>
            <div className="grid gap-4 sm:grid-cols-3">
              {game.screenshots.map((screenshot, index) => (
                <GameMedia
                  gradient={screenshot}
                  title={`${game.title} #${index + 1}`}
                  className="aspect-[16/11] rounded-[1.1rem]"
                  key={screenshot}
                />
              ))}
            </div>
          </ContentBlock>

          <ContentBlock title={t.game.about}>
            <p className="text-lg leading-8 muted">{game.description[language]}</p>
          </ContentBlock>

          <ContentBlock title={t.game.whyTry}>
            <div className="grid gap-3">
              {getLocalizedList(game.why, language).map((item, index) => (
                <div
                  className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4"
                  key={item}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-sm font-black text-[var(--accent-2)]">
                    {index + 1}
                  </span>
                  <p className="leading-7 muted">{item}</p>
                </div>
              ))}
            </div>
          </ContentBlock>
        </div>

        <div className="grid h-fit gap-5">
          <ContentBlock title={t.game.requirements}>
            {game.requirements ? (
              <div className="grid gap-4">
                <Requirement label={t.game.minimum} text={game.requirements.minimum} />
                <Requirement
                  label={t.game.recommended}
                  text={game.requirements.recommended}
                />
              </div>
            ) : (
              <p className="leading-7 muted">{t.game.pcOnly}</p>
            )}
          </ContentBlock>

          <ContentBlock title={t.game.links}>
            <div className="grid gap-2">
              {game.links.map((link) => (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary justify-between"
                  key={link.label}
                >
                  {link.label}
                  <ExternalLink size={17} />
                </a>
              ))}
            </div>
          </ContentBlock>
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black">{t.game.similar}</h2>
          <Link href="/catalog" className="btn btn-ghost">
            {t.nav.catalog}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <GameCard game={item} compact key={item.id} />
          ))}
        </div>
      </section>
    </>
  );
}

function ContentBlock({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="glass-card rounded-[1.5rem] p-5 sm:p-6">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Requirement({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
      <p className="font-black text-[var(--accent-2)]">{label}</p>
      <p className="mt-2 leading-7 muted">{text}</p>
    </div>
  );
}
