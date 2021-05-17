import Button from './classes/button';
import Player from "./classes/player";
import Grid from "./classes/grid";
import $ from "jquery";
import TfModel from "@/scripts/models/tfModel";
import GameMoves from "@/scripts/models/gameMoves";

class Main {
  // this is only one mutable
  static grid: Grid;

  // constant objects
  static humanPlayer: Player = new Player('HUMAN', 1);
  static aiPlayer: Player = new Player('AI', 2);

  // static objects
  static tfModel: TfModel = new TfModel();
  static gameHistory: GameMoves[] = [];

  constructor() {
    // Do something for each button
    const buttons = $('.game button')
      .map((i, evt) => {
        // Create a new button object
        return new Button(i, evt);
      })
      .get();

    // Add it to the grid
    Main.grid = new Grid(buttons).initialize();
  }

  ready(): void {
    this.initializeNewGame();

    $('#startOver').on("click", () => {
      console.log('Refreshing the game to start over again...');

      // save game history if it was a win and the winner was the Human then we should train
      // the model on the path this human took to win
      if (Main.grid.lastState()?.isWin && Main.grid.lastState()?.lastMutatedBy === Main.humanPlayer) {
        console.log('Training the game on the previous game history...');

        // add the new game to the history
        Main.gameHistory.push(Main.grid.getMoves());
        // train the model on the new history
        Main.tfModel.trainOnGameMoves(Main.gameHistory)
          .then(_ => {
            this.initializeNewGame();
            console.log('Finished training, new game begins')
          });
      } else {
        // if no winner then just clear the board
        this.initializeNewGame();
      }
    });

    $('#saveModel').on("click", () => {
      console.log('Saving model..');
      Main.tfModel.save().then(() => console.log('Saved'));
    });

    $('#downloadModel').on("click", () => {
      console.log('Downloading model...');
      Main.tfModel.download().then(() => console.log('Downloaded'));
    });
  }

  initializeNewGame() {
    // clear the winner
    $('#winner').html("");
    // recreate the grid
    Main.grid.initialize();
  }
}

export {Main};
