"use client";

import { MessageSquare, Pin, Search, ThumbsUp, TrendingUp, Users } from "lucide-react";

const categories = [
  { title: "Обсуждение игр", threads: 42, text: "Отзывы, находки, рекомендации и вопросы по играм." },
  { title: "Новости платформы", threads: 12, text: "Анонсы PlayFound, изменения каталога и обновления." },
  { title: "Поиск команды", threads: 28, text: "Ищи программистов, художников, сценаристов и тестировщиков." },
  { title: "Баг-репорты", threads: 16, text: "Ошибки сайта, игр, роликов и личного кабинета." },
  { title: "Геймджемы", threads: 9, text: "Совместные события, темы, голосования и итоги." },
  { title: "Моды и фан-контент", threads: 15, text: "Моды, карты, фан-арт и сборки сообщества." }
];

const threads = [
  { title: "Во что поиграть, если хочется Terraria-like, но не Terraria?", tag: "подборка", pinned: true, likes: 128 },
  { title: "Ищу 2D-художника для уютной RPG про ферму и шахты", tag: "команда", pinned: false, likes: 76 },
  { title: "Предложение: добавить фильтр 'игры с демо' в каталог", tag: "идея", pinned: false, likes: 54 },
  { title: "Баг: в мобильной версии карточка ролика перекрывает кнопку", tag: "баг", pinned: false, likes: 21 }
];

export function ForumPage() {
  return (
    <section className="container-shell section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <span className="eyebrow"><MessageSquare size={15} /> Форум</span>
          <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">Сообщество вокруг инди-игр</h1>
          <p className="mt-5 text-lg leading-8 muted">
            Обсуждай игры, ищи команду, публикуй баг-репорты, предлагай идеи и участвуй в геймджемах. Правила и модерация работают в фоне, не занимая главный экран.
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

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category, index) => (
            <article className="interactive-card glass-card rounded-[1.5rem] p-5 reveal-card" style={{ animationDelay: `${index * 60}ms` }} key={category.title}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-black">{category.title}</h2>
                <span className="tag">{category.threads}</span>
              </div>
              <p className="mt-3 leading-7 muted">{category.text}</p>
            </article>
          ))}
        </div>

        <aside className="glass-card h-fit rounded-[1.75rem] p-6 lg:sticky lg:top-28">
          <span className="eyebrow"><TrendingUp size={15} /> Тренды</span>
          <h2 className="mt-4 text-2xl font-black">Горячие темы</h2>
          <div className="mt-5 grid gap-3">
            {threads.map((thread) => (
              <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4" key={thread.title}>
                <div className="flex flex-wrap items-center gap-2">
                  {thread.pinned ? <span className="tag"><Pin size={14} /> закреп</span> : null}
                  <span className="tag">{thread.tag}</span>
                  <span className="tag"><ThumbsUp size={14} /> {thread.likes}</span>
                </div>
                <h3 className="mt-3 font-black">{thread.title}</h3>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
            <p className="inline-flex items-center gap-2 font-black"><Users size={17} /> Модерация форума</p>
            <p className="mt-2 text-sm leading-6 muted">Роли, жалобы, автофильтр мата, скрытие сообщений и логи модерации собраны в единую систему.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
