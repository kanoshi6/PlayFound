"use client";

import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createGameSubmission } from "@/lib/prototype-storage";
import { usePlayFound } from "@/lib/settings-context";

export function SubmitPage() {
  const { t } = usePlayFound();
  const { loaded, session } = useAuth();
  const [success, setSuccess] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    createGameSubmission({
      title: String(formData.get("title") ?? ""),
      genre: String(formData.get("genre") ?? ""),
      platform: String(formData.get("platform") ?? ""),
      status: String(formData.get("status") ?? ""),
      gameLink: String(formData.get("gameLink") ?? ""),
      trailerLink: String(formData.get("trailerLink") ?? ""),
      short: String(formData.get("short") ?? ""),
      full: String(formData.get("full") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      screenshots: String(formData.get("screenshots") ?? ""),
      ownerUserId: session?.userId,
      developerProfileId: session?.developerProfileId
    });

    setSuccess(true);
    form.reset();
  };

  if (!loaded) {
    return <AccessCard title="PlayFound" text="Loading..." />;
  }

  if (!session) {
    return (
      <AccessCard
        title={t.auth.access.loginRequiredTitle}
        text={t.auth.access.loginRequiredText}
        primaryHref="/login"
        primaryText={t.nav.login}
        secondaryHref="/register"
        secondaryText={t.nav.register}
      />
    );
  }

  if (session.activeRole !== "developer" || !session.developerProfileId) {
    return (
      <AccessCard
        title={t.auth.access.developerRequiredTitle}
        text={t.auth.access.developerRequiredText}
        primaryHref="/developers"
        primaryText={t.developerArea.goDevelopers}
      />
    );
  }

  return (
    <section className="container-shell section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <span className="eyebrow">
            <Send size={15} />
            {t.submit.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            {t.submit.title}
          </h1>
          <p className="mt-5 text-lg leading-8 muted">{t.submit.subtitle}</p>

          <div className="glass-card mt-8 rounded-[1.5rem] p-6">
            <h2 className="text-2xl font-black">{t.submit.noteTitle}</h2>
            <div className="mt-5 grid gap-4">
              {t.submit.noteItems.map((item) => (
                <div className="flex items-start gap-3" key={item}>
                  <CheckCircle2
                    className="mt-1 shrink-0"
                    size={18}
                    color="var(--accent)"
                  />
                  <p className="leading-7 muted">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form className="surface rounded-[1.5rem] p-5 sm:p-6" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={t.submit.fields.title}
              name="title"
              placeholder={t.submit.placeholders.title}
              required
            />
            <label className="grid gap-2">
              <span className="text-sm font-black">{t.submit.fields.genre}</span>
              <select className="input" name="genre" required>
                {Object.entries(t.genres).map(([key, label]) => (
                  <option value={key} key={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-black">{t.submit.fields.platform}</span>
              <select className="input" name="platform" required>
                {["PC", "Android", "Web", "Linux", "Mac"].map((platform) => (
                  <option value={platform} key={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-black">{t.submit.fields.status}</span>
              <select className="input" name="status" required>
                {Object.entries(t.statuses).map(([key, label]) => (
                  <option value={key} key={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label={t.submit.fields.gameLink}
              name="gameLink"
              placeholder={t.submit.placeholders.gameLink}
              type="url"
              required
            />
            <Field
              label={t.submit.fields.trailerLink}
              name="trailerLink"
              placeholder={t.submit.placeholders.trailerLink}
              type="url"
            />
          </div>

          <div className="mt-4 grid gap-4">
            <TextArea
              label={t.submit.fields.short}
              name="short"
              placeholder={t.submit.placeholders.short}
              rows={3}
              required
            />
            <TextArea
              label={t.submit.fields.full}
              name="full"
              placeholder={t.submit.placeholders.full}
              rows={7}
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={t.submit.fields.contact}
                name="contact"
                placeholder={t.submit.placeholders.contact}
                required
              />
              <Field
                label={t.submit.fields.screenshots}
                name="screenshots"
                placeholder={t.submit.placeholders.screenshots}
              />
            </div>
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 accent-[var(--accent)]"
            />
            <span className="text-sm leading-6 muted">{t.submit.agreement}</span>
          </label>

          {success ? (
            <div className="mt-5 rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_13%,transparent)] p-4 font-bold text-[var(--accent-2)]">
              {t.submit.success}
            </div>
          ) : null}

          <button type="submit" className="btn btn-primary mt-6 w-full">
            <Send size={18} />
            {t.submit.submit}
          </button>
          <p className="mt-3 text-center text-xs muted">
            {t.submit.prototypeNote}
          </p>
        </form>
      </div>
    </section>
  );
}

function AccessCard({
  title,
  text,
  primaryHref,
  primaryText,
  secondaryHref,
  secondaryText
}: {
  title: string;
  text: string;
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
}) {
  return (
    <section className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="glass-card max-w-2xl rounded-[1.5rem] p-8">
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-4 leading-7 muted">{text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {primaryHref && primaryText ? (
            <Link href={primaryHref} className="btn btn-primary">
              {primaryText}
            </Link>
          ) : null}
          {secondaryHref && secondaryText ? (
            <Link href={secondaryHref} className="btn btn-secondary">
              {secondaryText}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <input
        className="input"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  rows,
  required
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows: number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <textarea
        className="input min-h-32 resize-y"
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
