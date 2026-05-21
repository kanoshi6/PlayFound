"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  Check,
  Clapperboard,
  Copy,
  Gamepad2,
  Heart,
  ImagePlus,
  Palette,
  MessageCircle,
  Send,
  User,
  UserPlus,
  X
} from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { getClipInteractions, type ClipInteraction } from "@/lib/clip-interactions";
import {
  getUsers,
  useAuth,
  type AuthError,
  type UserAccount
} from "@/lib/auth-context";
import { games } from "@/lib/games";
import { usePlayFound } from "@/lib/settings-context";

const colorOptions = ["#9af2bf", "#38d574", "#5bd9d0", "#f0bc5e", "#ff8ab0", "#b49cff", "#ffffff"];

export function ProfilePage() {
  const {
    loaded,
    session,
    currentUser,
    updateProfile,
    sendFriendRequestByPlayerId,
    acceptFriendRequest,
    declineFriendRequest,
    refreshAuthData
  } = useAuth();
  const { wishlistIds } = usePlayFound();
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [copied, setCopied] = useState(false);
  const [avatarValue, setAvatarValue] = useState("");
  const [clipInteractions, setClipInteractions] = useState<ClipInteraction[]>([]);

  const refreshUsers = () => {
    setUsers(getUsers());
    refreshAuthData();
  };

  useEffect(() => {
    refreshUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (currentUser?.id) {
      setClipInteractions(getClipInteractions(currentUser.id));
    } else {
      setClipInteractions([]);
    }
  }, [currentUser?.id]);

  const user = useMemo(() => {
    if (!currentUser) {
      return null;
    }

    return users.find((item) => item.id === currentUser.id) ?? currentUser;
  }, [currentUser, users]);

  useEffect(() => {
    if (user?.avatarUrl) {
      setAvatarValue(user.avatarUrl);
    }
  }, [user?.avatarUrl]);

  const libraryGames = useMemo(() => {
    const ids = new Set([...(user?.libraryGameIds ?? []), ...wishlistIds]);
    return games.filter((game) => ids.has(game.id)).slice(0, 6);
  }, [user?.libraryGameIds, wishlistIds]);

  const friendUsers = useMemo(
    () => users.filter((candidate) => user?.friends.includes(candidate.id)),
    [user?.friends, users]
  );

  const incomingRequests = useMemo(
    () =>
      (user?.incomingFriendRequests ?? []).map((request) => ({
        request,
        from: users.find((candidate) => candidate.id === request.fromUserId) ?? null
      })),
    [user?.incomingFriendRequests, users]
  );

  if (!loaded) {
    return <AccessCard title="PlayFound" text="Загружаем профиль..." />;
  }

  if (!session || !user) {
    return (
      <AccessCard
        title="Нужен вход"
        text="Профиль, друзья, библиотека и заявки доступны только после входа."
        actionHref="/login"
        action="Войти"
      />
    );
  }

  const onAvatarFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("invalidAvatar");
      setStatus(null);
      return;
    }

    if (file.size > 900_000) {
      setError("invalidAvatar");
      setStatus(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarValue(reader.result);
        setError(null);
        setStatus("Аватар выбран. Нажми “Сохранить профиль”, чтобы применить его.");
      }
    };
    reader.readAsDataURL(file);
  };

  const onProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = updateProfile({
      displayName: String(formData.get("displayName") ?? ""),
      about: String(formData.get("about") ?? ""),
      avatarUrl: avatarValue,
      nicknameColor: String(formData.get("nicknameColor") ?? "#9af2bf")
    });

    if (!result.ok) {
      setStatus(null);
      setError(result.error);
      return;
    }

    setError(null);
    setStatus("Профиль обновлён. Ник, описание и аватар прошли mock-модерацию.");
    refreshUsers();
  };

  const onFriendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = sendFriendRequestByPlayerId(String(formData.get("playerId") ?? ""));

    if (!result.ok) {
      setStatus(null);
      setError(result.error);
      return;
    }

    setError(null);
    setStatus("Заявка в друзья отправлена.");
    form.reset();
    refreshUsers();
  };

  const copyPlayerId = async () => {
    try {
      await navigator.clipboard.writeText(user.playerId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const accept = (requestId: string) => {
    const result = acceptFriendRequest(requestId);

    if (!result.ok) {
      setError(result.error);
      setStatus(null);
      return;
    }

    setError(null);
    setStatus("Заявка принята. Игрок добавлен в друзья.");
    refreshUsers();
  };

  const decline = (requestId: string) => {
    const result = declineFriendRequest(requestId);

    if (!result.ok) {
      setError(result.error);
      setStatus(null);
      return;
    }

    setError(null);
    setStatus("Заявка отклонена.");
    refreshUsers();
  };

  return (
    <section className="container-shell section-pad">
      <div className="grid gap-8 lg:grid-cols-[21rem_1fr] lg:items-start">
        <aside className="surface sticky top-28 rounded-[1.75rem] p-5">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] shadow-glow">
            {avatarValue ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarValue} alt={user.displayName} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <User size={54} color="var(--accent-2)" />
              </div>
            )}
          </div>

          <h1 className="mt-5 break-words text-center text-3xl font-black" style={{ color: user.nicknameColor }}>
            {user.displayName}
          </h1>
          <p className="mt-2 text-center text-sm font-bold muted">@{user.username}</p>

          <button type="button" className="btn btn-secondary mt-5 w-full" onClick={copyPlayerId}>
            <Copy size={17} />
            {copied ? "ID скопирован" : user.playerId}
          </button>

          <div className="mt-5 grid gap-3 border-t border-[var(--line)] pt-5">
            <Stat label="Друзья" value={String(user.friends.length)} />
            <Stat label="Библиотека" value={String(libraryGames.length)} />
            <Stat label="Заявки" value={String(user.incomingFriendRequests.length)} />
          </div>

          <form className="mt-5 grid gap-3" onSubmit={onFriendSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-black">Добавить друга по ID</span>
              <input className="input" name="playerId" placeholder="PF-12345678" autoComplete="off" />
            </label>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={17} />
              Отправить заявку
            </button>
          </form>

          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <h2 className="text-lg font-black">Заявки в друзья</h2>
            <div className="mt-3 grid gap-3">
              {incomingRequests.length > 0 ? (
                incomingRequests.map(({ request, from }) => (
                  <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={request.id}>
                    <p className="font-black">{from?.displayName ?? "Игрок"}</p>
                    <p className="mt-1 text-sm muted">{from?.playerId ?? "ID не найден"}</p>
                    <div className="mt-3 flex gap-2">
                      <button type="button" className="btn btn-primary h-10 px-3" onClick={() => accept(request.id)}>
                        <Check size={16} />
                      </button>
                      <button type="button" className="btn btn-ghost h-10 px-3" onClick={() => decline(request.id)}>
                        <X size={16} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-sm leading-6 muted">Новых заявок нет.</p>
              )}
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          <section className="glass-card rounded-[1.75rem] p-6 reveal-card">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <span className="eyebrow">
                  <Palette size={15} />
                  Профиль игрока
                </span>
                <h2 className="mt-4 text-3xl font-black">Внешний вид, библиотека и друзья</h2>
                <p className="mt-3 max-w-3xl leading-7 muted">
                  Аватар загружается как файл с компьютера, ник и описание проходят простую mock-модерацию, а цвет ника выбирается без лишних цифр в интерфейсе.
                </p>
              </div>
              <Link href="/catalog" className="btn btn-secondary">
                <Gamepad2 size={17} />
                Каталог
              </Link>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={onProfileSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-black">Ник</span>
                  <input className="input" name="displayName" defaultValue={user.displayName} />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-black">Аватарка с компьютера</span>
                  <span className="relative">
                    <input className="input file:mr-4 file:rounded-full file:border-0 file:bg-[var(--accent)] file:px-3 file:py-1.5 file:font-black file:text-[var(--accent-contrast)]" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={onAvatarFile} />
                    <ImagePlus className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                  </span>
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-black">О себе</span>
                <textarea className="input min-h-28 resize-y" name="about" defaultValue={user.about} placeholder="Любимые жанры, активность, что ищешь на PlayFound" />
              </label>
              <div className="grid gap-3">
                <span className="text-sm font-black">Цвет ника</span>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <label className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border transition hover:scale-105 ${user.nicknameColor === color ? "border-[var(--accent)] bg-[var(--panel-soft)]" : "border-[var(--line)] bg-[var(--panel-soft)]"}`} key={color} title={color}>
                      <input type="radio" name="nicknameColor" value={color} defaultChecked={user.nicknameColor === color} className="sr-only" />
                      <span className="h-5 w-5 rounded-full border border-white/20" style={{ background: color }} />
                    </label>
                  ))}
                </div>
              </div>

              {error ? <StatusBox type="error" text={profileErrorText(error)} /> : null}
              {status ? <StatusBox type="success" text={status} /> : null}

              <button type="submit" className="btn btn-primary justify-self-start">Сохранить профиль</button>
            </form>
          </section>

          <section className="surface rounded-[1.75rem] p-6 reveal-card">
            <h2 className="text-2xl font-black">Друзья</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {friendUsers.length > 0 ? (
                friendUsers.map((friend) => (
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={friend.id}>
                    <div>
                      <p className="font-black" style={{ color: friend.nicknameColor }}>{friend.displayName}</p>
                      <p className="text-sm muted">{friend.playerId}</p>
                    </div>
                    <span className="tag">online mock</span>
                  </div>
                ))
              ) : (
                <p className="leading-7 muted">Список друзей пуст. Добавление работает по индивидуальному ID игрока.</p>
              )}
            </div>
          </section>

          <section className="glass-card rounded-[1.75rem] p-6 reveal-card">
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <span className="eyebrow">
                  <Heart size={15} />
                  Библиотека
                </span>
                <h2 className="mt-4 text-3xl font-black">Игры и избранное</h2>
              </div>
              <Link href="/catalog" className="btn btn-secondary">Открыть каталог</Link>
            </div>
            {libraryGames.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {libraryGames.map((game) => <GameCard game={game} key={game.id} />)}
              </div>
            ) : (
              <p className="leading-7 muted">Библиотека пока пустая. Добавляй игры в wishlist — они появятся здесь.</p>
            )}
          </section>

          <section className="surface rounded-[1.75rem] p-6 reveal-card">
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <span className="eyebrow">
                  <Clapperboard size={15} />
                  Ролики
                </span>
                <h2 className="mt-4 text-3xl font-black">Лайки и комментарии к роликам</h2>
                <p className="mt-3 leading-7 muted">Всё, что ты лайкнул, сохранил или прокомментировал в Shorts, отображается здесь.</p>
              </div>
              <Link href="/clips" className="btn btn-secondary">Открыть ролики</Link>
            </div>

            {clipInteractions.length > 0 ? (
              <div className="grid gap-3">
                {clipInteractions.map((item) => (
                  <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={`${item.clipId}-${item.updatedAt}`}>
                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                      <div>
                        <p className="font-black">{item.gameTitle}</p>
                        <p className="mt-1 text-sm muted">{item.title}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.liked ? <span className="tag"><Heart size={14} /> лайк</span> : null}
                        {item.saved ? <span className="tag"><Clapperboard size={14} /> сохранено</span> : null}
                        {item.comments.length > 0 ? <span className="tag"><MessageCircle size={14} /> {item.comments.length}</span> : null}
                      </div>
                    </div>
                    {item.comments.length > 0 ? (
                      <div className="mt-3 grid gap-2">
                        {item.comments.slice(0, 2).map((comment) => (
                          <p className="rounded-xl bg-black/10 px-3 py-2 text-sm leading-6" key={comment.id}>{comment.text}</p>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <p className="leading-7 muted">Ты ещё не лайкал и не комментировал ролики. Открой Shorts и попробуй.</p>
            )}
          </section>

        </div>
      </div>
    </section>
  );
}

function AccessCard({ title, text, actionHref, action }: { title: string; text: string; actionHref?: string; action?: string }) {
  return (
    <section className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="glass-card max-w-2xl rounded-[1.5rem] p-8">
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-4 leading-7 muted">{text}</p>
        {actionHref && action ? <Link href={actionHref} className="btn btn-primary mt-6">{action}</Link> : null}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] px-4 py-3">
      <span className="text-sm font-bold muted">{label}</span>
      <span className="font-black text-[var(--accent-2)]">{value}</span>
    </div>
  );
}

function StatusBox({ type, text }: { type: "success" | "error"; text: string }) {
  const success = type === "success";

  return (
    <div className={`rounded-2xl border p-4 font-bold ${success ? "border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_13%,transparent)] text-[var(--accent-2)]" : "border-[color-mix(in_srgb,var(--danger)_45%,transparent)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] text-[var(--danger)]"}`}>
      {text}
    </div>
  );
}

function profileErrorText(error: AuthError) {
  const messages: Record<string, string> = {
    badWords: "Модерация отклонила текст: убери мат, оскорбления или запрещённые слова.",
    invalidAvatar: "Аватар должен быть изображением png, jpg, jpeg, webp или gif до 900 KB.",
    friendNotFound: "Игрок с таким ID не найден.",
    friendSelf: "Нельзя добавить самого себя.",
    friendAlreadyExists: "Этот игрок уже в друзьях.",
    friendRequestExists: "Заявка уже отправлена.",
    missingFields: "Заполни обязательные поля.",
    notAuthenticated: "Сначала войди в аккаунт."
  };

  return messages[error] ?? "Произошла ошибка. Проверь данные и попробуй снова.";
}
