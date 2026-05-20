"use client";

import { Briefcase, CheckCircle2, Clock, Filter, Send } from "lucide-react";

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
  return (
    <section className="container-shell section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <span className="eyebrow">
            <Briefcase size={15} />
            Вакансии
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            Команды для инди-игр
          </h1>
          <p className="mt-5 text-lg leading-8 muted">
            Разработчики публикуют вакансии, а хелперы или админы проверяют их перед появлением в ленте. Это защищает игроков от скама и мусорных объявлений.
          </p>
        </div>
        <div className="glass-card rounded-[1.5rem] p-5">
          <h2 className="text-2xl font-black">Фильтры</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Роль",
              "Оплата",
              "Формат",
              "Опыт",
              "Навыки",
              "Статус"
            ].map((filter) => (
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
