import Player from "./player";

export default class State {
    values: number[] = [];
    lastMoveIndex: number;
    isWin: boolean;
    lastMutatedBy: Player;

    constructor(values: number[], lastMoveIndex: number, isWin: boolean, lastMutatedBy: Player) {
        this.values = values;
        this.lastMoveIndex = lastMoveIndex;
        this.isWin = isWin ?? false;
        this.lastMutatedBy = lastMutatedBy;
    }

    flat(player: Player): number[] {
        return this.values.map(v => v === player.index ? 1 : (v !== 0 ? -1 : 0));
    }

    for(player: Player): number[] {
        return this.values.map(v => v === player.index ? 1 : 0);
    }

    invert = () => {
        const values = this.values.slice().reverse();
        return new State(values, this.lastMoveIndex, this.isWin, this.lastMutatedBy);
    };

    flipX = () => {
        const values = [this.values.slice(6), this.values.slice(3, 6), this.values.slice(0, 3)].flat();
        return new State(values, this.lastMoveIndex, this.isWin, this.lastMutatedBy);
    };

    flipY = () => {
        const values = this.values.slice().reverse();
        return new State([values.slice(6), values.slice(3, 6), values.slice(0, 3)].flat(),
          this.lastMoveIndex, this.isWin, this.lastMutatedBy);
    }

    diff = (other: State) => {
        const result: number[] = [];
        this.values.forEach((move, i) => {
            result.push(Math.abs(move - other.values[i]));
        });
        return new State(result, this.lastMoveIndex, this.isWin, this.lastMutatedBy);
    };
}
