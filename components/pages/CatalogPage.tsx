"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Eye, Filter, Search, SlidersHorizontal, Tags } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { GameMedia } from "@/components/GameMedia";
import { games, type Genre, type Platform, type PriceType, type Status } from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";

type SortMode = "newest" | "popular" | "rating" | "price" | "sale" | "demos" | "releases";
type MultiplayerMode = "all" | "single" | "multi";
type FilterTag = "all" | "cozy" | "horror" | "demo" | "pixel" | "story" | "survival";

const genres: Genre[] = ["horror", "rpg", "platformer", "survival", "puzzle", "visualNovel", "strategy", "roguelike"];
const platforms: Platform[] = ["PC", "Android", "Web", "Linux", "Mac"];
const statuses: Status[] = ["demo", "development", "earlyAccess", "release"];
const prices: PriceType[] = ["free", "paid"];
const sortModes: SortMode[] = ["popular", "newest", "rating", "price", "sale", "demos", "releases"];
const tagFilters: Array<{ value: FilterTag; label: string }> = [
  { value: "all", label: "Все теги" },
  { value: "cozy", label: "уютные" },
  { value: "horror", label: "хоррор" },
  { value: "demo", label: "демо" },
  { value: "pixel", label: "пиксель" },
  { value: "story", label: "сюжет" },
  { value: "survival", label: "выживание" }
];
export function CatalogPage() {
  const { settings, t, formatPrice } = usePlayFound();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [status, setStatus] = useState<Status | "all">("all");
  const [price, setPrice] = useState<PriceType | "all">("all");
  const [sort, setSort] = useState<SortMode>("popular");
  const [tag, setTag] = useState<FilterTag>("all");
  const [multiplayer, setMultiplayer] = useState<MultiplayerMode>("all");
  const [saleOnly, setSaleOnly] = useState(false);

  const highlights = [...games].sort((a, b) => b.interest - a.interest).slice(0, 5);
  const mainHighlight = highlights[0];
  const sideHighlights = highlights.slice(1, 3);
  const promoGames = games.filter((game) => game.priceType === "paid").slice(0, 4);

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return games
      .filter((game) => {
        const localizedTags = game.tags[settings.language].join(" ").toLowerCase();
        const matchesQuery =
          !normalizedQuery ||
          game.title.toLowerCase().includes(normalizedQuery) ||
          game.shortDescription[settings.language].toLowerCase().includes(normalizedQuery) ||
          localizedTags.includes(normalizedQuery);

        const matchesTag = tag === "all" || localizedTags.includes(tag);
        const matchesSale = !saleOnly || game.priceType === "paid";
        const mockMultiplayer = Number(game.id.replace(/\D/g, "")) % 3 === 0;
        const matchesMultiplayer = multiplayer === "all" || (multiplayer === "multi" ? mockMultiplayer : !mockMultiplayer);

        return (
          matchesQuery &&
          matchesTag &&
          matchesSale &&
          matchesMultiplayer &&
          (genre === "all" || game.genre === genre) &&
          (platform === "all" || game.platforms.includes(platform)) &&
          (status === "all" || game.status === status) &&
          (price === "all" || game.priceType === price)
        );
      })
      .sort((a, b) => {
        if (sort === "popular") return b.interest - a.interest || b.rating - a.rating;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "price") return Number(a.priceType === "paid") - Number(b.priceType === "paid");
        if (sort === "sale") return Number(b.priceType === "paid") - Number(a.priceType === "paid");
        if (sort === "demos") return Number(b.status === "demo") - Number(a.status === "demo");
        if (sort === "releases") return Number(b.status === "release") - Number(a.status === "release");
        return new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime();
      });
  }, [genre, platform, price, query, saleOnly, settings.language, sort, status, tag, multiplayer]);

  const resetFilters = () => {
    setQuery("");
    setGenre("all");
    setPlatform("all");
    setStatus("all");
    setPrice("all");
    setSort("popular");
    setTag("all");
    setMultiplayer("all");
    setSaleOnly(false);
  };

  return (
    <section className="container-shell section-pad">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow"><SlidersHorizontal size={15} /> Каталог PlayFound</span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Магазинные витрины для инди-игр</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 muted">
            Большие баннеры, полки с подборками, ровные карточки, wishlist, корзина и фильтры. Вдохновлено удобством игровых магазинов, но визуальный стиль PlayFound остаётся оригинальным.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-soft)] p-4 text-sm leading-6 muted lg:max-w-sm">
          Валюта и язык игр меняются в настройках через кнопку с шестерёнкой в верхней панели.
        </div>
      </div>

      <section className="gog-shelf">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">Highlights</h2>
          <Link href={`/games/${mainHighlight.slug}`} className="btn btn-secondary">Открыть витрину <ArrowRight size={17} /></Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.4fr_0.8fr]">
          <StoreBanner game={sideHighlights[0]} label="Demo drop" compact />
          <StoreBanner game={mainHighlight} label="Featured this week" large />
          <StoreBanner game={sideHighlights[1]} label="Hot indie" compact />
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">Промо и подборки</h2>
          <span className="tag">скидки, демо, новые релизы</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {promoGames.map((game, index) => (
            <PromoTile game={game} index={index} key={game.id} />
          ))}
        </div>
      </section>

      <div className="glass-card mt-10 rounded-[1.5rem] p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-[var(--accent-2)]">
          <Filter size={16} /> Фильтры каталога
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <label className="grid gap-2">
            <span className="text-sm font-black">Поиск</span>
            <span className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
              <input className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ферма, хоррор, демо, пиксель" />
            </span>
          </label>
          <SelectField label="Жанр" value={genre} onChange={(value) => setGenre(value as Genre | "all")} options={[{ value: "all", label: "Все" }, ...genres.map((item) => ({ value: item, label: t.genres[item] }))]} />
          <SelectField label="Платформа" value={platform} onChange={(value) => setPlatform(value as Platform | "all")} options={[{ value: "all", label: "Все" }, ...platforms.map((item) => ({ value: item, label: item }))]} />
          <SelectField label="Цена" value={price} onChange={(value) => setPrice(value as PriceType | "all")} options={[{ value: "all", label: "Все" }, ...prices.map((item) => ({ value: item, label: item === "free" ? "Бесплатно" : "Платные" }))]} />
          <SelectField label="Сортировка" value={sort} onChange={(value) => setSort(value as SortMode)} options={sortModes.map((item) => ({ value: item, label: sortLabel(item) }))} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SelectField label="Статус" value={status} onChange={(value) => setStatus(value as Status | "all")} options={[{ value: "all", label: "Все" }, ...statuses.map((item) => ({ value: item, label: t.statuses[item] }))]} />
          <SelectField label="Теги" value={tag} onChange={(value) => setTag(value as FilterTag)} options={tagFilters} />
          <SelectField label="Режим" value={multiplayer} onChange={(value) => setMultiplayer(value as MultiplayerMode)} options={[{ value: "all", label: "Любой" }, { value: "single", label: "Одиночная" }, { value: "multi", label: "Мультиплеер" }]} />
          <button type="button" className={`btn ${saleOnly ? "btn-primary" : "btn-secondary"}`} onClick={() => setSaleOnly((value) => !value)}>
            <Tags size={17} /> Игры со скидкой
          </button>
        </div>
      </div>

      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-black">Найдено: <span className="text-[var(--accent-2)]">{filteredGames.length}</span></p>
        <button type="button" className="btn btn-secondary" onClick={resetFilters}>Сбросить фильтры</button>
      </div>

      {filteredGames.length > 0 ? (
        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game, index) => (
            <div className="reveal-card h-full" style={{ animationDelay: `${index * 45}ms` }} key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card mt-6 rounded-[1.5rem] p-8 text-center">
          <Eye className="mx-auto text-[var(--accent-2)]" size={32} />
          <h2 className="mt-4 text-2xl font-black">Ничего не найдено</h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 muted">Попробуй сбросить фильтры или изменить запрос.</p>
          <button type="button" className="btn btn-primary mt-6" onClick={resetFilters}>Сбросить фильтры</button>
        </div>
      )}
    </section>
  );
}

function StoreBanner({ game, label, large = false, compact = false }: { game: (typeof games)[number]; label: string; large?: boolean; compact?: boolean }) {
  const { formatPrice } = usePlayFound();
  const seed = Number(game.id.replace(/\D/g, "")) || 1;
  return (
    <Link href={`/games/${game.slug}`} className={`store-banner group relative block overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-strong)] shadow-lg ${large ? "min-h-[18rem]" : "min-h-[14rem]"}`}>
      <GameMedia gradient={game.banner} title={game.title} className={`${large ? "h-full min-h-[18rem]" : "h-full min-h-[14rem]"}`} />
      <div className="store-banner-overlay absolute inset-0 z-10 flex flex-col justify-end p-5 text-white">
        <span className="mb-3 w-fit rounded-md border border-white/20 bg-black/35 px-2 py-1 text-xs font-black uppercase backdrop-blur">{label}</span>
        <p className="text-sm font-bold text-white/75">{compact ? "Выбор игроков" : "Новая витрина"}</p>
        <h3 className={`${large ? "text-3xl sm:text-4xl" : "text-2xl"} mt-1 font-black leading-tight`}>{game.title}</h3>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[var(--accent)] px-2 py-1 text-sm font-black text-[var(--accent-contrast)]">{formatPrice(game.priceType, seed)}</span>
          <span className="rounded-md border border-white/20 bg-black/30 px-2 py-1 text-sm font-bold backdrop-blur">{game.platforms.join(" · ")}</span>
        </div>
      </div>
    </Link>
  );
}

function PromoTile({ game, index }: { game: (typeof games)[number]; index: number }) {
  return (
    <Link href={`/games/${game.slug}`} className="promo-tile interactive-card group relative min-h-[19rem] overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-strong)]">
      <GameMedia gradient={game.image} title={game.title} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between bg-black/42 p-5 text-center text-white transition group-hover:bg-black/30">
        <span className="rounded-md border border-white/20 bg-black/30 px-2 py-1 text-xs font-black uppercase backdrop-blur">Promo</span>
        <div>
          <h3 className="text-2xl font-black leading-tight">{game.title}</h3>
          <p className="mt-3 text-sm font-bold text-white/75">до</p>
          <p className="text-5xl font-black text-[var(--accent-2)]">-{40 + index * 10}%</p>
          <p className="mt-3 text-sm font-bold text-white/75">{index + 1} дн. до конца</p>
        </div>
        <span className="rounded-full border border-white/40 px-5 py-2 text-sm font-black backdrop-blur transition group-hover:bg-white group-hover:text-black">Смотреть</span>
      </div>
    </Link>
  );
}

function sortLabel(sort: SortMode) {
  const labels: Record<SortMode, string> = {
    newest: "Новизна",
    popular: "Популярность",
    rating: "Рейтинг",
    price: "Цена",
    sale: "Скидки",
    demos: "Демо",
    releases: "Релизы"
  };
  return labels[sort];
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <select className="input" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
