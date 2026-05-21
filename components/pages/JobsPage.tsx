"use client";

import Link from "next/link";
import { Briefcase, CheckCircle2, Clock, Filter, Lock, Send } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const jobs = [
  {
    title: "2D-художник для уютной farming RPG",
    team: "Greenvale Team",
    role: "Художник",
    pay: "Процент + фикс",
    format: "Удалённо",
    status: "На проверке"
  },
  {
    title: "Unity-программист для платформера с физикой",
    team: "Cavernkind Crew",
    role: "Программист",
    pay: "Договорная",
    format: "Удалённо",
    status: "Одобрена"
  },
  {
    title: "Тестировщики демо хоррора на 30 минут",
    team: "Signal Lab",
    role: "Тестировщик",
    pay: "Промокод + донат",
    format: "Гибкий",
    status: "Одобрена"
  }
];

export function JobsPage() {
  const { loaded, session } = useAuth();

  if (!loaded) {
    return <AccessState title="Вакансии" text="Проверяем роль аккаунта..." />;
  }

  if (!session) {
    return (
      <AccessState
        title="Вакансии доступны после входа"
        text="Вакансии — рабочий инструмент для команд и разработчиков. Сначала войди, потом создай developer-профиль."
        actionHref="/login"
        action="Войти"
      />
    );
  }

  if (session.activeRole !== "developer" && session.activeRole !== "admin") {
    return (
      <AccessState
        title="Только для разработчиков"
        text="Раздел вакансий спрятан от обычных игроков, чтобы PlayFound оставался платформой поиска игр. Стать разработчиком можно через футер или страницу для авторов."
        actionHref="/developers"
        action="Стать разработчиком"
      />
    );
  }

  return (
    <section className="container-shell section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <span className="eyebrow">
            <Briefcase size={15} />
            Вакансии разработчиков
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            Команды для инди-игр
          </h1>
          <p className="mt-5 text-lg leading-8 muted">
            Разработчики публикуют вакансии, а хелперы или админы проверяют их перед появлением в ленте. Игрокам этот раздел не бросается в глаза.
          </p>
        </div>
        <div className="glass-card rounded-[1.5rem] p-5">
          <h2 className="text-2xl font-black">Фильтры</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["Роль", "Оплата", "Формат", "Опыт", "Навыки", "Статус"].map((filter) => (
              <button type="button" className="btn btn-secondary justify-start" key={filter}>
                <Filter size={16} />
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-4">
          {jobs.map((job) => (
            <article className="surface rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:border-[var(--line-strong)]" key={job.title}>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="tag">{job.role}</span>
                    <span className="tag">{job.pay}</span>
                    <span className="tag">{job.format}</span>
                    <span className="tag">{job.status}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-black">{job.title}</h2>
                  <p className="mt-2 muted">Команда: {job.team}</p>
                </div>
                <button type="button" className="btn btn-primary">
                  Откликнуться
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="glass-card h-fit rounded-[1.75rem] p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl font-black">Публикация вакансии</h2>
          <div className="mt-5 grid gap-4">
            {[
              { icon: Send, text: "Разработчик заполняет вакансию в кабинете." },
              { icon: Clock, text: "Заявка получает статус новая или на проверке." },
              { icon: CheckCircle2, text: "Хелпер/админ одобряет, отклоняет или просит исправить." }
            ].map((item) => (
              <div className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={item.text}>
                <item.icon className="mt-1 shrink-0 text-[var(--accent-2)]" size={18} />
                <p className="leading-7 muted">{item.text}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function AccessState({ title, text, actionHref, action }: { title: string; text: string; actionHref?: string; action?: string }) {
  return (
    <section className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="glass-card max-w-2xl rounded-[1.75rem] p-8">
        <span className="eyebrow"><Lock size={15} /> Закрытый раздел</span>
        <h1 className="mt-5 text-4xl font-black">{title}</h1>
        <p className="mt-4 leading-7 muted">{text}</p>
        {actionHref && action ? <Link href={actionHref} className="btn btn-primary mt-6">{action}</Link> : null}
      </div>
    </section>
  );
}


function AccessCard({ title, text, actionHref, action }: { title: string; text: string; actionHref?: string; action?: string }) {
  return (
    <section className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="glass-card max-w-2xl rounded-[1.5rem] p-8">
        <span className="eyebrow"><Briefcase size={15} /> Вакансии</span>
        <h1 className="mt-4 text-4xl font-black">{title}</h1>
        <p className="mt-4 leading-7 muted">{text}</p>
        {actionHref && action ? <Link href={actionHref} className="btn btn-primary mt-6">{action}</Link> : null}
      </div>
    </section>
  );
}
