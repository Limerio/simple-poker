import { cn } from "@/utils/functions";
import { PlayingCard } from "@/utils/types";
import { FC } from "react";

export const GameCard: FC<{ card: PlayingCard }> = ({ card }) => (
  <div
    className={cn(
      "select-none inline-flex items-center justify-center w-16 h-24 m-1 rounded-lg shadow-md bg-white border border-gray-200",
      card.suit === "♥" || card.suit === "♦" ? "text-red-500" : "text-black"
    )}
  >
    <div className="text-center">
      <div className="text-lg font-bold">{card.rank}</div>
      <div className="text-2xl">{card.suit}</div>
    </div>
  </div>
);
