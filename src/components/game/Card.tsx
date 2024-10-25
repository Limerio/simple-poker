import { Positions, POSITIONS } from "@/utils/constants";
import { cn } from "@/utils/functions";
import { PlayingCard } from "@/utils/types";
import { motion, Variants } from "framer-motion";
import { FC } from "react";

const ITEM_APPARE_BOTTOM: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  whileHover: {
    scale: 1.2,
    transition: {
      duration: 0.25,
    },
  },
  whileTap: {
    scale: 0.8,
    borderRadius: "100%",
    transition: {
      duration: 0.25,
    },
  },
};

const ITEM_APPARE_TOP: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  whileHover: {
    scale: 1.2,
    rotate: 180,
    transition: {
      duration: 0.25,
    },
  },
  whileTap: {
    scale: 0.8,
    rotate: -180,
    borderRadius: "100%",
    transition: {
      duration: 0.25,
    },
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
      whileHover="whileHover"
      whileTap="whileTap"
      className="inline-block"
    >
      <div
        className={cn(
          "select-none inline-flex items-center justify-center inter-text w-16 h-24 m-1 rounded-lg shadow-md bg-white border border-gray-200",
          position === POSITIONS.TOP ? "rotate-180" : "rotate-0",

          card.suit === "♥" || card.suit === "♦"
            ? "text-red-500"
            : "text-black"
        )}
      >
        <div className="text-center">
          <div className="text-lg font-bold">{card.rank}</div>
          <div className="text-2xl">{card.suit}</div>
        </div>
      </div>
    </motion.li>
  );
};
