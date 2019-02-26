import Grid from "./grid";
import {Main} from "./main";
import Player from "./player";

export default class State {
    value: any[] = [];

    constructor(grid: Grid) {
        grid.buttons.forEach(btn => {
            // @ts-ignore
            this.value.push(btn.getState());
        });
    }

    getEmptyIndices(): number[] {
        return this.value.filter(s => s != Main.humanPlayer.character && s != Main.aiPlayer.character);
    }

    isWinningStateFor(player : Player): boolean {
        return (this.value[0] == player.character && this.value[1] == player.character && this.value[2] == player.character) ||
            (this.value[3] == player.character && this.value[4] == player.character && this.value[5] == player.character) ||
            (this.value[6] == player.character && this.value[7] == player.character && this.value[8] == player.character) ||
            (this.value[0] == player.character && this.value[3] == player.character && this.value[6] == player.character) ||
            (this.value[1] == player.character && this.value[4] == player.character && this.value[7] == player.character) ||
            (this.value[2] == player.character && this.value[5] == player.character && this.value[8] == player.character) ||
            (this.value[0] == player.character && this.value[4] == player.character && this.value[8] == player.character) ||
            (this.value[2] == player.character && this.value[4] == player.character && this.value[6] == player.character);
    }
}