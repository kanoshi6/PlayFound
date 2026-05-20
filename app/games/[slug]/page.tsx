import { notFound } from "next/navigation";
import { GameDetailPage } from "@/components/pages/GameDetailPage";
import { games, getGameBySlug } from "@/lib/games";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return <GameDetailPage game={game} />;
}
