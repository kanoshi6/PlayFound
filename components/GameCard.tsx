"use client";

import Link from "next/link";
import { Download, ExternalLink, Heart, Play, Star } from "lucide-react";
import type { Game } from "@/lib/games";
import { GameMedia } from "@/components/GameMedia";
import { usePlayFound } from "@/lib/settings-context";
import { formatInterest, getLocalizedTags, getPrimaryGameLink } from "@/lib/utils";

type Props = {
  game: Game;
  compact?: boolean;
};

export function GameCard({ game, compact = false }: Props) {
  const { settings, t, isWishlisted, toggleWishlist, formatPrice } = usePlayFound();
  const language = settings.language;
  const wishlisted = isWishlisted(game.id);
  const tags = getLocalizedTags(game, language).slice(0, compact ? 2 : 4);
  const price = formatPrice(game.priceType, Number(game.id.replace(/\D/g, "")) || 1);

  return (
    <article className="game-card interactive-card glass-card overflow-hidden rounded-[var(--radius)]">
      <Link href={`/games/${game.slug}`} aria-label={`${t.common.details}: ${game.title}`} className="group relative block">
        <GameMedia gradient={game.image} title={game.title} label={t.statuses[game.status]} className={compact ? "aspect-[16/8]" : "aspect-[16/10]"} />
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/32 group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur">
            <Play size={24} fill="currentColor" />
          </span>
        </div>
        <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2 opacity-0 transition group-hover:opacity-100">
          <span className="tag bg-black/45 text-white backdrop-blur">Быстрый просмотр</span>
          <span className="tag bg-black/45 text-white backdrop-blur">{price}</span>
        </div>
      </Link>

      <div className={`grid ${compact ? "gap-3 p-4" : "gap-4 p-5"} compact-gap`}>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase text-[var(--accent-2)]">
            <span>{t.genres[game.genre]}</span>
            <span className="text-[var(--muted)]">/</span>
            <span>{game.platforms.join(" · ")}</span>
          </div>
          <Link href={`/games/${game.slug}`} className="mt-2 block text-xl font-black leading-tight transition hover:text-[var(--accent-2)]">
            {game.title}
          </Link>
        </div>

        <p className="compact-hide min-h-[3.2rem] text-sm leading-6 muted">{game.shortDescription[language]}</p>

        <div className="flex flex-wrap gap-2 compact-hide">
          {tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          <span className="tag">{settings.marketLanguage.toUpperCase()}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 font-black text-[var(--accent-2)]">
            <Star size={16} fill="var(--accent)" color="var(--accent)" />
            {game.rating.toFixed(1)}
          </span>
          <span className="font-semibold muted">{formatInterest(game.interest)} {t.common.audienceInterest}</span>
          <span className="tag">{price}</span>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <Link href={`/games/${game.slug}`} className="btn btn-secondary text-sm">{t.common.details}</Link>
          <button type="button" className={`btn text-sm ${wishlisted ? "btn-primary" : "btn-secondary"}`} onClick={() => toggleWishlist(game.id)}>
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
            {wishlisted ? t.common.wishlisted : t.common.inWishlist}
          </button>
          <a href={getPrimaryGameLink(game)} target="_blank" rel="noreferrer" className="btn btn-ghost text-sm">
            {game.priceType === "free" ? <Download size={16} /> : <ExternalLink size={16} />}
            {game.priceType === "free" ? "Скачать" : "Купить"}
          </a>
        </div>
      </div>
    </article>
  );
}
