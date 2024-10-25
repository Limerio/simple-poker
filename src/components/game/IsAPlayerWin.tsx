import { useGameStore } from "@/stores/game";
import { VICTORY_BY, VictoryBy } from "@/utils/constants";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

const VICTORY_BY_CONTENT: Record<VictoryBy, string> = {
  [VICTORY_BY.FOUR_OF_A_KIND]: "a four of a kind",
  [VICTORY_BY.HIGHEST]: "the highest",
  [VICTORY_BY.POCKET_PAIR]: "a pocket pair",
  [VICTORY_BY.THREE_OF_A_KIND]: "a three of a kind",
} as const;

export const IsAPlayerWin: FC<{ children: ReactNode }> = ({ children }) => {
  const playerWinner = useGameStore((state) => state.winner);
  const info = useGameStore((state) => state.winnerInformation);

  if (playerWinner) {
    return (
      <div className="flex items-center flex-col p-[8.5rem] gap-2">
        <span className="inter-title text-5xl text-white">{playerWinner}</span>
        {info && (
          <p className="text-white inter-text text-2xl">
            Victory with {VICTORY_BY_CONTENT[info.by]}
            <br />
            Value: {info.value} points
          </p>
        )}
      </div>
    );
  }

  return children;
};
