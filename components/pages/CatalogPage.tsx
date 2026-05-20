"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/GameCard";
import {
  type Genre,
  type Platform,
  type PriceType,
  type Status,
  games
} from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";

type SortMode = "newest" | "popular" | "demos" | "releases";

const genres: Genre[] = [
  "horror",
  "rpg",
  "platformer",
  "survival",
  "puzzle",
  "visualNovel",
  "strategy",
  "roguelike"
];
const platforms: Platform[] = ["PC", "Android", "Web", "Linux", "Mac"];
const statuses: Status[] = ["demo", "development", "earlyAccess", "release"];
const prices: PriceType[] = ["free", "paid"];
const sortModes: SortMode[] = ["newest", "popular", "demos", "releases"];

export function CatalogPage() {
  const { settings, t } = usePlayFound();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [status, setStatus] = useState<Status | "all">("all");
  const [price, setPrice] = useState<PriceType | "all">("all");
  const [sort, setSort] = useState<SortMode>("newest");

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return games
      .filter((game) => {
        const matchesQuery =
          !normalizedQuery ||
          game.title.toLowerCase().includes(normalizedQuery) ||
          game.shortDescription[settings.language]
            .toLowerCase()
            .includes(normalizedQuery) ||
          game.tags[settings.language].some((tag) =>
            tag.toLowerCase().includes(normalizedQuery)
          );

        return (
          matchesQuery &&
          (genre === "all" || game.genre === genre) &&
          (platform === "all" || game.platforms.includes(platform)) &&
          (status === "all" || game.status === status) &&
          (price === "all" || game.priceType === price)
        );
      })
      .sort((a, b) => {
        if (sort === "popular") {
          return b.interest - a.interest || b.rating - a.rating;
        }
        if (sort === "demos") {
          return Number(b.status === "demo") - Number(a.status === "demo");
        }
        if (sort === "releases") {
          return Number(b.status === "release") - Number(a.status === "release");
        }
        return (
          new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
        );
      });
  }, [genre, platform, price, query, settings.language, sort, status]);

  const resetFilters = () => {
    setQuery("");
    setGenre("all");
    setPlatform("all");
    setStatus("all");
    setPrice("all");
    setSort("newest");
  };

  return (
    <section className="container-shell section-pad">
      <div className="max-w-4xl">
        <span className="eyebrow">
          <SlidersHorizontal size={15} />
          {t.catalog.eyebrow}
        </span>
        <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
          {t.catalog.title}
        </h1>
        <p className="mt-5 text-lg leading-8 muted">{t.catalog.subtitle}</p>
      </div>

      <div className="glass-card mt-9 rounded-[1.5rem] p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <label className="grid gap-2">
            <span className="text-sm font-black">{t.catalog.searchLabel}</span>
            <span className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                size={18}
              />
              <input
                className="input pl-10"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.catalog.searchPlaceholder}
              />
            </span>
          </label>

          <SelectField
            label={t.catalog.genreLabel}
            value={genre}
            onChange={(value) => setGenre(value as Genre | "all")}
            options={[
              { value: "all", label: t.common.all },
              ...genres.map((item) => ({ value: item, label: t.genres[item] }))
            ]}
          />
          <SelectField
            label={t.catalog.platformLabel}
            value={platform}
            onChange={(value) => setPlatform(value as Platform | "all")}
            options={[
              { value: "all", label: t.common.all },
              ...platforms.map((item) => ({ value: item, label: item }))
            ]}
          />
          <SelectField
            label={t.catalog.statusLabel}
            value={status}
            onChange={(value) => setStatus(value as Status | "all")}
            options={[
              { value: "all", label: t.common.all },
              ...statuses.map((item) => ({ value: item, label: t.statuses[item] }))
            ]}
          />
          <SelectField
            label={t.catalog.priceLabel}
            value={price}
            onChange={(value) => setPrice(value as PriceType | "all")}
            options={[
              { value: "all", label: t.common.all },
              ...prices.map((item) => ({
                value: item,
                label: item === "free" ? t.common.free : t.common.paid
              }))
            ]}
          />
          <SelectField
            label={t.catalog.sortLabel}
            value={sort}
            onChange={(value) => setSort(value as SortMode)}
            options={sortModes.map((item) => ({
              value: item,
              label: t.sort[item]
            }))}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-black">
          {t.catalog.results}:{" "}
          <span className="text-[var(--accent-2)]">{filteredGames.length}</span>
        </p>
        <button type="button" className="btn btn-secondary" onClick={resetFilters}>
          {t.catalog.clearFilters}
        </button>
      </div>

      {filteredGames.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </div>
      ) : (
        <div className="glass-card mt-6 rounded-[1.5rem] p-8 text-center">
          <h2 className="text-2xl font-black">{t.catalog.emptyTitle}</h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 muted">
            {t.catalog.emptyText}
          </p>
          <button
            type="button"
            className="btn btn-primary mt-6"
            onClick={resetFilters}
          >
            {t.catalog.clearFilters}
          </button>
        </div>
      )}
    </section>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <select
        className="input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
