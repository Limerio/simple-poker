import { GameCard } from "@/components/game/Card";
import { useGameStore } from "@/stores/game";
import { POSITIONS, TYPE_OF_PLAYERS, TypeOfPlayer } from "@/utils/constants";
import { motion, Variants } from "framer-motion";
import { FC } from "react";

const container: Variants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

export const Deck: FC<{ player: TypeOfPlayer }> = ({ player }) => {
  const deckPlayer = useGameStore((state) => state.players[player]);

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {deckPlayer?.hand.map((card, i) => (
        <GameCard
          key={i}
          card={card}
          position={
            player === TYPE_OF_PLAYERS.COMPUTER
              ? POSITIONS.TOP
              : POSITIONS.BOTTOM
          }
        />
      ))}
    </motion.ul>
  );
};
