"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Ban,
  Check,
  ClipboardList,
  Coins,
  FileWarning,
  Gauge,
  Headphones,
  Languages,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  Users,
  X
} from "lucide-react";
import {
  createDemoAdminData,
  getGameSubmissions,
  getSupportTickets,
  updateGameSubmission,
  updateSupportTicket,
  type GameSubmission,
  type GameSubmissionReviewStatus,
  type SupportTicket,
  type SupportTicketStatus
} from "@/lib/platform-storage";
import {
  banUser,
  getDeveloperProfiles,
  getUsers,
  sendAdminMessage,
  unbanUser,
  useAuth,
  type DeveloperProfile,
  type UserAccount
} from "@/lib/auth-context";

type AdminTab =
  | "overview"
  | "submissions"
  | "users"
  | "tickets"
  | "roles"
  | "moderation"
  | "currencies"
  | "settings"
  | "security";

type SubmissionFilter = "all" | GameSubmissionReviewStatus;
type TicketFilter = "all" | SupportTicketStatus;

const tabs: Array<{ id: AdminTab; label: string; icon: ComponentType<{ size?: number }> }> = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "submissions", label: "Игры", icon: ClipboardList },
  { id: "users", label: "Пользователи", icon: Users },
  { id: "tickets", label: "Поддержка", icon: Headphones },
  { id: "roles", label: "Роли", icon: UserCheck },
  { id: "moderation", label: "Модерация", icon: FileWarning },
  { id: "currencies", label: "Валюты/языки", icon: Languages },
  { id: "settings", label: "Настройки", icon: SlidersHorizontal },
  { id: "security", label: "Безопасность", icon: LockKeyhole }
];

export function AdminPage() {
  const { loaded, session } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [submissionFilter, setSubmissionFilter] = useState<SubmissionFilter>("all");
  const [ticketFilter, setTicketFilter] = useState<TicketFilter>("all");
  const [submissions, setSubmissions] = useState<GameSubmission[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [profiles, setProfiles] = useState<DeveloperProfile[]>([]);
  const [messageDrafts, setMessageDrafts] = useState<Record<string, string>>({});
  const [banDrafts, setBanDrafts] = useState<Record<string, string>>({});

  const refresh = () => {
    setSubmissions(getGameSubmissions());
    setTickets(getSupportTickets());
    setUsers(getUsers());
    setProfiles(getDeveloperProfiles());
  };

  useEffect(() => {
    refresh();
  }, []);

  const filteredSubmissions = useMemo(
    () => submissions.filter((submission) => submissionFilter === "all" || submission.reviewStatus === submissionFilter),
    [submissionFilter, submissions]
  );

  const filteredTickets = useMemo(
    () => tickets.filter((ticket) => ticketFilter === "all" || ticket.status === ticketFilter),
    [ticketFilter, tickets]
  );

  const metrics = [
    { label: "Новые игры", value: submissions.filter((item) => item.reviewStatus === "pending").length, tone: "accent" },
    { label: "Одобрено", value: submissions.filter((item) => item.reviewStatus === "approved").length, tone: "green" },
    { label: "Тикеты", value: tickets.filter((item) => item.status !== "resolved").length, tone: "amber" },
    { label: "Игроки", value: users.length, tone: "cyan" },
    { label: "Разработчики", value: profiles.length, tone: "purple" }
  ];

  const seedDemo = () => {
    createDemoAdminData();
    refresh();
  };

  const setSubmissionStatus = (id: string, reviewStatus: GameSubmissionReviewStatus) => {
    setSubmissions(updateGameSubmission(id, { reviewStatus }));
  };

  const setTicketStatus = (id: string, status: SupportTicketStatus) => {
    setTickets(updateSupportTicket(id, { status }));
  };

  const sendMessage = (userId: string) => {
    const text = (messageDrafts[userId] ?? "").trim();

    if (!text) {
      return;
    }

    setUsers(sendAdminMessage(userId, text));
    setMessageDrafts((current) => ({ ...current, [userId]: "" }));
  };

  const ban = (userId: string) => {
    setUsers(banUser(userId, banDrafts[userId]?.trim() || "Нарушение правил PlayFound"));
  };

  const unban = (userId: string) => {
    setUsers(unbanUser(userId));
  };

  if (!loaded) {
    return <AccessCard title="PlayFound" text="Загружаем админку..." />;
  }

  if (session?.activeRole !== "admin") {
    return (
      <AccessCard
        title="Нужен доступ администратора"
        text="Админ-панель доступна только аккаунту PlayFoundadmin."
        actionHref="/login"
        action="Войти"
      />
    );
  }

  return (
    <section className="container-shell section-pad">
      <div className="grid gap-6 xl:grid-cols-[17rem_1fr]">
        <aside className="surface h-fit rounded-[1.75rem] p-4 xl:sticky xl:top-28">
          <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-soft)] p-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent-2)]">
              <ShieldCheck size={24} />
            </span>
            <h1 className="mt-4 text-2xl font-black">Control Deck</h1>
            <p className="mt-2 text-sm leading-6 muted">
              Не шаблонная админка: очередь, роли, жалобы, приватность и быстрые решения.
            </p>
          </div>

          <div className="mt-4 grid gap-1">
            {tabs.map((tab) => (
              <button
                type="button"
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                  activeTab === tab.id
                    ? "bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent-2)]"
                    : "text-[var(--muted-strong)] hover:bg-[var(--panel-soft)] hover:text-[var(--text)]"
                }`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="grid gap-6">
          <div className="glass-card overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <span className="eyebrow">
                  <Gauge size={15} />
                  PlayFound Admin
                </span>
                <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-6xl">
                  Операционный центр платформы
                </h2>
                <p className="mt-4 max-w-4xl text-lg leading-8 muted">
                  Здесь собраны пользователи, роли, игры, вакансии, форум, ролики, жалобы, платежи, валюты, языки, темы дизайна, безопасность и логи доступа к персональным данным.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn btn-secondary" onClick={refresh}>
                  <RefreshCw size={17} />
                  Обновить
                </button>
                <button type="button" className="btn btn-primary" onClick={seedDemo}>
                  Создать demo-данные
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} label={metric.label} value={metric.value} tone={metric.tone} />
            ))}
          </div>

          {activeTab === "overview" ? (
            <OverviewPanel submissions={submissions} tickets={tickets} users={users} profiles={profiles} />
          ) : null}

          {activeTab === "submissions" ? (
            <section className="grid gap-4">
              <SectionToolbar title="Модерация игр" description="Проверяй заявки, ссылки, описание, скриншоты, трейлеры и владельца developer-профиля.">
                <FilterSelect
                  value={submissionFilter}
                  onChange={(value) => setSubmissionFilter(value as SubmissionFilter)}
                  options={[
                    ["all", "Все"],
                    ["pending", "Новые"],
                    ["approved", "Одобрены"],
                    ["rejected", "Отклонены"]
                  ]}
                />
              </SectionToolbar>
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    onStatus={setSubmissionStatus}
                    onNote={(id, adminNote) => setSubmissions(updateGameSubmission(id, { adminNote }))}
                  />
                ))
              ) : (
                <EmptyState title="Заявок пока нет" />
              )}
            </section>
          ) : null}

          {activeTab === "tickets" ? (
            <section className="grid gap-4">
              <SectionToolbar title="Тикеты поддержки" description="Вопросы игроков, баги, жалобы, проблемы с аккаунтом и wishlist.">
                <FilterSelect
                  value={ticketFilter}
                  onChange={(value) => setTicketFilter(value as TicketFilter)}
                  options={[
                    ["all", "Все"],
                    ["open", "Открытые"],
                    ["inProgress", "В работе"],
                    ["resolved", "Закрытые"]
                  ]}
                />
              </SectionToolbar>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onStatus={setTicketStatus}
                    onNote={(id, adminNote) => setTickets(updateSupportTicket(id, { adminNote }))}
                  />
                ))
              ) : (
                <EmptyState title="Тикетов пока нет" />
              )}
            </section>
          ) : null}

          {activeTab === "users" ? (
            <section className="grid gap-4">
              <SectionToolbar title="Пользователи и приватность" description="Показывай только нужные данные. Доступ к email/IP/платежам должен логироваться." />
              {users.length > 0 ? (
                users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    messageDraft={messageDrafts[user.id] ?? ""}
                    banDraft={banDrafts[user.id] ?? ""}
                    onMessageDraft={(value) => setMessageDrafts((current) => ({ ...current, [user.id]: value }))}
                    onBanDraft={(value) => setBanDrafts((current) => ({ ...current, [user.id]: value }))}
                    onSend={() => sendMessage(user.id)}
                    onBan={() => ban(user.id)}
                    onUnban={() => unban(user.id)}
                  />
                ))
              ) : (
                <EmptyState title="Пользователей пока нет" />
              )}
            </section>
          ) : null}

          {activeTab === "roles" ? <RolesPanel profiles={profiles} /> : null}
          {activeTab === "moderation" ? <ModerationPanel /> : null}
          {activeTab === "currencies" ? <CurrenciesPanel /> : null}
          {activeTab === "settings" ? <SettingsPanel /> : null}
          {activeTab === "security" ? <SecurityPanel /> : null}
        </div>
      </div>
    </section>
  );
}

function AccessCard({ title, text, actionHref, action }: { title: string; text: string; actionHref?: string; action?: string }) {
  return (
    <section className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="glass-card max-w-2xl rounded-[1.5rem] p-8">
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-4 leading-7 muted">{text}</p>
        {actionHref && action ? <Link href={actionHref} className="btn btn-primary mt-6">{action}</Link> : null}
      </div>
    </section>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <article className="group glass-card rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:border-[var(--line-strong)]">
      <p className="text-xs font-black uppercase text-[var(--muted)]">{label}</p>
      <p className="mt-3 text-4xl font-black text-[var(--accent-2)]">{value}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--panel-soft)]">
        <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${Math.min(100, 24 + value * 12)}%` }} />
      </div>
      <p className="mt-2 text-xs font-bold muted">{tone}</p>
    </article>
  );
}

function SectionToolbar({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <div className="surface rounded-[1.75rem] p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-black">{title}</h2>
          <p className="mt-2 leading-7 muted">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function OverviewPanel({ submissions, tickets, users, profiles }: { submissions: GameSubmission[]; tickets: SupportTicket[]; users: UserAccount[]; profiles: DeveloperProfile[] }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="surface rounded-[1.75rem] p-6">
        <h2 className="text-2xl font-black">Очередь действий</h2>
        <div className="mt-5 grid gap-3">
          {[
            `${submissions.filter((item) => item.reviewStatus === "pending").length} игр ожидают проверки`,
            `${tickets.filter((item) => item.status !== "resolved").length} тикетов поддержки открыто`,
            `${users.filter((item) => item.isBanned).length} пользователей заблокировано`,
            `${profiles.length} developer-профилей создано`
          ].map((item) => (
            <p className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 font-bold" key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="glass-card rounded-[1.75rem] p-6">
        <h2 className="text-2xl font-black">Принципы админки</h2>
        <ul className="mt-5 grid gap-3 text-sm leading-6 muted">
          <li>• Быстрые решения по заявкам без лишних переходов.</li>
          <li>• Минимум персональных данных на экране.</li>
          <li>• Доступ к чувствительным данным должен логироваться.</li>
          <li>• Хелпер не может назначать роли и менять глобальные настройки.</li>
          <li>• Все действия модерации должны иметь причину и историю.</li>
        </ul>
      </div>
    </section>
  );
}

function SubmissionCard({ submission, onStatus, onNote }: { submission: GameSubmission; onStatus: (id: string, status: GameSubmissionReviewStatus) => void; onNote: (id: string, note: string) => void }) {
  return (
    <article className="surface overflow-hidden rounded-[1.75rem] p-5">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="tag">{submission.reviewStatus}</span>
            <span className="tag">{submission.platform}</span>
            <span className="tag">{submission.genre}</span>
            <span className="tag">{submission.status}</span>
          </div>
          <h2 className="mt-4 text-2xl font-black">{submission.title}</h2>
          <p className="mt-3 max-w-4xl leading-7 muted">{submission.short}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={() => onStatus(submission.id, "approved")}><Check size={17} />Одобрить</button>
          <button type="button" className="btn btn-secondary" onClick={() => onStatus(submission.id, "pending")}>На проверку</button>
          <button type="button" className="btn btn-ghost" onClick={() => onStatus(submission.id, "rejected")}><X size={17} />Отклонить</button>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_19rem]">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4">
          <p className="text-sm font-black text-[var(--accent-2)]">Описание</p>
          <p className="mt-2 leading-7 muted">{submission.full}</p>
          <div className="mt-4 grid gap-2 text-sm muted sm:grid-cols-4">
            <InfoPill label="Views" value={String(submission.activity.views)} />
            <InfoPill label="Wishlist" value={String(submission.activity.wishlistAdds)} />
            <InfoPill label="Feedback" value={String(submission.activity.feedbackCount)} />
            <InfoPill label="Interest" value={`${submission.activity.interestScore}%`} />
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 text-sm leading-7 muted">
          <p><b className="text-[var(--muted-strong)]">Контакт:</b> {submission.contact}</p>
          <p><b className="text-[var(--muted-strong)]">Игра:</b> {submission.gameLink}</p>
          <p><b className="text-[var(--muted-strong)]">Трейлер:</b> {submission.trailerLink || "-"}</p>
          <p><b className="text-[var(--muted-strong)]">Owner:</b> {submission.ownerUserId ?? "-"}</p>
        </div>
      </div>
      <textarea className="input mt-4 min-h-24 resize-y" defaultValue={submission.adminNote} placeholder="Комментарий модератора" onBlur={(event) => onNote(submission.id, event.currentTarget.value)} />
    </article>
  );
}

function TicketCard({ ticket, onStatus, onNote }: { ticket: SupportTicket; onStatus: (id: string, status: SupportTicketStatus) => void; onNote: (id: string, note: string) => void }) {
  return (
    <article className="surface rounded-[1.75rem] p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2"><span className="tag">{ticket.status}</span><span className="tag">{ticket.category}</span><span className="tag">{ticket.priority}</span></div>
          <h2 className="mt-4 text-2xl font-black">{ticket.subject}</h2>
          <p className="mt-3 max-w-4xl leading-7 muted">{ticket.message}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary" onClick={() => onStatus(ticket.id, "open")}>Открыт</button>
          <button type="button" className="btn btn-secondary" onClick={() => onStatus(ticket.id, "inProgress")}>В работе</button>
          <button type="button" className="btn btn-primary" onClick={() => onStatus(ticket.id, "resolved")}><Check size={17} />Закрыть</button>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <InfoPill label="Игрок" value={ticket.name} />
        <InfoPill label="Контакт" value={ticket.contact} />
        <InfoPill label="Дата" value={formatDate(ticket.createdAt)} />
      </div>
      <textarea className="input mt-4 min-h-24 resize-y" defaultValue={ticket.adminNote} placeholder="Ответ или заметка" onBlur={(event) => onNote(ticket.id, event.currentTarget.value)} />
    </article>
  );
}

function UserCard({ user, messageDraft, banDraft, onMessageDraft, onBanDraft, onSend, onBan, onUnban }: { user: UserAccount; messageDraft: string; banDraft: string; onMessageDraft: (value: string) => void; onBanDraft: (value: string) => void; onSend: () => void; onBan: () => void; onUnban: () => void }) {
  return (
    <article className="surface rounded-[1.75rem] p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2"><span className="tag">player</span><span className="tag">{user.playerId}</span><span className="tag">{user.isBanned ? "banned" : "active"}</span></div>
          <h2 className="mt-4 text-2xl font-black" style={{ color: user.nicknameColor }}>{user.displayName}</h2>
          <p className="mt-2 text-sm font-bold muted">@{user.username} • {formatDate(user.createdAt)}</p>
        </div>
        {user.isBanned ? <button type="button" className="btn btn-secondary" onClick={onUnban}><Check size={17} />Разбанить</button> : null}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <InfoPill label="Email" value={user.contact} />
        <InfoPill label="Друзья" value={String(user.friends.length)} />
        <InfoPill label="Библиотека" value={String(user.libraryGameIds.length)} />
        <InfoPill label="Статус" value={user.isVerified ? "verified" : `code ${user.verificationCode}`} />
      </div>
      {user.isBanned ? <div className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--danger)_45%,transparent)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] p-4 text-sm font-bold text-[var(--danger)]">Причина: {user.banReason}</div> : null}
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_18rem]">
        <label className="grid gap-2"><span className="text-sm font-black">Сообщение игроку</span><textarea className="input min-h-28 resize-y" value={messageDraft} placeholder="Что увидит пользователь" onChange={(event) => onMessageDraft(event.currentTarget.value)} /><button type="button" className="btn btn-primary justify-self-start" onClick={onSend}><Mail size={17} />Отправить</button></label>
        <div className="grid gap-2"><span className="text-sm font-black">Модерация</span><input className="input" value={banDraft} placeholder="Причина бана" onChange={(event) => onBanDraft(event.currentTarget.value)} /><button type="button" className="btn btn-ghost" onClick={onBan}><Ban size={17} />Заблокировать</button></div>
      </div>
    </article>
  );
}

function RolesPanel({ profiles }: { profiles: DeveloperProfile[] }) {
  const roles = [
    ["Главный админ", "Полный доступ, роли, настройки, логи, безопасность."],
    ["Админ", "Игры, вакансии, форум, жалобы, пользователи в рамках разрешений."],
    ["Хелпер", "Проверка заявок, тикетов, комментариев без глобальных настроек."],
    ["Разработчик", "Игры, ролики, вакансии, комментарии к своим проектам, статистика."],
    ["Игрок", "Каталог, покупки/скачивания, форум, комментарии, избранное."],
    ["Заблокированный", "Ограниченный просмотр без публикаций и жалоб."
    ]
  ];

  return (
    <section className="grid gap-4">
      <SectionToolbar title="Роли и доступ" description={`Developer-профилей сейчас: ${profiles.length}. Кастомные роли, права и выдача доступов управляются главным админом.`} />
      <div className="grid gap-4 md:grid-cols-2">
        {roles.map(([title, text]) => <article className="surface rounded-[1.5rem] p-5" key={title}><h3 className="text-xl font-black">{title}</h3><p className="mt-2 leading-7 muted">{text}</p></article>)}
      </div>
    </section>
  );
}

function ModerationPanel() {
  return <StaticPanel title="Модерация контента" items={["Фильтр матов в профиле и никнейме уже добавлен в систему аккаунтов.", "Аватарка проходит проверку формата файла и размера изображения.", "Очереди модерации охватывают аватарки, ролики, комментарии, форумные темы и файлы игр.", "Каждое действие админа должно иметь причину и запись в audit-log."]} />;
}

function CurrenciesPanel() {
  return <StaticPanel title="Валюты и языки" icon={<Coins size={22} />} items={["Валюты: USD, EUR, RUB, GBP, PLN, UAH, CNY, JPY, KRW.", "Языки: RU, EN, ES, DE, FR, PL, UK, ZH, JA, KO.", "Админ включает/отключает валюты и языки.", "Разработчик указывает локализации игры, а цены пересчитываются через сервис курсов валют."]} />;
}

function SettingsPanel() {
  return <StaticPanel title="Глобальные настройки" items={["Включение комментариев к вакансиям.", "Политика приватности для админского просмотра данных.", "Минимальный возраст для игры и возрастные рейтинги.", "Дизайн-тема по умолчанию и список доступных тем."]} />;
}

function SecurityPanel() {
  return <StaticPanel title="Безопасность" items={["2FA, восстановление пароля и управление сессиями.", "Лимиты на комментарии, жалобы и отправку заявок.", "Проверка файлов игр на вирусы перед публикацией.", "Логи входов, действий модерации и просмотров чувствительных данных."]} />;
}

function StaticPanel({ title, items, icon }: { title: string; items: string[]; icon?: ReactNode }) {
  return (
    <section className="surface rounded-[1.75rem] p-6">
      <div className="flex items-center gap-3">
        {icon ? <span className="text-[var(--accent-2)]">{icon}</span> : null}
        <h2 className="text-2xl font-black">{title}</h2>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => <p className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4 leading-7 muted" key={item}>{item}</p>)}
      </div>
    </section>
  );
}

function FilterSelect({ value, options, onChange }: { value: string; options: Array<[string, string]>; onChange: (value: string) => void }) {
  return (
    <select className="input min-w-56" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map(([optionValue, optionLabel]) => <option value={optionValue} key={optionValue}>{optionLabel}</option>)}
    </select>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] p-4"><p className="text-xs font-black uppercase text-[var(--muted)]">{label}</p><p className="mt-2 break-words font-bold">{value}</p></div>;
}

function EmptyState({ title }: { title: string }) {
  return <div className="glass-card rounded-[1.5rem] p-8 text-center"><h2 className="text-2xl font-black">{title}</h2></div>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
