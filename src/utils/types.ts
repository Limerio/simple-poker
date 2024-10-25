import { Rank, Suit, TypeOfPlayer } from "@/utils/constants";

export type PlayingCard = {
  suit: Suit;
  rank: Rank;
  value: number;
};

export type Player = {
  id: TypeOfPlayer;
  hand: PlayingCard[];
  chips: number;
  bet: number;
  hasFolded: boolean;
};
