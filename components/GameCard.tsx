"use client";

import Link from "next/link";
import { Download, ExternalLink, Eye, Heart, ShoppingCart, Star } from "lucide-react";
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
  const discount = game.priceType === "paid" ? `-${30 + ((Number(game.id.replace(/\D/g, "")) || 1) % 4) * 10}%` : null;

  return (
    <article className="game-card gog-card group overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel-strong)]">
      <Link href={`/games/${game.slug}`} aria-label={`${t.common.details}: ${game.title}`} className="relative block">
        <GameMedia gradient={game.image} title={game.title} label={t.statuses[game.status]} className={compact ? "aspect-[16/8]" : "aspect-[16/9]"} />
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/36 group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur">
            <Eye size={22} />
          </span>
        </div>
      </Link>

      <div className={`relative grid ${compact ? "gap-3 p-4" : "gap-4 p-5"} compact-gap`}>
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

        <p className="compact-hide min-h-[3rem] text-sm leading-6 muted">{game.shortDescription[language]}</p>

        <div className="flex flex-wrap gap-2 compact-hide">
          {tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          <span className="tag">{settings.marketLanguage.toUpperCase()}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-2 font-black text-[var(--accent-2)]">
            <Star size={16} fill="var(--accent)" color="var(--accent)" />
            {game.rating.toFixed(1)}
            <span className="font-semibold text-[var(--muted)]">· {formatInterest(game.interest)} интерес</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel-soft)] px-3 py-1.5 font-black">
            {discount ? <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-[var(--accent-contrast)]">{discount}</span> : null}
            {price}
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
          <Link href={`/games/${game.slug}`} className="btn btn-secondary text-sm">Подробнее</Link>
          <button type="button" className={`btn text-sm ${wishlisted ? "btn-primary" : "btn-secondary"}`} onClick={() => toggleWishlist(game.id)}>
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
            <span className="sr-only">{wishlisted ? t.common.wishlisted : t.common.inWishlist}</span>
          </button>
          <a href={getPrimaryGameLink(game)} target="_blank" rel="noreferrer" className="btn btn-ghost text-sm">
            {game.priceType === "free" ? <Download size={16} /> : <ShoppingCart size={16} />}
            {game.priceType === "free" ? "Скачать" : "Купить"}
          </a>
        </div>

        <div className="gog-hover-panel pointer-events-none absolute inset-x-3 top-3 z-30 hidden rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--panel-strong)_95%,black_5%)] p-4 opacity-0 shadow-2xl backdrop-blur-xl transition duration-300 md:block">
          <p className="text-xs font-black uppercase text-[var(--accent-2)]">Быстрый предпросмотр</p>
          <h3 className="mt-2 text-lg font-black">{game.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 muted">{game.shortDescription[language]}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="tag">{price}</span>
            <span className="tag">{t.statuses[game.status]}</span>
            <span className="tag">{game.platforms.slice(0, 3).join(" · ")}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
