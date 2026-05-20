"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Heart, MessageCircle, Play, Bookmark, Flag } from "lucide-react";
import { games } from "@/lib/games";

const clips = games.slice(0, 8).map((game, index) => ({
  id: `clip-${game.id}`,
  game,
  title: [
    "15 секунд геймплея",
    "Новый тизер демо",
    "Devlog-клип",
    "Анонс обновления"
  ][index % 4],
  likes: 120 + index * 47,
  comments: 8 + index * 5,
  saved: 20 + index * 11
}));

export function ClipsPage() {
  return (
    <section className="container-shell section-pad">
      <div className="mb-8 max-w-4xl">
        <span className="eyebrow">
          <Play size={15} />
          PlayFound Shorts
        </span>
        <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
          Короткие ролики игр
        </h1>
        <p className="mt-5 text-lg leading-8 muted">
          Вертикальная лента для трейлеров, геймплейных моментов, тизеров, devlog-клипов и анонсов. На мобильной версии это должно работать свайпами вверх/вниз.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clips.map((clip) => (
            <article
              className="group surface overflow-hidden rounded-[1.75rem] transition hover:-translate-y-1 hover:border-[var(--line-strong)]"
              key={clip.id}
            >
              <div
                className="media-frame relative aspect-[9/16]"
                style={{ "--media-gradient": clip.game.banner } as CSSProperties}
              >
                <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between">
                  <span className="tag bg-black/40 backdrop-blur">на модерации mock</span>
                  <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-black/35 backdrop-blur">
                    <Flag size={17} />
                  </button>
                </div>
                <div className="absolute inset-0 z-10 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-black/35 backdrop-blur transition group-hover:scale-110">
                    <Play size={26} fill="currentColor" />
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 z-10">
                  <p className="text-sm font-black uppercase text-white/75">{clip.title}</p>
                  <h2 className="mt-2 text-2xl font-black text-white">{clip.game.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-white/75">
                    {clip.game.shortDescription.ru}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-4">
                <div className="flex justify-between gap-2 text-sm font-bold muted">
                  <span className="inline-flex items-center gap-1"><Heart size={16} /> {clip.likes}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle size={16} /> {clip.comments}</span>
                  <span className="inline-flex items-center gap-1"><Bookmark size={16} /> {clip.saved}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/games/${clip.game.slug}`} className="btn btn-secondary">
                    К игре
                  </Link>
                  <button type="button" className="btn btn-primary">
                    Скачать/Купить
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="glass-card h-fit rounded-[1.75rem] p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl font-black">Как это будет работать</h2>
          <div className="mt-5 grid gap-4">
            {[
              "Разработчик загружает вертикальный ролик в кабинете.",
              "Ролик попадает на модерацию: контент, мат, обман, чужие логотипы.",
              "После одобрения он попадает в рекомендации по интересам игроков.",
              "Игрок может лайкнуть, сохранить, пожаловаться, открыть страницу игры или купить."
            ].map((item) => (
              <p className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 leading-7 muted" key={item}>
                {item}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
