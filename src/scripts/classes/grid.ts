import Button from "./button";
import State from "./state";
import Player from "@/scripts/classes/player";
import {isWinningStateFor, logValues} from "@/scripts/helper";
import GameMoves from "@/scripts/models/gameMoves";
import {Main} from "@/scripts/main";
import $ from "jquery";

export default class Grid {
  buttons: Button[];
  states: State[];

  constructor(buttons: Button[]) {
    this.buttons = buttons;
    this.states = [];
  }

  initialize(): Grid {
    this.states = [];
    this.buttons.forEach(btn => btn.enable());
    return this;
  }

  lastState(): State | undefined {
    return this.states.length > 0 ? this.states[this.states.length - 1] : undefined;
  }

  mutateState(player: Player, pressedButton: Button): void {
    // gather values from the buttons
    const values = this.buttons.map(b => b.occupiedBy?.index ?? 0);
    const isEitherWin = isWinningStateFor(values, Main.humanPlayer) || isWinningStateFor(values, Main.aiPlayer);
    // create a new state
    const newState = new State(values, pressedButton.index, isEitherWin, player);
    // add new state to the array of states
    this.states.push(newState);

    if (isEitherWin) {
      console.log(`Player [${player.name}] won the game! \n`);
      // disable all buttons
      this.buttons.forEach(btn => btn.disable());
      // announce the winner
      $('#winner').html(player.name);
    }

    // if the player was human and this is not a win, then do an AI move
    if (player === Main.humanPlayer && !newState.isWin && this.buttons.filter(b => !b.occupiedBy).length > 0) {
      Main.tfModel.predict(newState).then(index => {
        this.buttons[index].occupyBy(Main.aiPlayer);
      });
    }
  }

  getMoves(): GameMoves {
    if (!this.lastState()?.isWin || !this.lastState()?.lastMutatedBy) throw "No winners";
    const winner = this.lastState()!.lastMutatedBy!;

    const x: number[][] = [];
    const y: number[][] = [];

    const winStates = this.states.filter(s => s.lastMutatedBy === winner);
    for (let i = 0; i < winStates.length - 1; i++) {
      const state = winStates[i];
      const move = state.diff(winStates[i + 1]);

      // Default
      x.push(state.flat(winner));
      y.push(move.for(winner));
      // Flipped via X axis
      x.push(state.flipX().flat(winner));
      y.push(move.flipX().for(winner));
      // Inverted via both axis
      x.push(state.invert().flat(winner));
      y.push(move.invert().for(winner));
      // Flipped via Y axis
      x.push(state.flipY().flat(winner));
      y.push(move.flipY().for(winner));
    }

    console.log('Displaying the training moves:');
    for (let i = 0; i < x.length; i++) {
      const X = x[i];
      const Y = y[i];

      logValues(X, Y);
    }

    return new GameMoves(x, y);
  }
}
