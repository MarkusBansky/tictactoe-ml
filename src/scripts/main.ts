import Button from './button';
import Player from "./player";
import Grid from "./grid";
import $ from "jquery";

class Main {
  static grid: Grid = new Grid();

  static humanPlayer: Player = new Player('HUMAN', 'X');
  static aiPlayer: Player = new Player('AI', 'O');

  ready(): void {
    this.setButtons();

    $('#startOver').on("click", () => {
      location.reload();
    });
  }

  setButtons() {
    Main.grid = new Grid();

    // Do something for each button
    $('.game button').each((i, evt) => {
      // Create a new button object
      const btn = new Button(Main.grid, evt, Main.humanPlayer);
      // Add it to the grid
      Main.grid.add(btn);
    });
  }
}

export {Main};
