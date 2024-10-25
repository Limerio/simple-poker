import { Positions, POSITIONS } from "@/utils/constants";
import { cn } from "@/utils/functions";
import { PlayingCard } from "@/utils/types";
import { ReactNode } from "@tanstack/react-router";
import { motion, Variants } from "framer-motion";
import { FC } from "react";

const ITEM_APPARE_BOTTOM: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const ITEM_APPARE_TOP: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const GameCard: FC<{
  card: PlayingCard;
  position: Positions;
}> = ({ card, position }) => {
  return (
    <motion.li
      variants={
        position === POSITIONS.BOTTOM ? ITEM_APPARE_BOTTOM : ITEM_APPARE_TOP
      }
      className="inline-block"
    >
      <BaseCard
        position={position}
        className={
          card.suit === "♥" || card.suit === "♦"
            ? "text-red-500"
            : "text-black"
        }
      >
        <div className="text-center">
          <div className="text-lg font-bold">{card.rank}</div>
          <div className="text-2xl">{card.suit}</div>
        </div>
      </BaseCard>
    </motion.li>
  );
};

const BaseCard: FC<{
  children: ReactNode;
  className: string;
  position: Positions;
}> = ({ children, className, position }) => (
  <div
    className={cn(
      "select-none inline-flex items-center justify-center inter-text w-16 h-24 m-1 rounded-lg shadow-md bg-white border border-gray-200",
      position === POSITIONS.TOP ? "rotate-180" : "rotate-0",
      className
    )}
  >
    {children}
  </div>
);
