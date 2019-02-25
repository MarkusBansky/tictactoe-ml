import Button from './button';
import Player from "./player";
import Grid from "./grid";

let grid = new Grid();

let humanPlayer = new Player('HUMAN', 'X');
let aiPlayer = new Player('AI', 'O');

// Do something for each button
$('.game button').each(function () {
    // Create a new button object
    let btn = new Button(grid, this, humanPlayer);
    // Add it to the grid
    grid.add(btn);
});

$('#startOver').click(function() {
   console.log(grid);
});