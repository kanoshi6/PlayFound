"use client";

import Link from "next/link";
import { ExternalLink, Heart, Star } from "lucide-react";
import type { Game } from "@/lib/games";
import { GameMedia } from "@/components/GameMedia";
import { usePlayFound } from "@/lib/settings-context";
import { formatInterest, getLocalizedTags, getPrimaryGameLink } from "@/lib/utils";

type Props = {
  game: Game;
  compact?: boolean;
};

export function GameCard({ game, compact = false }: Props) {
  const { settings, t, isWishlisted, toggleWishlist } = usePlayFound();
  const language = settings.language;
  const wishlisted = isWishlisted(game.id);
  const tags = getLocalizedTags(game, language).slice(0, compact ? 2 : 4);

  return (
    <article className="game-card glass-card overflow-hidden rounded-[var(--radius)]">
      <Link href={`/games/${game.slug}`} aria-label={`${t.common.details}: ${game.title}`}>
        <GameMedia
          gradient={game.image}
          title={game.title}
          label={t.statuses[game.status]}
          className={compact ? "aspect-[16/8]" : "aspect-[16/10]"}
        />
      </Link>

      <div className={`grid ${compact ? "gap-3 p-4" : "gap-4 p-5"} compact-gap`}>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase text-[var(--accent-2)]">
            <span>{t.genres[game.genre]}</span>
            <span className="text-[var(--muted)]">/</span>
            <span>{game.platforms.join(" · ")}</span>
          </div>
          <Link
            href={`/games/${game.slug}`}
            className="mt-2 block text-xl font-black leading-tight transition hover:text-[var(--accent-2)]"
          >
            {game.title}
          </Link>
        </div>

        <p className="compact-hide min-h-[3.2rem] text-sm leading-6 muted">
          {game.shortDescription[language]}
        </p>

        <div className="flex flex-wrap gap-2 compact-hide">
          {tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 font-black text-[var(--accent-2)]">
            <Star size={16} fill="var(--accent)" color="var(--accent)" />
            {game.rating.toFixed(1)}
          </span>
          <span className="font-semibold muted">
            {formatInterest(game.interest)} {t.common.audienceInterest}
          </span>
          <span className="tag">
            {game.priceType === "free" ? t.common.free : t.common.paid}
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <Link href={`/games/${game.slug}`} className="btn btn-secondary text-sm">
            {t.common.details}
          </Link>
          <button
            type="button"
            className={`btn text-sm ${
              wishlisted ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => toggleWishlist(game.id)}
          >
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
            {wishlisted ? t.common.wishlisted : t.common.inWishlist}
          </button>
          <a
            href={getPrimaryGameLink(game)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost text-sm"
          >
            <ExternalLink size={16} />
            {t.common.goToGame}
          </a>
        </div>
      </div>
    </article>
  );
}
