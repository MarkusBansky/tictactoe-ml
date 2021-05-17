import Player from './player';
import Grid from './grid';
import {Main} from "./main";
import $ from "jquery";

function getId(btn: Element): string {
    return `#${btn.id}`;
}

export default class Button {
    grid: Grid;
    btn: Element;
    occupiedBy?: Player;

    constructor(grid: Grid, btn: HTMLElement | Element, onClickPlayer: Player) {
        this.btn = btn;
        this.grid = grid;

        // Register a on click event
        $(getId(this.btn)).on("click",() => {
            console.log(`Pressed button ${this.btn.id}`);
            this.occupyBy(onClickPlayer);
        });
    }

    occupyBy(player: Player): void {
        // Set this button to be occupied by a specific player
        this.occupiedBy = player;
        $(getId(this.btn)).addClass('occupiedBy' + this.occupiedBy.character);
        $(getId(this.btn)).prop('disabled', true);
        $(getId(this.btn)).text(player.character);

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
