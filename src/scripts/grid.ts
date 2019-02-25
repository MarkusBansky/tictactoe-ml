import Button from "./button";
import State from "./state";

export default class Grid {
    buttons: Button[] = [];
    states: State[] = [];

    add(btn: Button) {
        this.buttons.push(btn);
    }

    gatherState() {
        this.states.push(new State(this));
    }
}