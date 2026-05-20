"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Headphones, Send } from "lucide-react";
import {
  createSupportTicket,
  type SupportTicketCategory,
  type SupportTicketPriority
} from "@/lib/prototype-storage";
import { usePlayFound } from "@/lib/settings-context";

const categories: SupportTicketCategory[] = [
  "account",
  "wishlist",
  "gamePage",
  "developer",
  "other"
];
const priorities: SupportTicketPriority[] = ["normal", "high"];

export function SupportPage() {
  const { t } = usePlayFound();
  const [success, setSuccess] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    createSupportTicket({
      name: String(formData.get("name") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      category: String(formData.get("category") ?? "other") as SupportTicketCategory,
      priority: String(formData.get("priority") ?? "normal") as SupportTicketPriority,
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? "")
    });

    setSuccess(true);
    form.reset();
  };

  return (
    <section className="container-shell section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="eyebrow">
            <Headphones size={15} />
            {t.support.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            {t.support.title}
          </h1>
          <p className="mt-5 text-lg leading-8 muted">{t.support.subtitle}</p>

          <div className="glass-card mt-8 rounded-[1.5rem] p-6">
            <h2 className="text-2xl font-black">{t.support.helpTitle}</h2>
            <div className="mt-5 grid gap-4">
              {t.support.helpItems.map((item) => (
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
              label={t.support.fields.name}
              name="name"
              placeholder={t.support.placeholders.name}
              required
            />
            <Field
              label={t.support.fields.contact}
              name="contact"
              placeholder={t.support.placeholders.contact}
              required
            />
            <label className="grid gap-2">
              <span className="text-sm font-black">{t.support.fields.category}</span>
              <select className="input" name="category" required>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {t.support.categories[category]}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-black">{t.support.fields.priority}</span>
              <select className="input" name="priority" required>
                {priorities.map((priority) => (
                  <option value={priority} key={priority}>
                    {t.support.priorities[priority]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-4">
            <Field
              label={t.support.fields.subject}
              name="subject"
              placeholder={t.support.placeholders.subject}
              required
            />
            <label className="grid gap-2">
              <span className="text-sm font-black">{t.support.fields.message}</span>
              <textarea
                className="input min-h-40 resize-y"
                name="message"
                placeholder={t.support.placeholders.message}
                required
              />
            </label>
          </div>

          {success ? (
            <div className="mt-5 rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--accent)_13%,transparent)] p-4 font-bold text-[var(--accent-2)]">
              {t.support.success}
            </div>
          ) : null}

          <button type="submit" className="btn btn-primary mt-6 w-full">
            <Send size={18} />
            {t.support.submit}
          </button>
          <p className="mt-3 text-center text-xs muted">{t.support.prototypeNote}</p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  required
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <input
        className="input"
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
