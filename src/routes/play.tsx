import { Deck } from "@/components/game/Deck";
import { IsAPlayerWin } from "@/components/game/IsAPlayerWin";
import { useGameStore } from "@/stores/game";
import { TYPE_OF_PLAYERS } from "@/utils/constants";
import { Box, Button } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Confetti, { ConfettiConfig } from "react-dom-confetti";

const CONFETTI_CONFIG: ConfettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  colors: ["#000", "#f00"],
} as const;

export const Route = createFileRoute("/play")({
  component: () => {
    const startGame = useGameStore((state) => state.startGame);
    const resetGame = useGameStore((state) => state.resetGame);
    const whoWin = useGameStore((state) => state.whoWin);
    const playerWinner = useGameStore((state) => state.winner);

    useEffect(() => {
      startGame();
    }, []);

    return (
      <div className="fixed flex flex-col items-center justify-center w-full gap-4">
        <Box className="md:w-10/12 lg:w-1/2 rounded-full flex flex-col items-center justify-between gap-28 p-3 border-amber-800 border-8 bg-green-700">
          <IsAPlayerWin>
            <Deck player={TYPE_OF_PLAYERS.COMPUTER} />
            <Deck player={TYPE_OF_PLAYERS.USER} />
          </IsAPlayerWin>
        </Box>
        {playerWinner ? (
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.25 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              className="bg-blue-500 inter-text"
              onClick={resetGame}
              size="4"
            >
              Reset the party
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.25 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              className="bg-[var(--red-card)] inter-text"
              size="4"
              onClick={whoWin}
            >
              Who win?
            </Button>
          </motion.div>
        )}
        <Confetti active={playerWinner !== null} config={CONFETTI_CONFIG} />
      </div>
    );
  },
});
