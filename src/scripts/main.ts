import Button from './additional/button';
import Player from "./additional/player";
import Grid from "./additional/grid";

let grid = new Grid();

let humanPlayer = new Player('HUMAN', 'X');
let aiPlayer = new Player('AI', 'O');

// Do something for each button
$('.game button').each(function () {
    // Create a new button object
    let btn = new Button(grid, this, humanPlayer, aiPlayer);
    // Add it to the grid
    grid.add(btn);
});

$('#startOver').click(function() {
   console.log(grid);
});