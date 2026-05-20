"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  type Language,
  type Translation,
  translations
} from "@/lib/translations";

export type ThemeName = "darkGreen" | "pureDark" | "light";

export type PlayFoundSettings = {
  language: Language;
  theme: ThemeName;
  compactMode: boolean;
  reduceAnimations: boolean;
};

type PlayFoundContextValue = {
  settings: PlayFoundSettings;
  setSetting: <K extends keyof PlayFoundSettings>(
    key: K,
    value: PlayFoundSettings[K]
  ) => void;
  t: Translation;
  wishlistIds: string[];
  wishlistCount: number;
  isWishlisted: (gameId: string) => boolean;
  toggleWishlist: (gameId: string) => boolean;
};

const defaultSettings: PlayFoundSettings = {
  language: "ru",
  theme: "darkGreen",
  compactMode: false,
  reduceAnimations: false
};

const settingsKey = "playfound-settings-v1";
const wishlistKey = "playfound-wishlist-v1";

const PlayFoundContext = createContext<PlayFoundContextValue | null>(null);

function isLanguage(value: unknown): value is Language {
  return value === "ru" || value === "en";
}

function isTheme(value: unknown): value is ThemeName {
  return value === "darkGreen" || value === "pureDark" || value === "light";
}

function sanitizeSettings(value: unknown): PlayFoundSettings {
  if (!value || typeof value !== "object") {
    return defaultSettings;
  }

  const candidate = value as Partial<PlayFoundSettings>;

  return {
    language: isLanguage(candidate.language)
      ? candidate.language
      : defaultSettings.language,
    theme: isTheme(candidate.theme) ? candidate.theme : defaultSettings.theme,
    compactMode:
      typeof candidate.compactMode === "boolean"
        ? candidate.compactMode
        : defaultSettings.compactMode,
    reduceAnimations:
      typeof candidate.reduceAnimations === "boolean"
        ? candidate.reduceAnimations
        : defaultSettings.reduceAnimations
  };
}

function sanitizeWishlist(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function PlayFoundProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PlayFoundSettings>(defaultSettings);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = window.localStorage.getItem(settingsKey);
      const savedWishlist = window.localStorage.getItem(wishlistKey);

      if (savedSettings) {
        setSettings(sanitizeSettings(JSON.parse(savedSettings)));
      }

      if (savedWishlist) {
        setWishlistIds(sanitizeWishlist(JSON.parse(savedWishlist)));
      }
    } catch {
      setSettings(defaultSettings);
      setWishlistIds([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.compact = String(settings.compactMode);
    root.lang = settings.language;
    root.classList.toggle("reduce-motion", settings.reduceAnimations);
  }, [settings]);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(settingsKey, JSON.stringify(settings));
    }
  }, [loaded, settings]);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(wishlistKey, JSON.stringify(wishlistIds));
    }
  }, [loaded, wishlistIds]);

  const setSetting = useCallback(
    <K extends keyof PlayFoundSettings>(key: K, value: PlayFoundSettings[K]) => {
      setSettings((current) => ({
        ...current,
        [key]: value
      }));
    },
    []
  );

  const isWishlisted = useCallback(
    (gameId: string) => wishlistIds.includes(gameId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback((gameId: string) => {
    let added = false;

    setWishlistIds((current) => {
      if (current.includes(gameId)) {
        return current.filter((id) => id !== gameId);
      }

      added = true;
      return [...current, gameId];
    });

    return added;
  }, []);

  const value = useMemo<PlayFoundContextValue>(
    () => ({
      settings,
      setSetting,
      t: translations[settings.language],
      wishlistIds,
      wishlistCount: wishlistIds.length,
      isWishlisted,
      toggleWishlist
    }),
    [isWishlisted, settings, setSetting, toggleWishlist, wishlistIds]
  );

  return (
    <PlayFoundContext.Provider value={value}>
      {children}
    </PlayFoundContext.Provider>
  );
}

export function usePlayFound() {
  const context = useContext(PlayFoundContext);

  if (!context) {
    throw new Error("usePlayFound must be used inside PlayFoundProvider");
  }

  return context;
}
