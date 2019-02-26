import Player from './player';
import Grid from './grid';
import {Main} from "./main";

export default class Button {
    grid: Grid;

    btn: Element;
    // @ts-ignore
    occupiedBy: Player;

    constructor(grid: Grid, btn: HTMLElement | Element, p: Player) {
        this.btn = btn;
        this.grid = grid;

        // Register a on click event
        $(this.btn).click(() => this.occupyBy(p));
    }

    occupyBy(player: Player): void {
        // Set this button to be occupied by a specific player
        this.occupiedBy = player;
        $(this.btn).addClass('occupiedBy' + this.occupiedBy.character);
        $(this.btn).prop('disabled', true);
        $(this.btn).text(player.character);

        console.log('Player: ' + player.name + ' has pressed button: ' + this.btn.id + '.');

        // Gather the state of the board
        this.grid.gatherState();

        // Send the hit event to the grid:
        if (player == Main.humanPlayer) {
            this.grid.aiMove();
        }
    }

    getState(): any {
        // Get the id of this button by who it is occupied
        switch($(this.btn).text()) {
            case 'X':
                return 'X';
            case 'O':
                return 'O';
            default:
                return parseInt(this.btn.id);
        }
    }
}