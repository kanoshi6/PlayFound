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
  emailSent: boolean;
  deliveryError?: string;
};

async function sendVerificationEmail(contact: string, code: string) {
  try {
    const response = await fetch("/api/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, code })
    });

    const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (!response.ok || !payload?.ok) {
      return { ok: false, error: payload?.error ?? "Не удалось отправить письмо." };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Не удалось отправить письмо." };
  }
}

export function RegisterPage() {
  const { register, verifyAccount } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [pendingVerification, setPendingVerification] = useState<PendingVerification | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = register({
      username: String(formData.get("username") ?? ""),
      displayName: String(formData.get("displayName") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      password: String(formData.get("password") ?? "")
    });

    if (!result.ok) {
      setSubmitting(false);
      setError(result.error);
      return;
    }

    const delivery = await sendVerificationEmail(result.user.contact, result.code);

    setSubmitting(false);
    setError(null);
    setPendingVerification({
      username: result.user.username,
      contact: result.user.contact,
      code: result.code,
      emailSent: delivery.ok,
      deliveryError: delivery.ok ? undefined : delivery.error
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
              Мы отправили код подтверждения на email. Если письмо не пришло, проверь папку “Спам” и настройки отправителя в Render.
            </p>
          </div>

          <form className="surface rounded-[1.5rem] p-5 sm:p-6" onSubmit={onVerify}>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
              <p className="text-sm font-black text-[var(--accent-2)]">
                {pendingVerification.emailSent ? "Код отправлен на email" : "Письмо не отправлено"}
              </p>
              <p className="mt-2 break-words text-sm leading-6 muted">{pendingVerification.contact}</p>
              {!pendingVerification.emailSent ? (
                <div className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--amber)_45%,transparent)] bg-[color-mix(in_srgb,var(--amber)_10%,transparent)] p-4">
                  <p className="text-sm font-bold text-[var(--amber)]">
                    Почтовый сервис не настроен или домен отправителя не подтверждён. Для проверки аккаунта используй код ниже.
                  </p>
                  {pendingVerification.deliveryError ? <p className="mt-2 break-words text-xs muted">{pendingVerification.deliveryError}</p> : null}
                  <p className="mt-4 text-xs font-black uppercase text-[var(--muted)]">Код подтверждения</p>
                  <p className="mt-1 text-3xl font-black tracking-[0.16em] text-[var(--accent-2)]">{pendingVerification.code}</p>
                </div>
              ) : null}
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
            Новые аккаунты создаются как профили игроков. Разработчиком можно стать позже через страницу для авторов в футере.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-[1.5rem] border border-[var(--line-strong)] p-5">
            <div className="flex items-center gap-3">
              <Mail size={20} color="var(--accent-2)" />
              <h2 className="text-xl font-black">Email</h2>
            </div>
            <p className="mt-3 leading-7 muted">Основной способ подтверждения аккаунта. Для отправки писем используй Resend и подтверждённый домен отправителя.</p>
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
            <AuthField label="Пароль" name="password" placeholder="Пароль" type="password" />
          </div>

          {error ? <ErrorBox error={error} /> : null}

          <button type="submit" className="btn btn-primary mt-6 w-full" disabled={submitting}>
            <UserPlus size={18} />
            {submitting ? "Создаём аккаунт..." : "Создать аккаунт"}
          </button>

          <div className="mt-5 grid gap-2 text-center text-sm muted">
            <p>Аккаунт будет создан как профиль игрока. Разработчиком можно стать позже через страницу для авторов.</p>
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
