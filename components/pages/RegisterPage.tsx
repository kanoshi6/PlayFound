"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Mail, ShieldCheck, UserPlus } from "lucide-react";
import { useAuth, type AuthError } from "@/lib/auth-context";

const errorTexts: Record<string, string> = {
  missingFields: "Заполни все обязательные поля.",
  usernameTaken: "Такой логин уже занят.",
  invalidCode: "Неверный код подтверждения.",
  accountBanned: "Аккаунт заблокирован.",
  badWords: "Модерация отклонила логин или имя: убери мат и оскорбления.",
  invalidAvatar: "Некорректная ссылка на аватарку."
};

type PendingVerification = {
  username: string;
  contact: string;
  code: string;
};

export function RegisterPage() {
  const { register, verifyAccount } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [pendingVerification, setPendingVerification] = useState<PendingVerification | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = register({
      username: String(formData.get("username") ?? ""),
      displayName: String(formData.get("displayName") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      password: String(formData.get("password") ?? "")
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    setPendingVerification({
      username: result.user.username,
      contact: result.user.contact,
      code: result.code
    });
  };

  const onVerify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pendingVerification) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const result = verifyAccount(
      pendingVerification.username,
      String(formData.get("code") ?? "")
    );

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push("/profile");
  };

  if (pendingVerification) {
    return (
      <section className="container-shell section-pad">
        <div className="mx-auto grid max-w-2xl gap-6">
          <div>
            <span className="eyebrow">
              <ShieldCheck size={15} />
              Email verification
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
              Подтверди аккаунт
            </h1>
            <p className="mt-5 text-lg leading-8 muted">
              В продакшене код придёт письмом. В mock-версии код показан на экране, чтобы можно было проверить регистрацию без backend.
            </p>
          </div>

          <form className="surface rounded-[1.5rem] p-5 sm:p-6" onSubmit={onVerify}>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
              <p className="text-sm font-black text-[var(--accent-2)]">Код отправлен на email</p>
              <p className="mt-2 break-words text-sm leading-6 muted">{pendingVerification.contact}</p>
              <p className="mt-4 text-xs font-black uppercase text-[var(--muted)]">Prototype code</p>
              <p className="mt-1 text-3xl font-black tracking-[0.16em] text-[var(--accent-2)]">{pendingVerification.code}</p>
            </div>

            <label className="mt-5 grid gap-2">
              <span className="text-sm font-black">Код подтверждения</span>
              <input className="input text-center text-2xl font-black tracking-[0.18em]" inputMode="numeric" maxLength={6} name="code" placeholder="000000" required />
            </label>

            {error ? <ErrorBox error={error} /> : null}

            <button type="submit" className="btn btn-primary mt-6 w-full">
              <ShieldCheck size={18} />
              Подтвердить аккаунт
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell section-pad">
      <div className="mx-auto grid max-w-3xl gap-6">
        <div>
          <span className="eyebrow">
            <UserPlus size={15} />
            Регистрация игрока
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            Создать аккаунт PlayFound
          </h1>
          <p className="mt-5 text-lg leading-8 muted">
            Новые аккаунты всегда создаются как игроки. Разработчиком можно стать потом во вкладке “Для разработчиков”. Сейчас доступна регистрация только по email.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-[1.5rem] border border-[var(--line-strong)] p-5">
            <div className="flex items-center gap-3">
              <Mail size={20} color="var(--accent-2)" />
              <h2 className="text-xl font-black">Email</h2>
            </div>
            <p className="mt-3 leading-7 muted">Код подтверждения приходит на почту. В mock-режиме код показывается на сайте.</p>
          </div>
          <div className="glass-card rounded-[1.5rem] opacity-70 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black">Telegram</h2>
              <span className="tag">Coming soon</span>
            </div>
            <p className="mt-3 leading-7 muted">Telegram-подтверждение будет добавлено позже через bot API и привязку chat_id.</p>
          </div>
        </div>

        <form className="surface rounded-[1.5rem] p-5 sm:p-6" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthField label="Логин" name="username" placeholder="Например, player_found" />
            <AuthField label="Имя" name="displayName" placeholder="Как показывать тебя на сайте" />
            <AuthField label="Email" name="contact" placeholder="you@example.com" type="email" />
            <AuthField label="Пароль" name="password" placeholder="Пароль для прототипа" type="password" />
          </div>

          {error ? <ErrorBox error={error} /> : null}

          <button type="submit" className="btn btn-primary mt-6 w-full">
            <UserPlus size={18} />
            Создать аккаунт
          </button>

          <div className="mt-5 grid gap-2 text-center text-sm muted">
            <p>Это mock-авторизация: пароли и сессии сохраняются в localStorage только для демонстрации.</p>
            <p>
              Уже есть аккаунт?{" "}
              <Link href="/login" className="font-black text-[var(--accent-2)]">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function ErrorBox({ error }: { error: AuthError }) {
  return (
    <div className="mt-5 rounded-2xl border border-[color-mix(in_srgb,var(--danger)_45%,transparent)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] p-4 font-bold text-[var(--danger)]">
      {errorTexts[error] ?? "Ошибка. Проверь данные и попробуй снова."}
    </div>
  );
}

function AuthField({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <input className="input" name={name} placeholder={placeholder} type={type} required />
    </label>
  );
}
