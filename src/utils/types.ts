export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank = "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export type PlayingCard = {
  suit: Suit;
  rank: Rank;
  value: number;
};

export type Player = {
  id: number;
  hand: PlayingCard[];
  chips: number;
  bet: number;
  hasFolded: boolean;
};
