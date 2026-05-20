"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import { Bookmark, Flag, Heart, MessageCircle, Play, ShoppingBag, X } from "lucide-react";
import { games } from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";

const clips = games.slice(0, 8).map((game, index) => ({
  id: `clip-${game.id}`,
  game,
  title: ["15 секунд геймплея", "Новый тизер демо", "Devlog-клип", "Анонс обновления"][index % 4],
  likes: 120 + index * 47,
  comments: 8 + index * 5,
  saved: 20 + index * 11
}));

type Clip = (typeof clips)[number];

export function ClipsPage() {
  const { formatPrice } = usePlayFound();
  const [activeClip, setActiveClip] = useState<Clip | null>(null);

  return (
    <section className="container-shell section-pad">
      <div className="mb-8 max-w-4xl">
        <span className="eyebrow"><Play size={15} /> PlayFound Shorts</span>
        <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Ролики открываются сразу</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Нажми на карточку — откроется вертикальный viewer как в VK/Shorts: лайки, комментарии, сохранение, жалоба и переход к игре. Видео пока mock, но UX уже похож на реальный.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {clips.map((clip, index) => (
          <button
            type="button"
            className="group interactive-card surface overflow-hidden rounded-[1.75rem] text-left transition hover:-translate-y-1 hover:border-[var(--line-strong)]"
            key={clip.id}
            onClick={() => setActiveClip(clip)}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="media-frame relative aspect-[9/16]" style={{ "--media-gradient": clip.game.banner } as CSSProperties}>
              <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between">
                <span className="tag bg-black/40 text-white backdrop-blur">clip</span>
                <span className="tag bg-black/40 text-white backdrop-blur">{formatPrice(clip.game.priceType, index + 1)}</span>
              </div>
              <div className="absolute inset-0 z-10 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur transition group-hover:scale-110">
                  <Play size={26} fill="currentColor" />
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-4 z-10 text-white">
                <p className="text-sm font-black uppercase text-white/75">{clip.title}</p>
                <h2 className="mt-2 text-2xl font-black">{clip.game.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-white/75">{clip.game.shortDescription.ru}</p>
              </div>
            </div>
            <div className="grid gap-3 p-4">
              <div className="flex justify-between gap-2 text-sm font-bold muted">
                <span className="inline-flex items-center gap-1"><Heart size={16} /> {clip.likes}</span>
                <span className="inline-flex items-center gap-1"><MessageCircle size={16} /> {clip.comments}</span>
                <span className="inline-flex items-center gap-1"><Bookmark size={16} /> {clip.saved}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeClip ? <ClipViewer clip={activeClip} onClose={() => setActiveClip(null)} /> : null}
    </section>
  );
}

function ClipViewer({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  const { formatPrice } = usePlayFound();

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-3 backdrop-blur-xl">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Закрыть" onClick={onClose} />
      <div className="relative grid w-full max-w-5xl gap-4 md:grid-cols-[minmax(18rem,25rem)_1fr]">
        <div className="surface relative overflow-hidden rounded-[2rem]">
          <div className="media-frame aspect-[9/16]" style={{ "--media-gradient": clip.game.banner } as CSSProperties}>
            <button type="button" className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur" onClick={onClose}>
              <X size={21} />
            </button>
            <div className="absolute inset-0 z-10 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur pulse-glow">
                <Play size={32} fill="currentColor" />
              </span>
            </div>
            <div className="absolute inset-x-5 bottom-5 z-10 text-white">
              <p className="font-black uppercase text-white/75">{clip.title}</p>
              <h2 className="mt-2 text-3xl font-black">{clip.game.title}</h2>
            </div>
          </div>
        </div>

        <aside className="surface relative rounded-[2rem] p-6">
          <span className="tag">Открытый просмотр</span>
          <h2 className="mt-4 text-3xl font-black">{clip.game.title}</h2>
          <p className="mt-3 leading-7 muted">{clip.game.description.ru}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Action icon={<Heart size={18} />} label="Лайк" value={String(clip.likes)} />
            <Action icon={<MessageCircle size={18} />} label="Комментарии" value={String(clip.comments)} />
            <Action icon={<Bookmark size={18} />} label="Сохранить" value={String(clip.saved)} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href={`/games/${clip.game.slug}`} className="btn btn-secondary">Перейти к игре</Link>
            <Link href={`/games/${clip.game.slug}`} className="btn btn-primary"><ShoppingBag size={18} /> {clip.game.priceType === "free" ? "Скачать" : `Купить ${formatPrice(clip.game.priceType, 2)}`}</Link>
          </div>
          <button type="button" className="btn btn-ghost mt-3"><Flag size={17} /> Пожаловаться</button>
          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
            <p className="font-black">Как будет в полной версии</p>
            <p className="mt-2 text-sm leading-6 muted">Свайп вверх/вниз на телефоне, рекомендации по интересам, загрузка роликов разработчиками и ручная модерация перед публикацией.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Action({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <button type="button" className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 text-left transition hover:border-[var(--line-strong)]">
      <span className="text-[var(--accent-2)]">{icon}</span>
      <span className="mt-2 block text-xl font-black">{value}</span>
      <span className="text-sm muted">{label}</span>
    </button>
  );
}
