import {
  DEFAULT_BET,
  INITIAL_CHIPS,
  MAXIMUM_CARDS_IN_A_HAND,
  RANKS,
  SUITS,
  TYPE_OF_PLAYERS,
  TypeOfPlayer,
  VICTORY_BY,
  VictoryBy,
} from "@/utils/constants";
import { shuffle } from "@/utils/functions";
import { Player, PlayingCard } from "@/utils/types";
import { create } from "zustand";

type WinnerInformation = {
  by: VictoryBy;
  value: number;
};

type State = {
  players: {
    [TYPE_OF_PLAYERS.COMPUTER]: Player | null;
    [TYPE_OF_PLAYERS.USER]: Player | null;
  };
  winner: TypeOfPlayer | "equality" | null;
  winnerInformation: WinnerInformation | null;
  numberOfGames: number;
};

type Actions = {
  startGame: () => void;
  resetGame: () => void;
  whoWin: () => void;
};

const generateRandomHand = () => {
  const newDeck: PlayingCard[] = [];
  SUITS.forEach((suit) => {
    RANKS.forEach((rank, index) => {
      newDeck.push({
        suit,
        rank,
        value: index + 7,
      });
    });
  });

  return shuffle(newDeck).slice(0, MAXIMUM_CARDS_IN_A_HAND);
};

const resetGameState: () => Omit<State, "numberOfGames"> = () => ({
  players: {
    [TYPE_OF_PLAYERS.COMPUTER]: {
      id: TYPE_OF_PLAYERS.COMPUTER,
      hand: generateRandomHand(),
      chips: INITIAL_CHIPS,
      bet: DEFAULT_BET,
      hasFolded: false,
    },
    [TYPE_OF_PLAYERS.USER]: {
      id: TYPE_OF_PLAYERS.USER,
      hand: generateRandomHand(),
      chips: INITIAL_CHIPS,
      bet: DEFAULT_BET,
      hasFolded: false,
    },
  },
  winner: null,
  winnerInformation: null,
});

type Checker = (cards: PlayingCard[]) => boolean;

const checkIfThereIsAPair: Checker = (cards: PlayingCard[]) => {
  const seen = new Set();
  for (const card of cards) {
    if (seen.has(card.value)) {
      return true;
    }
    seen.add(card.value);
  }
  return false;
};

const checkIfThereIsAThreeOfAKind: Checker = (cards: PlayingCard[]) => {
  const cardsCounts: Record<string, number> = {};

  cards.forEach((card) => {
    cardsCounts[card.value] = (cardsCounts[card.value] || 0) + 1;
  });

  return Object.values(cardsCounts).some((count) => count === 3);
};

const checkIfThereIsAFourOfAKind: Checker = (cards: PlayingCard[]) =>
  cards.every((card) => card === cards[0]);

export const useGameStore = create<State & Actions>((set) => ({
  players: {
    [TYPE_OF_PLAYERS.COMPUTER]: null,
    [TYPE_OF_PLAYERS.USER]: null,
  },
  winner: null,
  winnerInformation: null,
  numberOfGames: 1,
  startGame: () => {
    set(resetGameState());
  },
  whoWin: () => {
    set((state) => {
      const highestCardOfThePlayerUser = state.players[
        TYPE_OF_PLAYERS.USER
      ]?.hand.reduce((acc, card) => acc + card.value, 0) as number;
      const highestCardOfThePlayerComputer = state.players[
        TYPE_OF_PLAYERS.COMPUTER
      ]?.hand.reduce((acc, card) => acc + card.value, 0) as number;

      if (
        checkIfThereIsAFourOfAKind(
          state.players[TYPE_OF_PLAYERS.USER]?.hand as PlayingCard[]
        ) &&
        !checkIfThereIsAFourOfAKind(
          state.players[TYPE_OF_PLAYERS.COMPUTER]?.hand as PlayingCard[]
        )
      ) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.USER,
          winnerInformation: {
            by: VICTORY_BY.FOUR_OF_A_KIND,
            value: highestCardOfThePlayerUser,
          },
        };
      }

      if (
        !checkIfThereIsAFourOfAKind(
          state.players[TYPE_OF_PLAYERS.USER]?.hand as PlayingCard[]
        ) &&
        checkIfThereIsAFourOfAKind(
          state.players[TYPE_OF_PLAYERS.COMPUTER]?.hand as PlayingCard[]
        )
      ) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.COMPUTER,
          winnerInformation: {
            by: VICTORY_BY.FOUR_OF_A_KIND,
            value: highestCardOfThePlayerComputer,
          },
        };
      }

      if (
        checkIfThereIsAThreeOfAKind(
          state.players[TYPE_OF_PLAYERS.USER]?.hand as PlayingCard[]
        ) &&
        !checkIfThereIsAThreeOfAKind(
          state.players[TYPE_OF_PLAYERS.COMPUTER]?.hand as PlayingCard[]
        )
      ) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.USER,
          winnerInformation: {
            by: VICTORY_BY.THREE_OF_A_KIND,
            value: highestCardOfThePlayerUser,
          },
        };
      }

      if (
        checkIfThereIsAThreeOfAKind(
          state.players[TYPE_OF_PLAYERS.COMPUTER]?.hand as PlayingCard[]
        ) &&
        !checkIfThereIsAThreeOfAKind(
          state.players[TYPE_OF_PLAYERS.USER]?.hand as PlayingCard[]
        )
      ) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.COMPUTER,
          winnerInformation: {
            by: VICTORY_BY.THREE_OF_A_KIND,
            value: highestCardOfThePlayerComputer,
          },
        };
      }

      if (
        checkIfThereIsAPair(
          state.players[TYPE_OF_PLAYERS.USER]?.hand as PlayingCard[]
        ) &&
        !checkIfThereIsAPair(
          state.players[TYPE_OF_PLAYERS.COMPUTER]?.hand as PlayingCard[]
        )
      ) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.USER,
          winnerInformation: {
            by: VICTORY_BY.POCKET_PAIR,
            value: highestCardOfThePlayerUser,
          },
        };
      }

      if (
        checkIfThereIsAPair(
          state.players[TYPE_OF_PLAYERS.COMPUTER]?.hand as PlayingCard[]
        ) &&
        !checkIfThereIsAPair(
          state.players[TYPE_OF_PLAYERS.USER]?.hand as PlayingCard[]
        )
      ) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.COMPUTER,
          winnerInformation: {
            by: VICTORY_BY.POCKET_PAIR,
            value: highestCardOfThePlayerComputer,
          },
        };
      }

      if (highestCardOfThePlayerComputer > highestCardOfThePlayerUser) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.COMPUTER,
          winnerInformation: {
            by: VICTORY_BY.HIGHEST,
            value: highestCardOfThePlayerComputer,
          },
        };
      } else if (highestCardOfThePlayerComputer < highestCardOfThePlayerUser) {
        return {
          ...state,
          winner: TYPE_OF_PLAYERS.USER,
          winnerInformation: {
            by: VICTORY_BY.HIGHEST,
            value: highestCardOfThePlayerUser,
          },
        };
      }

      return {
        ...state,
        winner: "equality",
        winnerInformation: null,
      };
    });
  },
  resetGame: () => {
    set((state) => {
      state.numberOfGames += 1;
      if (state.numberOfGames === 3) {
        state.numberOfGames = 0;
      }
      return { ...state, ...resetGameState() };
    });
  },
}));
