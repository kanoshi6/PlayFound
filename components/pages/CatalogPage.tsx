"use client";

import Link from "next/link";
import { Eye, Search, SlidersHorizontal, Sparkles, Tags } from "lucide-react";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/GameCard";
import { GameMedia } from "@/components/GameMedia";
import { type Genre, type Platform, type PriceType, type Status, games } from "@/lib/games";
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

  const spotlight = games[0];

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
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <span className="eyebrow"><SlidersHorizontal size={15} /> Каталог PlayFound</span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Игры без шума: демо, релизы, скидки и находки</h1>
          <p className="mt-5 text-lg leading-8 muted">
            Каталог стал ближе к современному игровому магазину: крупные карточки, быстрый предпросмотр, цена в выбранной валюте, языки, платформы и удобные фильтры.
          </p>
        </div>
        <Link href={`/games/${spotlight.slug}`} className="interactive-card glass-card overflow-hidden rounded-[2rem]">
          <GameMedia gradient={spotlight.banner} title={spotlight.title} label="Выбор недели" className="aspect-[16/7]" />
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag">Spotlight</span>
              <span className="tag">{formatPrice(spotlight.priceType, 1)}</span>
              <span className="tag">{spotlight.platforms.join(" · ")}</span>
            </div>
            <h2 className="mt-3 text-2xl font-black">{spotlight.title}</h2>
            <p className="mt-2 leading-7 muted">{spotlight.shortDescription.ru}</p>
          </div>
        </Link>
      </div>

      <div className="glass-card mt-9 rounded-[1.5rem] p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <label className="grid gap-2">
            <span className="text-sm font-black">Поиск</span>
            <span className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
              <input className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Terraria-like, ферма, хоррор, демо" />
            </span>
          </label>
          <SelectField label="Жанр" value={genre} onChange={(value) => setGenre(value as Genre | "all")} options={[{ value: "all", label: "Все" }, ...genres.map((item) => ({ value: item, label: t.genres[item] }))]} />
          <SelectField label="Платформа" value={platform} onChange={(value) => setPlatform(value as Platform | "all")} options={[{ value: "all", label: "Все" }, ...platforms.map((item) => ({ value: item, label: item }))]} />
          <SelectField label="Цена" value={price} onChange={(value) => setPrice(value as PriceType | "all")} options={[{ value: "all", label: "Все" }, ...prices.map((item) => ({ value: item, label: item === "free" ? "Бесплатно" : "Платные" }))]} />
          <SelectField label="Сортировка" value={sort} onChange={(value) => setSort(value as SortMode)} options={sortModes.map((item) => ({ value: item, label: sortLabel(item) }))} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <SelectField label="Статус" value={status} onChange={(value) => setStatus(value as Status | "all")} options={[{ value: "all", label: "Все" }, ...statuses.map((item) => ({ value: item, label: t.statuses[item] }))]} />
          <SelectField label="Теги" value={tag} onChange={(value) => setTag(value as FilterTag)} options={tagFilters} />
          <SelectField label="Режим" value={multiplayer} onChange={(value) => setMultiplayer(value as MultiplayerMode)} options={[{ value: "all", label: "Любой" }, { value: "single", label: "Одиночная" }, { value: "multi", label: "Мультиплеер" }]} />
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
            <p className="text-sm font-black">Язык / валюта</p>
            <p className="mt-2 text-sm font-bold text-[var(--accent-2)]">{settings.marketLanguage.toUpperCase()} · {settings.currency}</p>
          </div>
          <button type="button" className={`btn ${saleOnly ? "btn-primary" : "btn-secondary"}`} onClick={() => setSaleOnly((value) => !value)}>
            <Tags size={17} />
            Игры на распродаже
          </button>
        </div>
      </div>

      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-black">Найдено: <span className="text-[var(--accent-2)]">{filteredGames.length}</span></p>
        <button type="button" className="btn btn-secondary" onClick={resetFilters}>Сбросить фильтры</button>
      </div>

      {filteredGames.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game, index) => (
            <div className="reveal-card" style={{ animationDelay: `${index * 45}ms` }} key={game.id}>
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
