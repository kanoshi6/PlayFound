"use client";

import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { usePlayFound } from "@/lib/settings-context";

export function AboutPage() {
  const { t } = usePlayFound();

  return (
    <>
      <section className="container-shell section-pad">
        <div className="max-w-4xl">
          <span className="eyebrow">
            <Compass size={15} />
            {t.about.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            {t.about.title}
          </h1>
          <p className="mt-6 text-xl leading-9 muted">{t.about.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalog" className="btn btn-primary">
              {t.common.watchGames}
              <ArrowRight size={18} />
            </Link>
            <Link href="/developers" className="btn btn-secondary">
              {t.common.forDevelopers}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-4 pb-16 md:grid-cols-2">
        {t.about.sections.map((section) => (
          <article className="glass-card rounded-[1.5rem] p-6" key={section.title}>
            <h2 className="text-2xl font-black">{section.title}</h2>
            <p className="mt-4 leading-7 muted">{section.text}</p>
          </article>
        ))}
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--panel-soft)] py-16">
        <div className="container-shell">
          <span className="eyebrow">
            <Sparkles size={15} />
            PlayFound
          </span>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            {t.about.valuesTitle}
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((value) => (
              <div
                className="glass-card rounded-[1.25rem] p-5 text-lg font-black"
                key={value}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
