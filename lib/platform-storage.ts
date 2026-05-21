export type GameSubmissionReviewStatus = "pending" | "approved" | "rejected";
export type SupportTicketStatus = "open" | "inProgress" | "resolved";
export type SupportTicketPriority = "normal" | "high";
export type SupportTicketCategory =
  | "account"
  | "wishlist"
  | "gamePage"
  | "developer"
  | "other";

export type SubmissionActivity = {
  views: number;
  wishlistAdds: number;
  feedbackCount: number;
  interestScore: number;
  lastEvents: string[];
};

export type GameSubmission = {
  id: string;
  title: string;
  genre: string;
  platform: string;
  status: string;
  gameLink: string;
  trailerLink: string;
  short: string;
  full: string;
  contact: string;
  screenshots: string;
  ownerUserId?: string;
  developerProfileId?: string;
  activity: SubmissionActivity;
  reviewStatus: GameSubmissionReviewStatus;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
};

export type SupportTicket = {
  id: string;
  name: string;
  contact: string;
  category: SupportTicketCategory;
  priority: SupportTicketPriority;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
};

export type GameSubmissionInput = Omit<
  GameSubmission,
  "id" | "reviewStatus" | "adminNote" | "createdAt" | "updatedAt" | "activity"
>;

export type SupportTicketInput = Omit<
  SupportTicket,
  "id" | "status" | "adminNote" | "createdAt" | "updatedAt"
>;

const submissionsKey = "playfound-game-submissions-v1";
const ticketsKey = "playfound-support-tickets-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function readCollection<T>(key: string): T[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeCollection<T>(key: string, value: T[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createSubmissionActivity(title: string): SubmissionActivity {
  const seed = title
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  return {
    views: 120 + (seed % 860),
    wishlistAdds: 12 + (seed % 160),
    feedbackCount: 2 + (seed % 34),
    interestScore: 48 + (seed % 49),
    lastEvents: [
      "Карточка добавлена в очередь модерации",
      "Игроки начали открывать страницу заявки",
      "Собраны первые сигналы интереса"
    ]
  };
}

export function getGameSubmissions() {
  return readCollection<GameSubmission>(submissionsKey).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createGameSubmission(input: GameSubmissionInput) {
  const now = new Date().toISOString();
  const submission: GameSubmission = {
    ...input,
    id: createId("game"),
    activity: createSubmissionActivity(input.title),
    reviewStatus: "pending",
    adminNote: "",
    createdAt: now,
    updatedAt: now
  };

  writeCollection(submissionsKey, [submission, ...getGameSubmissions()]);
  return submission;
}

export function updateGameSubmission(
  id: string,
  patch: Partial<Pick<GameSubmission, "reviewStatus" | "adminNote">>
) {
  const now = new Date().toISOString();
  const next = getGameSubmissions().map((submission) =>
    submission.id === id
      ? {
          ...submission,
          ...patch,
          updatedAt: now
        }
      : submission
  );

  writeCollection(submissionsKey, next);
  return next;
}

export function getSupportTickets() {
  return readCollection<SupportTicket>(ticketsKey).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getGameSubmissionsByDeveloper(developerProfileId: string) {
  return getGameSubmissions().filter(
    (submission) => submission.developerProfileId === developerProfileId
  );
}

export function createSupportTicket(input: SupportTicketInput) {
  const now = new Date().toISOString();
  const ticket: SupportTicket = {
    ...input,
    id: createId("ticket"),
    status: "open",
    adminNote: "",
    createdAt: now,
    updatedAt: now
  };

  writeCollection(ticketsKey, [ticket, ...getSupportTickets()]);
  return ticket;
}

export function updateSupportTicket(
  id: string,
  patch: Partial<Pick<SupportTicket, "status" | "adminNote" | "priority">>
) {
  const now = new Date().toISOString();
  const next = getSupportTickets().map((ticket) =>
    ticket.id === id
      ? {
          ...ticket,
          ...patch,
          updatedAt: now
        }
      : ticket
  );

  writeCollection(ticketsKey, next);
  return next;
}

export function createDemoAdminData() {
  if (getGameSubmissions().length === 0) {
    createGameSubmission({
      title: "Demo Rift",
      genre: "roguelike",
      platform: "PC",
      status: "demo",
      gameLink: "https://example.com/demo-rift",
      trailerLink: "https://example.com/trailer",
      short: "A  developer request for checking the PlayFound admin queue.",
      full: "Developer request for the PlayFound review queue.",
      contact: "demo@playfound.ru",
      screenshots: "https://example.com/screens"
    });
  }

  if (getSupportTickets().length === 0) {
    createSupportTicket({
      name: "Player One",
      contact: "player@example.com",
      category: "wishlist",
      priority: "normal",
      subject: "Wishlist sync question",
      message:
        "I added a game to wishlist and want to understand whether it will sync between devices later."
    });
  }
}

export type ClipComment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
};

export type ClipActivity = {
  clipId: string;
  gameId: string;
  gameTitle: string;
  clipTitle: string;
  likedBy: string[];
  savedBy: string[];
  comments: ClipComment[];
  updatedAt: string;
};

const clipActivityKey = "playfound-clip-activity-v1";

export function getClipActivities() {
  return readCollection<ClipActivity>(clipActivityKey);
}

export function getClipActivity(clipId: string, fallback: Omit<ClipActivity, "likedBy" | "savedBy" | "comments" | "updatedAt">) {
  const existing = getClipActivities().find((activity) => activity.clipId === clipId);
  if (existing) {
    return existing;
  }

  return {
    ...fallback,
    likedBy: [],
    savedBy: [],
    comments: [],
    updatedAt: new Date().toISOString()
  } satisfies ClipActivity;
}

function upsertClipActivity(activity: ClipActivity) {
  const activities = getClipActivities();
  const next = [activity, ...activities.filter((item) => item.clipId !== activity.clipId)];
  writeCollection(clipActivityKey, next);
  return activity;
}

export function toggleClipLike(activity: ClipActivity, userId: string) {
  const liked = activity.likedBy.includes(userId);
  return upsertClipActivity({
    ...activity,
    likedBy: liked ? activity.likedBy.filter((id) => id !== userId) : [...activity.likedBy, userId],
    updatedAt: new Date().toISOString()
  });
}

export function toggleClipSave(activity: ClipActivity, userId: string) {
  const saved = activity.savedBy.includes(userId);
  return upsertClipActivity({
    ...activity,
    savedBy: saved ? activity.savedBy.filter((id) => id !== userId) : [...activity.savedBy, userId],
    updatedAt: new Date().toISOString()
  });
}

export function addClipComment(activity: ClipActivity, userId: string, userName: string, text: string) {
  const cleanText = text.trim();
  if (!cleanText) {
    return activity;
  }

  return upsertClipActivity({
    ...activity,
    comments: [
      {
        id: createId("clip-comment"),
        userId,
        userName,
        text: cleanText.slice(0, 280),
        createdAt: new Date().toISOString()
      },
      ...activity.comments
    ],
    updatedAt: new Date().toISOString()
  });
}

export function getClipActivitiesForUser(userId: string) {
  return getClipActivities().filter(
    (activity) =>
      activity.likedBy.includes(userId) ||
      activity.savedBy.includes(userId) ||
      activity.comments.some((comment) => comment.userId === userId)
  );
}
