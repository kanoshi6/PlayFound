"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Eye, Heart, MessageSquare, Plus } from "lucide-react";
import {
  getGameSubmissionsByDeveloper,
  type GameSubmission,
  type SubmissionActivity
} from "@/lib/prototype-storage";
import { useAuth } from "@/lib/auth-context";
import { usePlayFound } from "@/lib/settings-context";

function fallbackActivity(title: string): SubmissionActivity {
  const seed = title
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  return {
    views: 100 + (seed % 700),
    wishlistAdds: 10 + (seed % 120),
    feedbackCount: 2 + (seed % 24),
    interestScore: 45 + (seed % 50),
    lastEvents: [
      "Карточка ожидает новых сигналов",
      "Первые игроки открыли страницу",
      "Wishlist активность обновлена"
    ]
  };
}

export function DeveloperGamesPage() {
  const { t } = usePlayFound();
  const { loaded, session, developerProfile } = useAuth();
  const [submissions, setSubmissions] = useState<GameSubmission[]>([]);

  useEffect(() => {
    if (loaded && session?.developerProfileId) {
      setSubmissions(getGameSubmissionsByDeveloper(session.developerProfileId));
    }
  }, [loaded, session?.developerProfileId]);

  const totals = useMemo(
    () =>
      submissions.reduce(
        (acc, submission) => {
          const activity = submission.activity ?? fallbackActivity(submission.title);
          return {
            views: acc.views + activity.views,
            wishlistAdds: acc.wishlistAdds + activity.wishlistAdds,
            feedbackCount: acc.feedbackCount + activity.feedbackCount,
            interestScore: Math.max(acc.interestScore, activity.interestScore)
          };
        },
        { views: 0, wishlistAdds: 0, feedbackCount: 0, interestScore: 0 }
      ),
    [submissions]
  );

  if (!loaded) {
    return <AccessCard title="PlayFound" text="Loading..." />;
  }

  if (!session) {
    return (
      <AccessCard
        title={t.auth.access.loginRequiredTitle}
        text={t.auth.access.loginRequiredText}
        actionHref="/login"
        action={t.nav.login}
      />
    );
  }

  if (session.activeRole !== "developer" || !session.developerProfileId) {
    return (
      <AccessCard
        title={t.auth.access.developerRequiredTitle}
        text={t.auth.access.developerRequiredText}
        actionHref="/developers"
        action={t.developerArea.goDevelopers}
      />
    );
  }

  return (
    <section className="container-shell section-pad">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-4xl">
          <span className="eyebrow">
            <BarChart3 size={15} />
            {developerProfile?.displayName ?? session.displayName}
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            {t.developerArea.myGamesTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 muted">
            {t.developerArea.myGamesSubtitle}
          </p>
        </div>
        <Link href="/submit" className="btn btn-primary">
          <Plus size={18} />
          {t.nav.submit}
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Metric icon={<Eye size={19} />} label={t.developerArea.views} value={totals.views} />
        <Metric
          icon={<Heart size={19} />}
          label={t.developerArea.wishlistAdds}
          value={totals.wishlistAdds}
        />
        <Metric
          icon={<MessageSquare size={19} />}
          label={t.developerArea.feedback}
          value={totals.feedbackCount}
        />
        <Metric
          icon={<BarChart3 size={19} />}
          label={t.developerArea.interest}
          value={`${totals.interestScore}%`}
        />
      </div>

      {submissions.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {submissions.map((submission) => (
            <DeveloperGameCard submission={submission} key={submission.id} />
          ))}
        </div>
      ) : (
        <div className="glass-card mt-8 rounded-[1.5rem] p-8 text-center">
          <h2 className="text-2xl font-black">{t.developerArea.emptyTitle}</h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 muted">
            {t.developerArea.emptyText}
          </p>
          <Link href="/submit" className="btn btn-primary mt-6">
            <Plus size={18} />
            {t.nav.submit}
          </Link>
        </div>
      )}

      <p className="mt-8 text-sm leading-6 muted">
        {t.developerArea.ownerOnlyNote}
      </p>
    </section>
  );
}

function DeveloperGameCard({ submission }: { submission: GameSubmission }) {
  const { t } = usePlayFound();
  const activity = submission.activity ?? fallbackActivity(submission.title);

  return (
    <article className="surface rounded-[1.5rem] p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="tag">
              {t.admin.statuses.submission[submission.reviewStatus]}
            </span>
            <span className="tag">{submission.genre}</span>
            <span className="tag">{submission.platform}</span>
            <span className="tag">{submission.status}</span>
          </div>
          <h2 className="mt-4 text-2xl font-black">{submission.title}</h2>
          <p className="mt-3 max-w-4xl leading-7 muted">{submission.short}</p>
        </div>
        <p className="text-sm font-bold muted">{formatDate(submission.createdAt)}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <SmallStat label={t.developerArea.views} value={activity.views} />
        <SmallStat label={t.developerArea.wishlistAdds} value={activity.wishlistAdds} />
        <SmallStat label={t.developerArea.feedback} value={activity.feedbackCount} />
        <SmallStat label={t.developerArea.interest} value={`${activity.interestScore}%`} />
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
        <p className="font-black text-[var(--accent-2)]">
          {t.developerArea.events}
        </p>
        <div className="mt-3 grid gap-2">
          {activity.lastEvents.map((event) => (
            <p className="text-sm leading-6 muted" key={event}>
              {event}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

function Metric({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <article className="glass-card rounded-[1.25rem] p-5">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent-2)]">
        {icon}
      </span>
      <p className="mt-4 text-sm font-black uppercase text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-[var(--accent-2)]">{value}</p>
    </article>
  );
}

function SmallStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
      <p className="text-xs font-black uppercase text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function AccessCard({
  title,
  text,
  actionHref,
  action
}: {
  title: string;
  text: string;
  actionHref?: string;
  action?: string;
}) {
  return (
    <section className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="glass-card max-w-2xl rounded-[1.5rem] p-8">
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-4 leading-7 muted">{text}</p>
        {actionHref && action ? (
          <Link href={actionHref} className="btn btn-primary mt-6">
            {action}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
