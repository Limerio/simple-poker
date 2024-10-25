import { Rank, Suit } from "@/utils/types";

export const SUITS: Suit[] = ["♠", "♥", "♦", "♣"] as const;

export const RANKS: Rank[] = ["7", "8", "9", "10", "J", "Q", "K", "A"] as const;

export const INITIAL_CHIPS = 1000 as const;

export const SMALL_BLIND = 10 as const;

export const BIG_BLIND = 20 as const;

export const MAXIMUM_CARDS_IN_A_HAND = 4 as const;
