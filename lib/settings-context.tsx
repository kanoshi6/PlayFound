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
import {
  type Language,
  type Translation,
  translations
} from "@/lib/translations";

export type ThemeName =
  | "darkGreen"
  | "pureDark"
  | "light"
  | "streetStyle"
  | "pixel90s"
  | "darkNeon"
  | "fantasyScroll"
  | "arcadeClub"
  | "horrorVhs"
  | "softIndie";

export type Currency = "USD" | "EUR" | "RUB" | "GBP" | "PLN" | "UAH" | "CNY" | "JPY" | "KRW";
export type MarketLanguage = "ru" | "en" | "es" | "de" | "fr" | "pl" | "uk" | "zh" | "ja" | "ko";

export type PlayFoundSettings = {
  language: Language;
  marketLanguage: MarketLanguage;
  currency: Currency;
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
  formatPrice: (priceType: "free" | "paid", seed?: number) => string;
};

const defaultSettings: PlayFoundSettings = {
  language: "ru",
  marketLanguage: "ru",
  currency: "RUB",
  theme: "darkGreen",
  compactMode: false,
  reduceAnimations: false
};

const settingsKey = "playfound-settings-v2";
const wishlistKey = "playfound-wishlist-v1";

const currencies: Currency[] = ["USD", "EUR", "RUB", "GBP", "PLN", "UAH", "CNY", "JPY", "KRW"];
const marketLanguages: MarketLanguage[] = ["ru", "en", "es", "de", "fr", "pl", "uk", "zh", "ja", "ko"];
const themes: ThemeName[] = [
  "darkGreen",
  "pureDark",
  "light",
  "streetStyle",
  "pixel90s",
  "darkNeon",
  "fantasyScroll",
  "arcadeClub",
  "horrorVhs",
  "softIndie"
];

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  RUB: 92,
  GBP: 0.79,
  PLN: 3.95,
  UAH: 40,
  CNY: 7.2,
  JPY: 155,
  KRW: 1370
};

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  RUB: "₽",
  GBP: "£",
  PLN: "zł",
  UAH: "₴",
  CNY: "¥",
  JPY: "¥",
  KRW: "₩"
};

const PlayFoundContext = createContext<PlayFoundContextValue | null>(null);

function isLanguage(value: unknown): value is Language {
  return value === "ru" || value === "en";
}

function isMarketLanguage(value: unknown): value is MarketLanguage {
  return typeof value === "string" && marketLanguages.includes(value as MarketLanguage);
}

function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && currencies.includes(value as Currency);
}

function isTheme(value: unknown): value is ThemeName {
  return typeof value === "string" && themes.includes(value as ThemeName);
}

function sanitizeSettings(value: unknown): PlayFoundSettings {
  if (!value || typeof value !== "object") {
    return defaultSettings;
  }

  const candidate = value as Partial<PlayFoundSettings>;

  return {
    language: isLanguage(candidate.language) ? candidate.language : defaultSettings.language,
    marketLanguage: isMarketLanguage(candidate.marketLanguage)
      ? candidate.marketLanguage
      : defaultSettings.marketLanguage,
    currency: isCurrency(candidate.currency) ? candidate.currency : defaultSettings.currency,
    theme: isTheme(candidate.theme) ? candidate.theme : defaultSettings.theme,
    compactMode: typeof candidate.compactMode === "boolean" ? candidate.compactMode : defaultSettings.compactMode,
    reduceAnimations:
      typeof candidate.reduceAnimations === "boolean" ? candidate.reduceAnimations : defaultSettings.reduceAnimations
  };
}

function sanitizeWishlist(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function PlayFoundProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PlayFoundSettings>(defaultSettings);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = window.localStorage.getItem(settingsKey) ?? window.localStorage.getItem("playfound-settings-v1");
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
    root.dataset.currency = settings.currency;
    root.dataset.marketLanguage = settings.marketLanguage;
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

  const formatPrice = useCallback(
    (priceType: "free" | "paid", seed = 1) => {
      if (priceType === "free") {
        return settings.language === "ru" ? "Бесплатно" : "Free";
      }

      const usd = 4.99 + (seed % 5) * 2.5;
      const converted = Math.max(1, Math.round(usd * rates[settings.currency]));
      const suffix = ["PLN", "UAH"].includes(settings.currency) ? ` ${currencySymbols[settings.currency]}` : "";
      const prefix = ["USD", "EUR", "RUB", "GBP", "CNY", "JPY", "KRW"].includes(settings.currency)
        ? currencySymbols[settings.currency]
        : "";

      return `${prefix}${converted}${suffix}`;
    },
    [settings.currency, settings.language]
  );

  const value = useMemo<PlayFoundContextValue>(
    () => ({
      settings,
      setSetting,
      t: translations[settings.language],
      wishlistIds,
      wishlistCount: wishlistIds.length,
      isWishlisted,
      toggleWishlist,
      formatPrice
    }),
    [formatPrice, isWishlisted, settings, setSetting, toggleWishlist, wishlistIds]
  );

  return <PlayFoundContext.Provider value={value}>{children}</PlayFoundContext.Provider>;
}

export function usePlayFound() {
  const context = useContext(PlayFoundContext);

  if (!context) {
    throw new Error("usePlayFound must be used inside PlayFoundProvider");
  }

  return context;
}
