import Grid from "./grid";

export default class State {
    value = [];

    constructor(grid: Grid) {
        grid.buttons.forEach(btn => {
            // @ts-ignore
            this.value.push(btn.getState());
        });
    }
}