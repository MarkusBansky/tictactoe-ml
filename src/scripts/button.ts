import Player from './player';
import Grid from './grid';

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

    occupyBy(player: Player) {
        // Set this button to be occupied by a specific player
        this.occupiedBy = player;
        $(this.btn).addClass('occupiedBy' + this.occupiedBy.character);
        $(this.btn).prop('disabled', true);
        $(this.btn).text(player.character);

        // Gather the state of the board
        this.grid.gatherState();
        console.log('Player: ' + player.name + ' has pressed button: ' + this.btn.id + '.');
    }

    getState() : number {
        // Get the id of this button by who it is occupied
        switch($(this.btn).text()) {
            case 'X':
                return 1;
            case 'O':
                return 2;
            default:
                return 0;
        }
    }
}