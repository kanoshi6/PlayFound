"use client";

import { Check } from "lucide-react";
import { usePlayFound } from "@/lib/settings-context";

const pricingKeys = ["free", "start", "promo", "launch"] as const;

export function PricingCards() {
  const { t } = usePlayFound();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {pricingKeys.map((key, index) => {
        const plan = t.pricing[key];

        return (
          <article
            className={`glass-card rounded-[1.25rem] p-5 ${
              index === 2 ? "border-[var(--line-strong)] shadow-glow" : ""
            }`}
            key={key}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className="mt-2 text-sm leading-6 muted">{plan.text}</p>
              </div>
              <span className="rounded-full border border-[var(--line)] px-3 py-1 text-sm font-black text-[var(--accent-2)]">
                {index === 0 ? t.common.free : t.common.from}
              </span>
            </div>
            <p className="mt-5 text-3xl font-black">{plan.price}</p>
            <div className="mt-5 grid gap-3">
              {plan.features.map((feature) => (
                <div className="flex items-start gap-2 text-sm muted" key={feature}>
                  <Check
                    className="mt-0.5 shrink-0"
                    size={16}
                    color="var(--accent)"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
