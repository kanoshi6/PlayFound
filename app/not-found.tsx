"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePlayFound } from "@/lib/settings-context";

export default function NotFound() {
  const { t } = usePlayFound();

  return (
    <section className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="max-w-2xl">
        <span className="eyebrow">404</span>
        <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
          {t.notFound.title}
        </h1>
        <p className="mt-4 text-lg leading-8 muted">{t.notFound.text}</p>
        <Link href="/catalog" className="btn btn-primary mt-8">
          <ArrowLeft size={18} />
          {t.notFound.action}
        </Link>
      </div>
    </section>
  );
}
