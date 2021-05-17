import Player from "@/scripts/classes/player";

export default class GameMoves {
  x: number[][];
  y: number[][];

  winner: Player;

  constructor(winner: Player, x: number[][], y: number[][]) {
    this.winner = winner;
    this.x = x;
    this.y = y;
  }
}
