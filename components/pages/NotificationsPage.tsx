"use client";

import Link from "next/link";
import { Bell, CheckCircle2, MessageCircle, ShieldAlert, Star } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const Notifications = [
  { icon: CheckCircle2, title: "Статус заявки изменён", text: "Игра прошла предварительную проверку и ожидает финального решения." },
  { icon: MessageCircle, title: "Новый ответ на форуме", text: "В теме про оформление страницы игры появился новый комментарий." },
  { icon: Star, title: "Игра из избранного обновилась", text: "Разработчик добавил новый ролик и devlog." },
  { icon: ShieldAlert, title: "Модерация профиля", text: "Аватарка и никнейм проверяются автоматическим фильтром." }
];

export function NotificationsPage() {
  const { loaded, session } = useAuth();

  if (!loaded) {
    return null;
  }

  if (!session) {
    return (
      <section className="container-shell flex min-h-[70vh] items-center py-20">
        <div className="glass-card max-w-2xl rounded-[1.5rem] p-8">
          <h1 className="text-4xl font-black">Нужен вход</h1>
          <p className="mt-4 leading-7 muted">
            Уведомления доступны после входа: заявки, ответы форума, комментарии, покупки, предупреждения и сообщения администрации.
          </p>
          <Link href="/login" className="btn btn-primary mt-6">
            Войти
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell section-pad">
      <div className="max-w-4xl">
        <span className="eyebrow">
          <Bell size={15} />
          Центр уведомлений
        </span>
        <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
          Что произошло на PlayFound
        </h1>
        <p className="mt-5 text-lg leading-8 muted">
          Здесь должны собираться статусы заявок, новые комментарии, ответы на форуме, обновления игр, покупки, предупреждения и сообщения администрации.
        </p>
      </div>

      <div className="mt-10 grid gap-4">
        {Notifications.map((notification) => (
          <article className="surface flex gap-4 rounded-[1.5rem] p-5" key={notification.title}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] text-[var(--accent-2)]">
              <notification.icon size={22} />
            </span>
            <div>
              <h2 className="text-xl font-black">{notification.title}</h2>
              <p className="mt-2 leading-7 muted">{notification.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
