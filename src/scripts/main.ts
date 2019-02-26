import Button from './button';
import Player from "./player";
import Grid from "./grid";

class Main {
    static grid: Grid = new Grid();

    static humanPlayer: Player= new Player('HUMAN', 'X');
    static aiPlayer: Player = new Player('AI', 'O');

    ready(): void {
        // Do something for each button
        $('.game button').each((i, evt) =>  {
            // Create a new button object
            let btn = new Button(Main.grid, evt, Main.humanPlayer);
            // Add it to the grid
            Main.grid.add(btn);
        });

        $('#startOver').click(() =>  {
            console.log(Main.grid);
        });
    }
}

export { Main };