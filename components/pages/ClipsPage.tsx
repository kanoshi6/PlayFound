"use client";

import type { ReactNode, FormEvent } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bookmark, ChevronDown, ChevronUp, Flag, Heart, MessageCircle, Play, ShoppingBag } from "lucide-react";
import { games } from "@/lib/games";
import { useAuth } from "@/lib/auth-context";
import {
  addClipComment,
  getClipInteraction,
  getClipInteractions,
  toggleClipLike,
  toggleClipSave,
  type ClipInteraction
} from "@/lib/clip-interactions";
import { usePlayFound } from "@/lib/settings-context";

const baseClips = games.slice(0, 8).map((game, index) => ({
  id: `clip-${game.id}`,
  game,
  title: ["15 секунд геймплея", "Новый тизер демо", "Devlog-клип", "Анонс обновления"][index % 4],
  baseLikes: 120 + index * 47,
  baseComments: 8 + index * 5,
  baseSaved: 20 + index * 11
}));

type Clip = (typeof baseClips)[number];

const blockedWords = ["хуй", "пизд", "еба", "блять", "сука", "nigger", "faggot"];

function hasBadWords(value: string) {
  const normalized = value.toLowerCase().replace(/[\s._-]+/g, "");
  return blockedWords.some((word) => normalized.includes(word));
}

export function ClipsPage() {
  const { session } = useAuth();
  const { formatPrice, addToCart } = usePlayFound();
  const [interactions, setInteractions] = useState<ClipInteraction[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const refreshInteractions = () => {
    setInteractions(session ? getClipInteractions(session.userId) : []);
  };

  useEffect(() => {
    refreshInteractions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.userId]);

  const getInteractionForClip = (clip: Clip) =>
    session
      ? interactions.find((interaction) => interaction.clipId === clip.id) ??
        getClipInteraction(session.userId, clip.id)
      : null;

  const scrollTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(baseClips.length - 1, index));
    setActiveIndex(nextIndex);
    itemRefs.current[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const setClipError = (clipId: string, text: string) => {
    setErrors((current) => ({ ...current, [clipId]: text }));
  };

  const clearClipError = (clipId: string) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[clipId];
      return next;
    });
  };

  const requireLogin = (clipId: string) => {
    setClipError(clipId, "Нужно войти в аккаунт, чтобы ставить лайки, сохранять ролики и писать комментарии.");
    return false;
  };

  const onLike = (clip: Clip) => {
    if (!session && !requireLogin(clip.id)) return;
    if (session) {
      toggleClipLike(session.userId, clip.id, clip.game, clip.title);
      clearClipError(clip.id);
      refreshInteractions();
    }
  };

  const onSave = (clip: Clip) => {
    if (!session && !requireLogin(clip.id)) return;
    if (session) {
      toggleClipSave(session.userId, clip.id, clip.game, clip.title);
      clearClipError(clip.id);
      refreshInteractions();
    }
  };

  const onComment = (event: FormEvent<HTMLFormElement>, clip: Clip) => {
    event.preventDefault();
    if (!session && !requireLogin(clip.id)) return;
    const text = comments[clip.id] ?? "";
    if (hasBadWords(text)) {
      setClipError(clip.id, "Комментарий не прошёл модерацию: убери мат или оскорбления.");
      return;
    }
    if (session) {
      const result = addClipComment(session.userId, clip.id, clip.game, clip.title, text, session.displayName);
      if (!result) {
        setClipError(clip.id, "Комментарий пустой.");
        return;
      }
      setComments((current) => ({ ...current, [clip.id]: "" }));
      clearClipError(clip.id);
      refreshInteractions();
    }
  };

  const activeClip = baseClips[activeIndex];
  const activeGame = activeClip.game;

  return (
    <section className="container-shell section-pad">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-4xl">
          <span className="eyebrow"><Play size={15} /> PlayFound Shorts</span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Ролики игр</h1>
          <p className="mt-5 text-lg leading-8 muted">
            Лента работает как reels: листай вверх/вниз или кнопками справа. Лайки, сохранения и комментарии потом отображаются в профиле.
          </p>
        </div>
        <div className="surface rounded-[1.4rem] p-4 text-sm leading-6 muted lg:max-w-sm">
          Сейчас открыт: <strong className="text-[var(--accent-2)]">{activeGame.title}</strong>. Всего роликов: {baseClips.length}.
        </div>
      </div>

      <div className="relative">
        <div className="clip-snap-feed">
          {baseClips.map((clip, index) => {
            const interaction = getInteractionForClip(clip);
            const liked = Boolean(interaction?.liked);
            const saved = Boolean(interaction?.saved);
            const error = errors[clip.id];
            const commentValue = comments[clip.id] ?? "";

            return (
              <article
                className="clip-snap-card reveal-card"
                ref={(node) => { itemRefs.current[index] = node; }}
                key={clip.id}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="clip-video surface overflow-hidden rounded-[2rem]">
                  <div className="media-frame aspect-[9/16] min-h-[34rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={clip.game.banner} alt={clip.game.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/18 via-black/0 to-black/72" />
                    <div className="absolute inset-x-5 top-5 z-20 flex items-center justify-between">
                      <span className="tag bg-black/45 text-white backdrop-blur">clip</span>
                      {clip.game.priceType === "paid" ? <span className="tag bg-black/45 text-white backdrop-blur">{formatPrice(clip.game.priceType, index + 1)}</span> : null}
                    </div>
                    <div className="absolute inset-0 z-20 grid place-items-center">
                      <span className="grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-black/36 text-white backdrop-blur pulse-glow">
                        <Play size={32} fill="currentColor" />
                      </span>
                    </div>
                    <div className="absolute inset-x-5 bottom-5 z-20 text-white">
                      <p className="font-black uppercase text-white/72">{clip.title}</p>
                      <h2 className="mt-2 text-3xl font-black">{clip.game.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/78">{clip.game.shortDescription.ru}</p>
                    </div>
                  </div>
                </div>

                <aside className="clip-side surface rounded-[2rem] p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="tag">{clip.game.platforms.join(" · ")}</span>
                    <span className="tag">{clip.game.status === "release" ? "релиз" : "демо/ранний доступ"}</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-black">{clip.game.title}</h2>
                  <p className="mt-3 line-clamp-4 leading-7 muted">{clip.game.description.ru}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <Action active={liked} icon={<Heart size={18} fill={liked ? "currentColor" : "none"} />} label="Лайк" value={String(clip.baseLikes + (liked ? 1 : 0))} onClick={() => onLike(clip)} />
                    <Action icon={<MessageCircle size={18} />} label="Комменты" value={String(clip.baseComments + (interaction?.comments.length ?? 0))} />
                    <Action active={saved} icon={<Bookmark size={18} fill={saved ? "currentColor" : "none"} />} label="Сохранить" value={String(clip.baseSaved + (saved ? 1 : 0))} onClick={() => onSave(clip)} />
                  </div>

                  {error ? <p className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--danger)_45%,transparent)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] p-3 text-sm font-bold text-[var(--danger)]">{error}</p> : null}

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Link href={`/games/${clip.game.slug}`} className="btn btn-secondary">Перейти к игре</Link>
                    {clip.game.priceType === "free" ? (
                      <Link href={`/games/${clip.game.slug}`} className="btn btn-primary"><ShoppingBag size={18} /> Скачать</Link>
                    ) : (
                      <button type="button" className="btn btn-primary" onClick={() => addToCart(clip.game.id)}><ShoppingBag size={18} /> В корзину</button>
                    )}
                  </div>
                  <button type="button" className="btn btn-ghost mt-3"><Flag size={17} /> Пожаловаться</button>

                  <form className="mt-5 grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" onSubmit={(event) => onComment(event, clip)}>
                    <label className="grid gap-2">
                      <span className="font-black">Комментарий</span>
                      <textarea className="input min-h-24 resize-y" value={commentValue} onChange={(event) => setComments((current) => ({ ...current, [clip.id]: event.target.value }))} placeholder="Напиши мнение о ролике" maxLength={280} />
                    </label>
                    <button type="submit" className="btn btn-primary justify-self-start"><MessageCircle size={17} /> Отправить</button>
                  </form>

                  <div className="mt-5 grid gap-3">
                    <h3 className="text-xl font-black">Комментарии</h3>
                    {interaction?.comments.length ? (
                      interaction.comments.slice(0, 3).map((item) => (
                        <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={item.id}>
                          <p className="font-black">{item.userName ?? "Игрок"}</p>
                          <p className="mt-2 text-sm leading-6 muted">{item.text}</p>
                        </article>
                      ))
                    ) : (
                      <p className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 text-sm leading-6 muted">Комментариев пока нет.</p>
                    )}
                  </div>
                </aside>
              </article>
            );
          })}
        </div>

        <div className="clip-nav-controls">
          <button type="button" className="btn btn-secondary h-12 w-12 px-0" onClick={() => scrollTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Предыдущий ролик">
            <ChevronUp size={22} />
          </button>
          <span className="rounded-full border border-[var(--line)] bg-[var(--panel-strong)] px-3 py-2 text-xs font-black">{activeIndex + 1}/{baseClips.length}</span>
          <button type="button" className="btn btn-secondary h-12 w-12 px-0" onClick={() => scrollTo(activeIndex + 1)} disabled={activeIndex === baseClips.length - 1} aria-label="Следующий ролик">
            <ChevronDown size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Action({ icon, label, value, active, onClick }: { icon: ReactNode; label: string; value: string; active?: boolean; onClick?: () => void }) {
  return (
    <button type="button" className={`rounded-2xl border p-4 text-left transition hover:border-[var(--line-strong)] ${active ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]" : "border-[var(--line)] bg-[var(--panel-soft)]"}`} onClick={onClick}>
      <span className="text-[var(--accent-2)]">{icon}</span>
      <span className="mt-2 block text-xl font-black">{value}</span>
      <span className="text-sm muted">{label}</span>
    </button>
  );
}
