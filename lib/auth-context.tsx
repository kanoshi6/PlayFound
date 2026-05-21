"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export type AuthRole = "player" | "developer" | "admin";
export type DeveloperRequestStatus = "pending" | "approved" | "rejected";
export type FriendRequestStatus = "incoming" | "outgoing";

export type AdminMessage = {
  id: string;
  text: string;
  createdAt: string;
};

export type FriendRequest = {
  id: string;
  fromUserId: string;
  toUserId: string;
  createdAt: string;
};

export type UserAccount = {
  id: string;
  playerId: string;
  username: string;
  displayName: string;
  contact: string;
  password: string;
  isVerified: boolean;
  verificationCode: string;
  verifiedAt?: string;
  isBanned: boolean;
  banReason?: string;
  adminMessages: AdminMessage[];
  avatarUrl: string;
  nicknameColor: string;
  about: string;
  libraryGameIds: string[];
  friends: string[];
  incomingFriendRequests: FriendRequest[];
  outgoingFriendRequests: FriendRequest[];
  createdAt: string;
};

export type AuthSession = {
  userId: string;
  username: string;
  displayName: string;
  activeRole: AuthRole;
  developerProfileId?: string;
  loggedAt: string;
};

export type DeveloperProfile = {
  id: string;
  ownerUserId: string;
  displayName: string;
  slug: string;
  createdAt: string;
};

export type DeveloperRequest = {
  id: string;
  ownerUserId: string;
  displayName: string;
  contact: string;
  status: DeveloperRequestStatus;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
};

type AuthResult =
  | { ok: true; session: AuthSession }
  | { ok: false; error: AuthError };

type RegisterResult =
  | { ok: true; user: UserAccount; code: string }
  | { ok: false; error: AuthError };

type VerifyResult =
  | { ok: true; session: AuthSession }
  | { ok: false; error: AuthError };

type ProfileUpdateResult =
  | { ok: true; user: UserAccount; session: AuthSession | null }
  | { ok: false; error: AuthError };

type FriendResult =
  | { ok: true; users: UserAccount[] }
  | { ok: false; error: AuthError };

export type AuthError =
  | "missingFields"
  | "usernameTaken"
  | "invalidCredentials"
  | "notAuthenticated"
  | "invalidCode"
  | "accountNotVerified"
  | "accountBanned"
  | "developerRequestExists"
  | "friendNotFound"
  | "friendSelf"
  | "friendAlreadyExists"
  | "friendRequestExists"
  | "badWords"
  | "invalidAvatar";

type AuthContextValue = {
  loaded: boolean;
  session: AuthSession | null;
  currentUser: UserAccount | null;
  developerProfile: DeveloperProfile | null;
  developerRequest: DeveloperRequest | null;
  login: (username: string, password: string) => AuthResult;
  register: (input: {
    username: string;
    displayName: string;
    contact: string;
    password: string;
  }) => RegisterResult;
  verifyAccount: (username: string, code: string) => VerifyResult;
  logout: () => void;
  becomeDeveloper: () => DeveloperProfile | null;
  requestDeveloperAccess: () => DeveloperRequest | null;
  getDeveloperProfileForUser: (userId: string) => DeveloperProfile | null;
  updateProfile: (input: {
    displayName: string;
    about: string;
    avatarUrl: string;
    nicknameColor: string;
  }) => ProfileUpdateResult;
  sendFriendRequestByPlayerId: (playerId: string) => FriendResult;
  acceptFriendRequest: (requestId: string) => FriendResult;
  declineFriendRequest: (requestId: string) => FriendResult;
  refreshAuthData: () => void;
};

const adminUsername = "PlayFoundadmin";
const adminPassword = "14886769";
const usersKey = "playfound-users-v2";
const legacyUsersKey = "playfound-users-v1";
const sessionKey = "playfound-auth-session-v1";
const developerProfilesKey = "playfound-developer-profiles-v1";
const developerRequestsKey = "playfound-developer-requests-v1";

const blockedWords = [
  "хуй",
  "пизд",
  "еба",
  "ебл",
  "сука",
  "блять",
  "бляд",
  "мудак",
  "пидор",
  "nigger",
  "faggot"
];

const allowedNicknameColors = [
  "#9af2bf",
  "#38d574",
  "#5bd9d0",
  "#f0bc5e",
  "#ff8ab0",
  "#b49cff",
  "#ffffff"
];

const AuthContext = createContext<AuthContextValue | null>(null);

function isBrowser() {
  return typeof window !== "undefined";
}

function readRawCollection<T>(key: string): T[] {
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
  if (isBrowser()) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function readCollection<T>(key: string): T[] {
  return readRawCollection<T>(key);
}

function readSession() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(sessionKey);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  if (!isBrowser()) {
    return;
  }

  if (session) {
    window.localStorage.setItem(sessionKey, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(sessionKey);
  }
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function createPlayerId() {
  return `PF-${Math.floor(10000000 + Math.random() * 90000000)}`;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function clean(value: string) {
  return value.trim();
}

function hasBlockedWords(value: string) {
  const normalized = value.toLowerCase().replace(/[\s._-]+/g, "");
  return blockedWords.some((word) => normalized.includes(word));
}

function isValidAvatarUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  if (/^data:image\/(png|jpg|jpeg|webp|gif);base64,/i.test(trimmed)) {
    return trimmed.length < 1_200_000;
  }

  if (!/^https?:\/\//i.test(trimmed)) {
    return false;
  }

  return /\.(png|jpg|jpeg|webp|gif)(\?.*)?$/i.test(trimmed);
}

function safeNicknameColor(value: string) {
  return allowedNicknameColors.includes(value) ? value : "#9af2bf";
}

function normalizeFriendRequests(value: unknown): FriendRequest[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is FriendRequest =>
          Boolean(item) &&
          typeof item === "object" &&
          typeof (item as FriendRequest).id === "string" &&
          typeof (item as FriendRequest).fromUserId === "string" &&
          typeof (item as FriendRequest).toUserId === "string"
      )
    : [];
}

function normalizeUser(user: Partial<UserAccount> & Pick<UserAccount, "id" | "username" | "displayName" | "contact" | "password" | "createdAt">): UserAccount {
  return {
    ...user,
    id: user.id,
    playerId: user.playerId ?? createPlayerId(),
    username: user.username,
    displayName: user.displayName,
    contact: user.contact,
    password: user.password,
    isVerified: user.isVerified ?? true,
    verificationCode: user.verificationCode ?? createCode(),
    isBanned: user.isBanned ?? false,
    banReason: user.banReason,
    adminMessages: user.adminMessages ?? [],
    avatarUrl: user.avatarUrl ?? "",
    nicknameColor: safeNicknameColor(user.nicknameColor ?? "#9af2bf"),
    about: user.about ?? "",
    libraryGameIds: Array.isArray(user.libraryGameIds) ? user.libraryGameIds : [],
    friends: Array.isArray(user.friends) ? user.friends : [],
    incomingFriendRequests: normalizeFriendRequests(user.incomingFriendRequests),
    outgoingFriendRequests: normalizeFriendRequests(user.outgoingFriendRequests),
    createdAt: user.createdAt
  };
}

function dedupePlayerIds(users: UserAccount[]) {
  const used = new Set<string>();

  return users.map((user) => {
    let playerId = user.playerId;

    while (!playerId || used.has(playerId)) {
      playerId = createPlayerId();
    }

    used.add(playerId);
    return { ...user, playerId };
  });
}

export function getUsers() {
  const users = readCollection<UserAccount>(usersKey);

  if (users.length > 0) {
    const normalized = dedupePlayerIds(users.map(normalizeUser));
    writeCollection(usersKey, normalized);
    return normalized;
  }

  const legacy = readRawCollection<UserAccount>(legacyUsersKey);

  if (legacy.length > 0) {
    const migrated = dedupePlayerIds(legacy.map(normalizeUser));
    writeCollection(usersKey, migrated);
    return migrated;
  }

  return [];
}

function saveUsers(users: UserAccount[]) {
  writeCollection(usersKey, dedupePlayerIds(users.map(normalizeUser)));
}

export function getDeveloperProfiles() {
  return readCollection<DeveloperProfile>(developerProfilesKey);
}

function saveDeveloperProfiles(profiles: DeveloperProfile[]) {
  writeCollection(developerProfilesKey, profiles);
}

export function getDeveloperRequests() {
  return readCollection<DeveloperRequest>(developerRequestsKey).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function saveDeveloperRequests(requests: DeveloperRequest[]) {
  writeCollection(developerRequestsKey, requests);
}

export function updateDeveloperRequest(
  id: string,
  patch: Partial<Pick<DeveloperRequest, "status" | "adminNote">>
) {
  const now = new Date().toISOString();
  const next = getDeveloperRequests().map((request) =>
    request.id === id ? { ...request, ...patch, updatedAt: now } : request
  );
  saveDeveloperRequests(next);
  return next;
}

function ensureDeveloperProfile(user: UserAccount) {
  const profiles = getDeveloperProfiles();
  const existingProfile = profiles.find((profile) => profile.ownerUserId === user.id);

  if (existingProfile) {
    return existingProfile;
  }

  const profile: DeveloperProfile = {
    id: createId("developer"),
    ownerUserId: user.id,
    displayName: `${user.displayName} Разраб`,
    slug: slugify(`${user.displayName}-dev`) || createId("developer"),
    createdAt: new Date().toISOString()
  };

  saveDeveloperProfiles([profile, ...profiles]);
  return profile;
}

export function approveDeveloperRequest(id: string) {
  const requests = getDeveloperRequests();
  const request = requests.find((item) => item.id === id);

  if (!request) {
    return { requests, profile: null };
  }

  const user = getUsers().find((item) => item.id === request.ownerUserId);
  const profile = user ? ensureDeveloperProfile(user) : null;
  const nextRequests = updateDeveloperRequest(id, { status: "approved" });
  return { requests: nextRequests, profile };
}

export function banUser(userId: string, banReason: string) {
  const users = getUsers().map((user) =>
    user.id === userId ? { ...user, isBanned: true, banReason } : user
  );
  saveUsers(users);
  return users;
}

export function unbanUser(userId: string) {
  const users = getUsers().map((user) =>
    user.id === userId
      ? { ...user, isBanned: false, banReason: undefined }
      : user
  );
  saveUsers(users);
  return users;
}

export function sendAdminMessage(userId: string, text: string) {
  const message = {
    id: createId("message"),
    text,
    createdAt: new Date().toISOString()
  };
  const users = getUsers().map((user) =>
    user.id === userId
      ? { ...user, adminMessages: [message, ...(user.adminMessages ?? [])] }
      : user
  );
  saveUsers(users);
  return users;
}

function createSession(
  user: UserAccount,
  developerProfile?: DeveloperProfile | null
): AuthSession {
  return {
    userId: user.id,
    username: user.username,
    displayName: developerProfile?.displayName ?? user.displayName,
    activeRole: developerProfile ? "developer" : "player",
    developerProfileId: developerProfile?.id,
    loggedAt: new Date().toISOString()
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [developerProfiles, setDeveloperProfiles] = useState<DeveloperProfile[]>([]);
  const [developerRequests, setDeveloperRequests] = useState<DeveloperRequest[]>([]);

  const refreshAuthData = useCallback(() => {
    setUsers(getUsers());
    setDeveloperProfiles(getDeveloperProfiles());
    setDeveloperRequests(getDeveloperRequests());
  }, []);

  useEffect(() => {
    setSession(readSession());
    refreshAuthData();
    setLoaded(true);
  }, [refreshAuthData]);

  const persistSession = useCallback((nextSession: AuthSession | null) => {
    setSession(nextSession);
    writeSession(nextSession);
  }, []);

  const getDeveloperProfileForUser = useCallback(
    (userId: string) =>
      developerProfiles.find((profile) => profile.ownerUserId === userId) ?? null,
    [developerProfiles]
  );

  const login = useCallback(
    (usernameValue: string, passwordValue: string): AuthResult => {
      const username = clean(usernameValue);
      const password = passwordValue;

      if (!username || !password) {
        return { ok: false, error: "missingFields" };
      }

      if (username === adminUsername && password === adminPassword) {
        const adminSession: AuthSession = {
          userId: "admin",
          username: adminUsername,
          displayName: "PlayFound Admin",
          activeRole: "admin",
          loggedAt: new Date().toISOString()
        };
        persistSession(adminSession);
        return { ok: true, session: adminSession };
      }

      const freshUsers = getUsers();
      const user = freshUsers.find((candidate) => candidate.username === username);

      if (!user || user.password !== password) {
        return { ok: false, error: "invalidCredentials" };
      }

      if (user.isBanned) {
        return { ok: false, error: "accountBanned" };
      }

      if (!user.isVerified) {
        return { ok: false, error: "accountNotVerified" };
      }

      const profile =
        getDeveloperProfiles().find((item) => item.ownerUserId === user.id) ?? null;
      const nextSession = createSession(user, profile);
      setUsers(freshUsers);
      persistSession(nextSession);
      return { ok: true, session: nextSession };
    },
    [persistSession]
  );

  const register = useCallback(
    (input: {
      username: string;
      displayName: string;
      contact: string;
      password: string;
    }): RegisterResult => {
      const username = clean(input.username);
      const displayName = clean(input.displayName);
      const contact = clean(input.contact);
      const password = input.password;

      if (!username || !displayName || !contact || !password) {
        return { ok: false, error: "missingFields" };
      }

      if (hasBlockedWords(username) || hasBlockedWords(displayName)) {
        return { ok: false, error: "badWords" };
      }

      const freshUsers = getUsers();
      const usernameTaken =
        username === adminUsername ||
        freshUsers.some((candidate) => candidate.username === username);

      if (usernameTaken) {
        return { ok: false, error: "usernameTaken" };
      }

      const now = new Date().toISOString();
      const user: UserAccount = {
        id: createId("user"),
        playerId: createPlayerId(),
        username,
        displayName,
        contact,
        password,
        isVerified: false,
        verificationCode: createCode(),
        isBanned: false,
        adminMessages: [],
        avatarUrl: "",
        nicknameColor: "#9af2bf",
        about: "",
        libraryGameIds: [],
        friends: [],
        incomingFriendRequests: [],
        outgoingFriendRequests: [],
        createdAt: now
      };

      const nextUsers = [user, ...freshUsers];
      saveUsers(nextUsers);
      setUsers(nextUsers);
      return { ok: true, user, code: user.verificationCode };
    },
    []
  );

  const verifyAccount = useCallback(
    (usernameValue: string, codeValue: string): VerifyResult => {
      const username = clean(usernameValue);
      const code = clean(codeValue);
      const freshUsers = getUsers();
      const user = freshUsers.find((candidate) => candidate.username === username);

      if (!user || !code) {
        return { ok: false, error: "missingFields" };
      }

      if (user.verificationCode !== code) {
        return { ok: false, error: "invalidCode" };
      }

      if (user.isBanned) {
        return { ok: false, error: "accountBanned" };
      }

      const verifiedUser: UserAccount = {
        ...user,
        isVerified: true,
        verifiedAt: new Date().toISOString()
      };

      const nextUsers = freshUsers.map((candidate) =>
        candidate.id === user.id ? verifiedUser : candidate
      );
      saveUsers(nextUsers);
      setUsers(nextUsers);

      const nextSession = createSession(verifiedUser);
      persistSession(nextSession);
      return { ok: true, session: nextSession };
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    persistSession(null);
  }, [persistSession]);

  const becomeDeveloper = useCallback(() => {
    if (!session || session.activeRole === "admin") {
      return null;
    }

    const user = getUsers().find((item) => item.id === session.userId);

    if (!user) {
      return null;
    }

    const profile = ensureDeveloperProfile(user);
    const nextSession = createSession(user, profile);
    setDeveloperProfiles(getDeveloperProfiles());
    persistSession(nextSession);
    return profile;
  }, [persistSession, session]);

  const requestDeveloperAccess = useCallback(() => {
    const profile = becomeDeveloper();

    if (!profile || !session) {
      return null;
    }

    const now = new Date().toISOString();
    const request: DeveloperRequest = {
      id: createId("developer-request"),
      ownerUserId: session.userId,
      displayName: profile.displayName,
      contact: getUsers().find((user) => user.id === session.userId)?.contact ?? "",
      status: "approved",
      adminNote: "Создано автоматически в рабочей версии.",
      createdAt: now,
      updatedAt: now
    };

    const nextRequests = [request, ...getDeveloperRequests()];
    saveDeveloperRequests(nextRequests);
    setDeveloperRequests(nextRequests);
    return request;
  }, [becomeDeveloper, session]);

  const updateProfile = useCallback(
    (input: {
      displayName: string;
      about: string;
      avatarUrl: string;
      nicknameColor: string;
    }): ProfileUpdateResult => {
      if (!session || session.activeRole === "admin") {
        return { ok: false, error: "notAuthenticated" };
      }

      const displayName = clean(input.displayName);
      const about = clean(input.about);
      const avatarUrl = clean(input.avatarUrl);
      const nicknameColor = safeNicknameColor(input.nicknameColor);

      if (!displayName) {
        return { ok: false, error: "missingFields" };
      }

      if (hasBlockedWords(displayName) || hasBlockedWords(about)) {
        return { ok: false, error: "badWords" };
      }

      if (!isValidAvatarUrl(avatarUrl)) {
        return { ok: false, error: "invalidAvatar" };
      }

      const freshUsers = getUsers();
      const current = freshUsers.find((user) => user.id === session.userId);

      if (!current) {
        return { ok: false, error: "notAuthenticated" };
      }

      const updatedUser: UserAccount = {
        ...current,
        displayName,
        about,
        avatarUrl,
        nicknameColor
      };

      const nextUsers = freshUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      saveUsers(nextUsers);
      setUsers(nextUsers);

      let nextSession: AuthSession | null = session;
      const profile = getDeveloperProfiles().find(
        (item) => item.ownerUserId === updatedUser.id
      );

      if (profile) {
        const updatedProfile = { ...profile, displayName: `${displayName} Разраб` };
        const nextProfiles = getDeveloperProfiles().map((item) =>
          item.id === profile.id ? updatedProfile : item
        );
        saveDeveloperProfiles(nextProfiles);
        setDeveloperProfiles(nextProfiles);
        nextSession = createSession(updatedUser, updatedProfile);
      } else {
        nextSession = createSession(updatedUser);
      }

      persistSession(nextSession);
      return { ok: true, user: updatedUser, session: nextSession };
    },
    [persistSession, session]
  );

  const sendFriendRequestByPlayerId = useCallback(
    (playerIdValue: string): FriendResult => {
      if (!session || session.activeRole === "admin") {
        return { ok: false, error: "notAuthenticated" };
      }

      const playerId = clean(playerIdValue).toUpperCase();
      const freshUsers = getUsers();
      const from = freshUsers.find((user) => user.id === session.userId);
      const to = freshUsers.find((user) => user.playerId.toUpperCase() === playerId);

      if (!from) {
        return { ok: false, error: "notAuthenticated" };
      }

      if (!to) {
        return { ok: false, error: "friendNotFound" };
      }

      if (from.id === to.id) {
        return { ok: false, error: "friendSelf" };
      }

      if (from.friends.includes(to.id)) {
        return { ok: false, error: "friendAlreadyExists" };
      }

      const requestExists =
        from.outgoingFriendRequests.some((request) => request.toUserId === to.id) ||
        to.incomingFriendRequests.some((request) => request.fromUserId === from.id);

      if (requestExists) {
        return { ok: false, error: "friendRequestExists" };
      }

      const request: FriendRequest = {
        id: createId("friend"),
        fromUserId: from.id,
        toUserId: to.id,
        createdAt: new Date().toISOString()
      };

      const nextUsers = freshUsers.map((user) => {
        if (user.id === from.id) {
          return {
            ...user,
            outgoingFriendRequests: [request, ...user.outgoingFriendRequests]
          };
        }

        if (user.id === to.id) {
          return {
            ...user,
            incomingFriendRequests: [request, ...user.incomingFriendRequests]
          };
        }

        return user;
      });

      saveUsers(nextUsers);
      setUsers(nextUsers);
      return { ok: true, users: nextUsers };
    },
    [session]
  );

  const acceptFriendRequest = useCallback(
    (requestId: string): FriendResult => {
      if (!session || session.activeRole === "admin") {
        return { ok: false, error: "notAuthenticated" };
      }

      const freshUsers = getUsers();
      const current = freshUsers.find((user) => user.id === session.userId);
      const request = current?.incomingFriendRequests.find(
        (item) => item.id === requestId
      );

      if (!current || !request) {
        return { ok: false, error: "friendNotFound" };
      }

      const nextUsers = freshUsers.map((user) => {
        if (user.id === request.toUserId) {
          return {
            ...user,
            friends: Array.from(new Set([...user.friends, request.fromUserId])),
            incomingFriendRequests: user.incomingFriendRequests.filter(
              (item) => item.id !== request.id
            )
          };
        }

        if (user.id === request.fromUserId) {
          return {
            ...user,
            friends: Array.from(new Set([...user.friends, request.toUserId])),
            outgoingFriendRequests: user.outgoingFriendRequests.filter(
              (item) => item.id !== request.id
            )
          };
        }

        return user;
      });

      saveUsers(nextUsers);
      setUsers(nextUsers);
      return { ok: true, users: nextUsers };
    },
    [session]
  );

  const declineFriendRequest = useCallback(
    (requestId: string): FriendResult => {
      if (!session || session.activeRole === "admin") {
        return { ok: false, error: "notAuthenticated" };
      }

      const freshUsers = getUsers();
      const current = freshUsers.find((user) => user.id === session.userId);
      const request = current?.incomingFriendRequests.find(
        (item) => item.id === requestId
      );

      if (!current || !request) {
        return { ok: false, error: "friendNotFound" };
      }

      const nextUsers = freshUsers.map((user) => {
        if (user.id === request.toUserId) {
          return {
            ...user,
            incomingFriendRequests: user.incomingFriendRequests.filter(
              (item) => item.id !== request.id
            )
          };
        }

        if (user.id === request.fromUserId) {
          return {
            ...user,
            outgoingFriendRequests: user.outgoingFriendRequests.filter(
              (item) => item.id !== request.id
            )
          };
        }

        return user;
      });

      saveUsers(nextUsers);
      setUsers(nextUsers);
      return { ok: true, users: nextUsers };
    },
    [session]
  );

  const developerProfile = useMemo(() => {
    if (!session?.developerProfileId) {
      return null;
    }

    return (
      developerProfiles.find(
        (profile) => profile.id === session.developerProfileId
      ) ?? null
    );
  }, [developerProfiles, session?.developerProfileId]);

  const developerRequest = useMemo(() => {
    if (!session) {
      return null;
    }

    return (
      developerRequests.find(
        (request) =>
          request.ownerUserId === session.userId && request.status === "pending"
      ) ?? null
    );
  }, [developerRequests, session]);

  const currentUser = useMemo(() => {
    if (!session || session.activeRole === "admin") {
      return null;
    }

    return users.find((user) => user.id === session.userId) ?? null;
  }, [session, users]);

  const value = useMemo<AuthContextValue>(
    () => ({
      loaded,
      session,
      currentUser,
      developerProfile,
      developerRequest,
      login,
      register,
      verifyAccount,
      logout,
      becomeDeveloper,
      requestDeveloperAccess,
      getDeveloperProfileForUser,
      updateProfile,
      sendFriendRequestByPlayerId,
      acceptFriendRequest,
      declineFriendRequest,
      refreshAuthData
    }),
    [
      acceptFriendRequest,
      becomeDeveloper,
      currentUser,
      declineFriendRequest,
      developerProfile,
      developerRequest,
      getDeveloperProfileForUser,
      loaded,
      login,
      logout,
      refreshAuthData,
      register,
      requestDeveloperAccess,
      sendFriendRequestByPlayerId,
      session,
      updateProfile,
      verifyAccount
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
