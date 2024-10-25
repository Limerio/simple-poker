export const SUITS = ["♠", "♥", "♦", "♣"] as const;

export type Suit = (typeof SUITS)[number];

export const RANKS = ["7", "8", "9", "10", "J", "Q", "K", "A"] as const;

export type Rank = (typeof RANKS)[number];

export const INITIAL_CHIPS = 1000 as const;

export const SMALL_BLIND = 10 as const;

export const BIG_BLIND = 20 as const;

export const MAXIMUM_CARDS_IN_A_HAND = 4 as const;

export const DEFAULT_BET = 0;

export const TYPE_OF_PLAYERS = {
  COMPUTER: "COMPUTER",
  USER: "USER",
} as const;

export type TypeOfPlayer = keyof typeof TYPE_OF_PLAYERS;

export const POSITIONS = {
  TOP: "TOP",
  BOTTOM: "BOTTOM",
} as const;

export type Positions = keyof typeof POSITIONS;

export const VICTORY_BY = {
  FOUR_OF_A_KIND: "FOUR_OF_A_KIND",
  THREE_OF_A_KIND: "THREE_OF_A_KIND",
  POCKET_PAIR: "POCKET_PAIR",
  HIGHEST: "HIGHEST",
} as const;

export type VictoryBy = keyof typeof VICTORY_BY;
