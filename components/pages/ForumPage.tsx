"use client";

import { MessageSquare, Pin, Search, ShieldAlert, ThumbsUp } from "lucide-react";

const categories = [
  { title: "Общение", threads: 42, text: "Свободное общение игроков и разработчиков." },
  { title: "Новости платформы", threads: 12, text: "Анонсы PlayFound, изменения правил и обновления." },
  { title: "Поиск команды", threads: 28, text: "Ищи программистов, художников, сценаристов и тестировщиков." },
  { title: "Помощь разработчикам", threads: 35, text: "Страницы игр, билды, трейлеры, продвижение и QA." },
  { title: "Баги и ошибки", threads: 16, text: "Сообщения об ошибках сайта и игр." },
  { title: "Геймджемы", threads: 9, text: "Совместные события, темы и голосования." }
];

const threads = [
  { title: "Как оформить страницу игры, чтобы игрок не закрыл её через 5 секунд?", tag: "гайд", pinned: true, likes: 128 },
  { title: "Ищу 2D-художника для уютной RPG про ферму и шахты", tag: "команда", pinned: false, likes: 76 },
  { title: "Предложение: добавить фильтр 'игры с демо' в каталог", tag: "идея", pinned: false, likes: 54 },
  { title: "Баг: в мобильной версии карточка ролика перекрывает кнопку", tag: "баг", pinned: false, likes: 21 }
];

export function ForumPage() {
  return (
    <section className="container-shell section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <span className="eyebrow">
            <MessageSquare size={15} />
            Форум
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
            Обсуждения, баги, команды и модерация
          </h1>
          <p className="mt-5 text-lg leading-8 muted">
            Форум нужен не только игрокам, но и разработчикам: обсуждения игр, поиск команды, вакансии, баг-репорты, предложения и геймджемы.
          </p>
        </div>
        <div className="glass-card rounded-[1.5rem] p-4">
          <label className="grid gap-2">
            <span className="text-sm font-black">Поиск по форуму</span>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
              <input className="input pl-11" placeholder="Найти тему, тег или автора" />
            </div>
          </label>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <article className="surface rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:border-[var(--line-strong)]" key={category.title}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black">{category.title}</h2>
              <span className="tag">{category.threads} тем</span>
            </div>
            <p className="mt-3 leading-7 muted">{category.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="surface rounded-[1.75rem] p-5">
          <h2 className="text-2xl font-black">Горячие темы</h2>
          <div className="mt-5 grid gap-3">
            {threads.map((thread) => (
              <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={thread.title}>
                <div className="flex flex-wrap items-center gap-2">
                  {thread.pinned ? <span className="tag"><Pin size={14} /> закреп</span> : null}
                  <span className="tag">{thread.tag}</span>
                  <span className="tag"><ThumbsUp size={14} /> {thread.likes}</span>
                </div>
                <h3 className="mt-3 text-xl font-black">{thread.title}</h3>
                <p className="mt-2 text-sm muted">Комментарии, жалобы, лайки/дизлайки и закрытие темы будут работать через backend в полной версии.</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="glass-card h-fit rounded-[1.75rem] p-6">
          <span className="eyebrow">
            <ShieldAlert size={15} />
            Модерация
          </span>
          <h2 className="mt-4 text-2xl font-black">Правила форума</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 muted">
            <li>• Мат и оскорбления фильтруются автоматически.</li>
            <li>• Жалобы уходят хелперам и админам.</li>
            <li>• Закреп, закрытие и удаление тем доступны модерации.</li>
            <li>• Для разработчиков будут закрытые категории.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
