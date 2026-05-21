"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { CSSProperties, FormEvent } from "react";
import { useEffect, useState } from "react";
import { Bookmark, Flag, Heart, MessageCircle, Play, ShoppingBag, X } from "lucide-react";
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
  const { formatPrice } = usePlayFound();
  const [activeClip, setActiveClip] = useState<Clip | null>(null);
  const { session } = useAuth();
  const [interactions, setInteractions] = useState<ClipInteraction[]>([]);

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

  return (
    <section className="container-shell section-pad">
      <div className="mb-8 max-w-4xl">
        <span className="eyebrow"><Play size={15} /> PlayFound Shorts</span>
        <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Короткие ролики игр</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Нажми на карточку — ролик откроется сразу в вертикальном просмотрщике. Лайки, сохранения и комментарии сохраняются в профиле игрока.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {baseClips.map((clip, index) => {
          const interaction = getInteractionForClip(clip);
          return (
            <button
              type="button"
              className="group interactive-card surface overflow-hidden rounded-[1.75rem] text-left transition hover:-translate-y-1 hover:border-[var(--line-strong)]"
              key={clip.id}
              onClick={() => setActiveClip(clip)}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="media-frame relative aspect-[9/16]" style={{ "--media-gradient": clip.game.banner } as CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={clip.game.banner} alt={clip.game.title} className="absolute inset-0 h-full w-full object-cover" />
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
                  <span className="inline-flex items-center gap-1"><Heart size={16} /> {clip.baseLikes + (interaction?.liked ? 1 : 0)}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle size={16} /> {clip.baseComments + (interaction?.comments.length ?? 0)}</span>
                  <span className="inline-flex items-center gap-1"><Bookmark size={16} /> {clip.baseSaved + (interaction?.saved ? 1 : 0)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeClip ? <ClipViewer clip={activeClip} interaction={getInteractionForClip(activeClip)} onActivity={refreshInteractions} onClose={() => setActiveClip(null)} /> : null}
    </section>
  );
}

function ClipViewer({ clip, interaction, onActivity, onClose }: { clip: Clip; interaction: ClipInteraction | null; onActivity: () => void; onClose: () => void }) {
  const { formatPrice } = usePlayFound();
  const { session } = useAuth();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const liked = Boolean(interaction?.liked);
  const saved = Boolean(interaction?.saved);

  const requireLogin = () => {
    setError("Нужно войти в аккаунт, чтобы ставить лайки, сохранять ролики и писать комментарии.");
    return false;
  };

  const onLike = () => {
    if (!session && !requireLogin()) return;
    if (session) {
      toggleClipLike(session.userId, clip.id, clip.game, clip.title);
      setError("");
      onActivity();
    }
  };

  const onSave = () => {
    if (!session && !requireLogin()) return;
    if (session) {
      toggleClipSave(session.userId, clip.id, clip.game, clip.title);
      setError("");
      onActivity();
    }
  };

  const onComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session && !requireLogin()) return;
    if (hasBadWords(comment)) {
      setError("Комментарий не прошёл mock-модерацию: убери мат или оскорбления.");
      return;
    }
    if (session) {
      addClipComment(session.userId, clip.id, clip.game, clip.title, comment, session.displayName);
      setComment("");
      setError("");
      onActivity();
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/84 p-3 backdrop-blur-xl">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Закрыть" onClick={onClose} />
      <div className="clip-viewer relative grid w-full max-w-6xl gap-4 md:grid-cols-[minmax(18rem,27rem)_1fr]">
        <div className="surface relative overflow-hidden rounded-[2rem]">
          <div className="media-frame aspect-[9/16]" style={{ "--media-gradient": clip.game.banner } as CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={clip.game.banner} alt={clip.game.title} className="absolute inset-0 h-full w-full object-cover" />
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

        <aside className="surface relative max-h-[88vh] overflow-y-auto rounded-[2rem] p-6">
          <span className="tag">Ролик открыт</span>
          <h2 className="mt-4 text-3xl font-black">{clip.game.title}</h2>
          <p className="mt-3 leading-7 muted">{clip.game.description.ru}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Action active={liked} icon={<Heart size={18} fill={liked ? "currentColor" : "none"} />} label="Лайк" value={String(clip.baseLikes + (liked ? 1 : 0))} onClick={onLike} />
            <Action icon={<MessageCircle size={18} />} label="Комментарии" value={String(clip.baseComments + (interaction?.comments.length ?? 0))} />
            <Action active={saved} icon={<Bookmark size={18} fill={saved ? "currentColor" : "none"} />} label="Сохранить" value={String(clip.baseSaved + (saved ? 1 : 0))} onClick={onSave} />
          </div>
          {error ? <p className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--danger)_45%,transparent)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] p-3 text-sm font-bold text-[var(--danger)]">{error}</p> : null}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href={`/games/${clip.game.slug}`} className="btn btn-secondary">Перейти к игре</Link>
            <Link href={`/games/${clip.game.slug}`} className="btn btn-primary"><ShoppingBag size={18} /> {clip.game.priceType === "free" ? "Скачать" : `Купить ${formatPrice(clip.game.priceType, 2)}`}</Link>
          </div>
          <button type="button" className="btn btn-ghost mt-3"><Flag size={17} /> Пожаловаться</button>

          <form className="mt-6 grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" onSubmit={onComment}>
            <label className="grid gap-2">
              <span className="font-black">Оставить комментарий</span>
              <textarea className="input min-h-24 resize-y" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Напиши мнение о ролике или игре" maxLength={280} />
            </label>
            <button type="submit" className="btn btn-primary justify-self-start"><MessageCircle size={17} /> Отправить</button>
          </form>

          <div className="mt-5 grid gap-3">
            <h3 className="text-xl font-black">Комментарии</h3>
            {interaction?.comments.length ? (
              interaction.comments.map((item) => (
                <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={item.id}>
                  <p className="font-black">{item.userName ?? "Игрок"}</p>
                  <p className="mt-2 text-sm leading-6 muted">{item.text}</p>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 text-sm leading-6 muted">Комментариев пока нет. Будь первым.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
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
