"use client";

import Link from "next/link";
import { CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { GameMedia } from "@/components/GameMedia";
import { games } from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";

export function CartPage() {
  const { cartIds, removeFromCart, clearCart, formatPrice, getNumericPrice, currencySymbol } = usePlayFound();
  const cartGames = games.filter((game) => cartIds.includes(game.id));
  const total = cartGames.reduce((sum, game) => sum + getNumericPrice(game.priceType, Number(game.id.replace(/\D/g, "")) || 1), 0);

  return (
    <section className="container-shell section-pad">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow"><ShoppingCart size={15} /> Корзина</span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Покупки PlayFound</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 muted">Корзина для платных игр: проверь выбранные проекты, скидки и итоговую сумму перед оформлением заказа.</p>
        </div>
        <Link href="/catalog" className="btn btn-secondary">Продолжить выбирать</Link>
      </div>

      {cartGames.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="grid gap-4">
            {cartGames.map((game) => (
              <article className="surface grid gap-4 rounded-[1.5rem] p-4 md:grid-cols-[12rem_1fr_auto] md:items-center" key={game.id}>
                <Link href={`/games/${game.slug}`} className="block overflow-hidden rounded-2xl">
                  <GameMedia gradient={game.image} title={game.title} className="aspect-[16/10]" />
                </Link>
                <div>
                  <Link href={`/games/${game.slug}`} className="text-2xl font-black transition hover:text-[var(--accent-2)]">{game.title}</Link>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 muted">{game.shortDescription.ru}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="tag">{game.platforms.join(" · ")}</span>
                    <span className="tag">{formatPrice(game.priceType, Number(game.id.replace(/\D/g, "")) || 1)}</span>
                  </div>
                </div>
                <button type="button" className="btn btn-ghost" onClick={() => removeFromCart(game.id)}>
                  <Trash2 size={17} /> Убрать
                </button>
              </article>
            ))}
          </div>

          <aside className="surface h-fit rounded-[1.75rem] p-6 lg:sticky lg:top-28">
            <h2 className="text-2xl font-black">Итого</h2>
            <div className="mt-5 grid gap-3 border-y border-[var(--line)] py-5">
              <div className="flex justify-between gap-3"><span className="muted">Игры</span><strong>{cartGames.length}</strong></div>
              <div className="flex justify-between gap-3"><span className="muted">Скидки</span><strong className="text-[var(--accent-2)]">учтены в цене</strong></div>
              <div className="flex justify-between gap-3 text-2xl"><span className="font-black">Сумма</span><strong>{currencySymbol}{total}</strong></div>
            </div>
            <button type="button" className="btn btn-primary mt-5 w-full"><CreditCard size={18} /> Оформить заказ</button>
            <button type="button" className="btn btn-ghost mt-3 w-full" onClick={clearCart}>Очистить корзину</button>
          </aside>
        </div>
      ) : (
        <div className="glass-card rounded-[1.75rem] p-8 text-center">
          <ShoppingCart className="mx-auto text-[var(--accent-2)]" size={42} />
          <h2 className="mt-4 text-2xl font-black">Корзина пуста</h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 muted">Добавь платную игру в корзину из каталога. Бесплатные игры скачиваются сразу.</p>
          <Link href="/catalog" className="btn btn-primary mt-6">Открыть каталог</Link>
        </div>
      )}
    </section>
  );
}
