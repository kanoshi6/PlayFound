"use client";

import Link from "next/link";
import { Download, Heart, ShoppingCart, Star } from "lucide-react";
import type { Game } from "@/lib/games";
import { GameMedia } from "@/components/GameMedia";
import { usePlayFound } from "@/lib/settings-context";
import { formatInterest, getLocalizedTags, getPrimaryGameLink } from "@/lib/utils";

type Props = {
  game: Game;
  compact?: boolean;
};

export function GameCard({ game, compact = false }: Props) {
  const {
    settings,
    t,
    isWishlisted,
    toggleWishlist,
    formatPrice,
    isInCart,
    toggleCart
  } = usePlayFound();
  const language = settings.language;
  const wishlisted = isWishlisted(game.id);
  const inCart = isInCart(game.id);
  const tags = getLocalizedTags(game, language).slice(0, compact ? 2 : 3);
  const price = formatPrice(game.priceType, Number(game.id.replace(/\D/g, "")) || 1);
  const discount = game.priceType === "paid" ? `-${30 + ((Number(game.id.replace(/\D/g, "")) || 1) % 4) * 10}%` : null;
  const actionText = game.priceType === "free" ? "Скачать" : inCart ? "В корзине" : "В корзину";

  return (
    <article className="game-card game-card-fixed group flex h-full min-h-[33.5rem] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel-strong)]">
      <div className="relative">
        <Link href={`/games/${game.slug}`} aria-label={`${t.common.details}: ${game.title}`} className="relative block overflow-hidden">
          <GameMedia gradient={game.image} title={game.title} label={t.statuses[game.status]} className={compact ? "aspect-[16/8]" : "aspect-[16/9]"} />
          <div className="absolute inset-0 z-20 bg-black/0 transition duration-300 group-hover:bg-black/18" />
        </Link>
        {discount ? (
          <span className="absolute right-3 top-3 z-30 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-black text-[var(--accent-contrast)] shadow-lg">
            {discount}
          </span>
        ) : null}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "gap-3 p-4" : "gap-4 p-5"} compact-gap`}>
        <div className="min-h-[4.6rem]">
          <div className="flex min-h-8 flex-wrap items-center gap-2 text-xs font-black uppercase text-[var(--accent-2)]">
            <span>{t.genres[game.genre]}</span>
            <span className="text-[var(--muted)]">/</span>
            <span className="line-clamp-1">{game.platforms.join(" · ")}</span>
          </div>
          <Link href={`/games/${game.slug}`} className="mt-2 line-clamp-2 block text-xl font-black leading-tight transition hover:text-[var(--accent-2)]">
            {game.title}
          </Link>
        </div>

        <p className="compact-hide line-clamp-3 min-h-[4.5rem] text-sm leading-6 muted">{game.shortDescription[language]}</p>

        <div className="compact-hide flex min-h-[4.1rem] flex-wrap content-start gap-2">
          {tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          <span className="tag">{settings.marketLanguage.toUpperCase()}</span>
        </div>

        <div className="mt-auto grid gap-3">
          <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 text-sm">
            <span className="inline-flex items-center gap-2 font-black text-[var(--accent-2)]">
              <Star size={16} fill="var(--accent)" color="var(--accent)" />
              {game.rating.toFixed(1)}
              <span className="font-semibold text-[var(--muted)]">· {formatInterest(game.interest)} интерес</span>
            </span>
            {game.priceType === "paid" ? (
              <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--panel-soft)] px-3 py-1.5 font-black">
                {price}
              </span>
            ) : null}
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <Link href={`/games/${game.slug}`} className="btn btn-secondary text-sm">Подробнее</Link>
            <button
              type="button"
              className={`btn h-12 min-w-12 px-0 text-sm ${wishlisted ? "btn-primary" : "btn-secondary"}`}
              aria-label={wishlisted ? t.common.wishlisted : t.common.inWishlist}
              onClick={(event) => {
                event.preventDefault();
                toggleWishlist(game.id);
              }}
            >
              <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
            </button>
            {game.priceType === "free" ? (
              <a href={getPrimaryGameLink(game)} target="_blank" rel="noreferrer" className="btn btn-ghost text-sm">
                <Download size={16} />
                {actionText}
              </a>
            ) : (
              <button
                type="button"
                className={`btn text-sm ${inCart ? "btn-primary" : "btn-ghost"}`}
                onClick={(event) => {
                  event.preventDefault();
                  toggleCart(game.id);
                }}
              >
                <ShoppingCart size={16} />
                {actionText}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
