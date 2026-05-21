"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";

const errorTexts: Record<string, string> = {
  missingFields: "Заполни логин и пароль.",
  invalidCredentials: "Неверный логин или пароль.",
  accountNotVerified: "Аккаунт ещё не подтверждён. Заверши регистрацию кодом.",
  accountBanned: "Аккаунт заблокирован администратором.",
  notAuthenticated: "Сначала войди в аккаунт."
};
import { useAuth, type AuthError } from "@/lib/auth-context";
import { usePlayFound } from "@/lib/settings-context";

export function LoginPage() {
  const { t } = usePlayFound();
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = login(
      String(formData.get("username") ?? ""),
      String(formData.get("password") ?? "")
    );

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (result.session.activeRole === "admin") {
      router.push("/admin");
      return;
    }

    if (result.session.activeRole === "developer") {
      router.push("/developer/games");
      return;
    }

    router.push("/developers");
  };

  return (
    <section className="container-shell section-pad">
      <div className="mx-auto grid max-w-2xl gap-6">
        <div>
          <span className="eyebrow">
            <LogIn size={15} />
            PlayFound
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            {t.auth.loginTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 muted">{t.auth.loginSubtitle}</p>
        </div>

        <form className="surface rounded-[1.5rem] p-5 sm:p-6" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <AuthField
              label={t.auth.username}
              name="username"
              placeholder={t.auth.usernamePlaceholder}
            />
            <AuthField
              label={t.auth.password}
              name="password"
              placeholder={t.auth.passwordPlaceholder}
              type="password"
            />
          </div>

          {error ? (
            <div className="mt-5 rounded-2xl border border-[color-mix(in_srgb,var(--danger)_45%,transparent)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] p-4 font-bold text-[var(--danger)]">
              {errorTexts[error] ?? "Ошибка входа. Проверь данные."}
            </div>
          ) : null}

          <button type="submit" className="btn btn-primary mt-6 w-full">
            <LogIn size={18} />
            {t.auth.submitLogin}
          </button>

          <div className="mt-5 grid gap-2 text-center text-sm muted">
            <p>{t.auth.Warning}</p>
            <p>
              {t.auth.noAccount}{" "}
              <Link href="/register" className="font-black text-[var(--accent-2)]">
                {t.auth.createAccount}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function AuthField({
  label,
  name,
  placeholder,
  type = "text"
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <input
        className="input"
        name={name}
        placeholder={placeholder}
        type={type}
        required
      />
    </label>
  );
}
