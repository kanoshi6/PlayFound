"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { games } from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";

export function WishlistPage() {
  const { wishlistIds } = usePlayFound();
  const wishlistGames = games.filter((game) => wishlistIds.includes(game.id));

  return (
    <section className="container-shell section-pad">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow"><Heart size={15} /> Wishlist</span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Избранные игры</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 muted">Здесь лежат игры, которые ты отметил сердечком. Сердце в шапке теперь ведёт сюда, а не обратно в каталог.</p>
        </div>
        <Link href="/catalog" className="btn btn-secondary"><Search size={17} /> Найти ещё</Link>
      </div>

      {wishlistGames.length > 0 ? (
        <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {wishlistGames.map((game, index) => (
            <div className="reveal-card h-full" style={{ animationDelay: `${index * 45}ms` }} key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-[1.75rem] p-8 text-center">
          <Heart className="mx-auto text-[var(--accent-2)]" size={40} />
          <h2 className="mt-4 text-2xl font-black">Wishlist пока пуст</h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 muted">Открой каталог и нажми сердечко на карточке игры — она появится здесь.</p>
          <Link href="/catalog" className="btn btn-primary mt-6">Открыть каталог</Link>
        </div>
      )}
    </section>
  );
}
