"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileUp,
  LogIn,
  Rocket,
  ShieldCheck,
  UserPlus
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { usePlayFound } from "@/lib/settings-context";

export function DevelopersPage() {
  const { t } = usePlayFound();
  const { loaded, session, developerProfile, becomeDeveloper } = useAuth();
  const router = useRouter();

  const createDeveloper = () => {
    const profile = becomeDeveloper();

    if (profile) {
      router.push("/developer/games");
    }
  };

  return (
    <>
      <section className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="eyebrow">
              <Rocket size={15} />
              Кабинет разработчика
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
              Публикуй игры, ролики, вакансии и собирай аудиторию
            </h1>
            <p className="mt-5 text-lg leading-8 muted">
              Разработчик в PlayFound получает отдельный профиль, страницу заявок, доступ к отправке игр на модерацию, статистику, вакансии, ролики и инструменты продаж.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {loaded && !session ? (
                <>
                  <Link href="/login" className="btn btn-secondary">
                    <LogIn size={18} />
                    Войти
                  </Link>
                  <Link href="/register" className="btn btn-primary">
                    <UserPlus size={18} />
                    Создать аккаунт
                  </Link>
                </>
              ) : null}
              {loaded && session?.activeRole === "player" ? (
                <button type="button" className="btn btn-primary" onClick={createDeveloper}>
                  <ShieldCheck size={18} />
                  Стать разработчиком
                </button>
              ) : null}
              {loaded && session?.activeRole === "developer" ? (
                <>
                  <Link href="/developer/games" className="btn btn-secondary">
                    <BarChart3 size={18} />
                    Мои игры
                  </Link>
                  <Link href="/submit" className="btn btn-primary">
                    <FileUp size={18} />
                    Добавить игру
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Страница игры с трейлером, скриншотами и devlog",
              "Заявки на модерацию игры, обновления и вакансии",
              "Аналитика: просмотры, wishlist, интерес аудитории",
              "Ролики shorts для тизеров и геймплейных моментов",
              "Вакансии для поиска художников, программистов и тестеров",
              "Комментарии, жалобы и обратная связь игроков"
            ].map((benefit) => (
              <div
                className="glass-card group flex items-center gap-3 rounded-[1.25rem] p-4 transition hover:-translate-y-1 hover:border-[var(--line-strong)]"
                key={benefit}
              >
                <CheckCircle2 size={20} color="var(--accent)" />
                <span className="font-black">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-16">
        <DeveloperAccountCard
          loaded={loaded}
          role={session?.activeRole}
          displayName={developerProfile?.displayName ?? session?.displayName}
          onBecome={createDeveloper}
        />
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--panel-soft)] py-16">
        <div className="container-shell">
          <h2 className="text-3xl font-black sm:text-4xl">
            Как игра попадает в каталог
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Создаёшь профиль",
                text: "Сначала регистрируешь обычный аккаунт игрока, затем нажимаешь 'Стать разработчиком'. Появляется связанный профиль: Имя Разраб."
              },
              {
                title: "Отправляешь игру",
                text: "Заполняешь форму, добавляешь ссылки на билд, трейлер и скриншоты. Заявка получает ownerUserId и developerProfileId."
              },
              {
                title: "Проходишь модерацию",
                text: "Админ проверяет описание, файлы, контент, контакты и решает: одобрить, отклонить или запросить исправления."
              }
            ].map((item, index) => (
              <article className="glass-card rounded-[1.25rem] p-6" key={item.title}>
                <span className="text-sm font-black text-[var(--accent-2)]">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">Монетизация магазина</h2>
            <p className="mt-3 leading-7 muted">
              Разработчик выбирает модель проекта: бесплатная игра, разовая покупка, донат, промокоды или скидка.
            </p>
          </div>
          <Link href="/jobs" className="btn btn-secondary">Вакансии</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Free", "Бесплатная игра или демо для роста аудитории."],
            ["One-time purchase", "Разовая покупка игры."],
            ["Donations", "Добровольная поддержка автора."],
            ["Promo codes", "Ключи и промокоды для тестеров и прессы."]
          ].map(([title, text]) => (
            <article className="glass-card rounded-[1.25rem] p-5" key={title}>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="glass-card overflow-hidden rounded-[1.75rem] p-8 sm:p-10">
          <h2 className="max-w-3xl text-4xl font-black tracking-normal">
            Кабинет разработчика — это не просто форма добавления игры
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 muted">
            Он должен стать местом, где автор видит заявки, статусы, активность игроков, вакансии команды, ролики, причины отклонений и подсказки по улучшению страницы.
          </p>
          <Link href="/developer/games" className="btn btn-primary mt-7">
            Открыть мои игры
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

function DeveloperAccountCard({
  loaded,
  role,
  displayName,
  onBecome
}: {
  loaded: boolean;
  role?: "player" | "developer" | "admin";
  displayName?: string;
  onBecome: () => void;
}) {
  if (!loaded || role === "admin") {
    return null;
  }

  if (!role) {
    return (
      <article className="glass-card rounded-[1.5rem] p-6">
        <h2 className="text-2xl font-black">Сначала войди или создай аккаунт</h2>
        <p className="mt-3 leading-7 muted">
          Разработчиком можно стать только из обычного аккаунта игрока. Это нужно, чтобы заявки, игры, вакансии и комментарии были связаны с одним владельцем.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className="btn btn-secondary">
            <LogIn size={18} />
            Войти
          </Link>
          <Link href="/register" className="btn btn-primary">
            <UserPlus size={18} />
            Регистрация
          </Link>
        </div>
      </article>
    );
  }

  if (role === "developer") {
    return (
      <article className="glass-card rounded-[1.5rem] p-6">
        <span className="tag">{displayName}</span>
        <h2 className="mt-4 text-2xl font-black">Профиль разработчика активен</h2>
        <p className="mt-3 leading-7 muted">
          Теперь тебе доступны “Мои игры”, добавление игры, вакансии, ролики и статистика.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/developer/games" className="btn btn-secondary">
            <BarChart3 size={18} />
            Мои игры
          </Link>
          <Link href="/submit" className="btn btn-primary">
            Добавить игру
            <ArrowRight size={18} />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="glass-card rounded-[1.5rem] p-6">
      <span className="tag">{displayName}</span>
      <h2 className="mt-4 text-2xl font-black">Стать разработчиком</h2>
      <p className="mt-3 leading-7 muted">
        Нажми кнопку — PlayFound создаст связанный профиль разработчика “{displayName} Разраб”.
      </p>
      <button type="button" className="btn btn-primary mt-6" onClick={onBecome}>
        <ShieldCheck size={18} />
        Стать разработчиком
      </button>
    </article>
  );
}
