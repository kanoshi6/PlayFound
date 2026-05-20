import type { Game } from "@/lib/games";
import type { Language } from "@/lib/translations";

export function formatInterest(value: number) {
  return `${value}%`;
}

export function getPrimaryGameLink(game: Game) {
  return game.links[0]?.url ?? `/games/${game.slug}`;
}

export function getLocalizedTags(game: Game, language: Language) {
  return game.tags[language] ?? game.tags.ru;
}

export function getLocalizedList(
  value: Record<Language, string[]>,
  language: Language
) {
  return value[language] ?? value.ru;
}
