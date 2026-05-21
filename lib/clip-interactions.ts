import type { Game } from "@/lib/games";

export type ClipComment = {
  id: string;
  text: string;
  createdAt: string;
  userName?: string;
};

export type ClipInteraction = {
  userId: string;
  clipId: string;
  gameId: string;
  gameTitle: string;
  title: string;
  liked: boolean;
  saved: boolean;
  comments: ClipComment[];
  updatedAt: string;
};

const clipInteractionsKey = "playfound-clip-interactions-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function readAll(): ClipInteraction[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(clipInteractionsKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed as ClipInteraction[] : [];
  } catch {
    return [];
  }
}

function writeAll(value: ClipInteraction[]) {
  if (isBrowser()) {
    window.localStorage.setItem(clipInteractionsKey, JSON.stringify(value));
  }
}

function emptyInteraction(userId: string, clipId: string, game: Game, title: string): ClipInteraction {
  return {
    userId,
    clipId,
    gameId: game.id,
    gameTitle: game.title,
    title,
    liked: false,
    saved: false,
    comments: [],
    updatedAt: new Date().toISOString()
  };
}

export function getClipInteractions(userId: string) {
  return readAll()
    .filter((item) => item.userId === userId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getClipInteraction(userId: string, clipId: string) {
  return readAll().find((item) => item.userId === userId && item.clipId === clipId) ?? null;
}

export function toggleClipLike(userId: string, clipId: string, game: Game, title: string) {
  const all = readAll();
  const existing = all.find((item) => item.userId === userId && item.clipId === clipId) ?? emptyInteraction(userId, clipId, game, title);
  const nextItem = { ...existing, liked: !existing.liked, updatedAt: new Date().toISOString() };
  const next = [nextItem, ...all.filter((item) => !(item.userId === userId && item.clipId === clipId))];
  writeAll(next);
  return nextItem;
}

export function toggleClipSave(userId: string, clipId: string, game: Game, title: string) {
  const all = readAll();
  const existing = all.find((item) => item.userId === userId && item.clipId === clipId) ?? emptyInteraction(userId, clipId, game, title);
  const nextItem = { ...existing, saved: !existing.saved, updatedAt: new Date().toISOString() };
  const next = [nextItem, ...all.filter((item) => !(item.userId === userId && item.clipId === clipId))];
  writeAll(next);
  return nextItem;
}

export function addClipComment(userId: string, clipId: string, game: Game, title: string, text: string, userName?: string) {
  const clean = text.trim();

  if (!clean) {
    return null;
  }

  const all = readAll();
  const existing = all.find((item) => item.userId === userId && item.clipId === clipId) ?? emptyInteraction(userId, clipId, game, title);
  const nextItem: ClipInteraction = {
    ...existing,
    comments: [
      { id: `comment-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, text: clean, createdAt: new Date().toISOString(), userName },
      ...existing.comments
    ],
    updatedAt: new Date().toISOString()
  };
  const next = [nextItem, ...all.filter((item) => !(item.userId === userId && item.clipId === clipId))];
  writeAll(next);
  return nextItem;
}
