import Player from './player';
import $ from "jquery";
import {Main} from "@/scripts/main";

function getId(btn: Element): string {
    return `#${btn.id}`;
}

export default class Button {
    index: number;
    btn: Element;

    public occupiedBy?: Player;

    constructor(index: number, btn: HTMLElement | Element) {
        this.index = index;
        this.btn = btn;

        // Register a on click event
        $(getId(this.btn)).on("click",() => {
            this.occupyBy(Main.humanPlayer);
        });

        this.enable();
    }

    occupyBy(player: Player): void {
        // Set this button to be occupied by a specific player
        this.occupiedBy = player;
        this.disable();

        // Mutate the state of the board
        Main.grid.mutateState(player, this);
    }

    disable() {
        $(getId(this.btn)).prop('disabled', true);
        $(getId(this.btn)).addClass('occupied-by-' + this.occupiedBy?.index);
    }

    enable() {
        delete this.occupiedBy;

        $(getId(this.btn)).prop('disabled', false);
        $(getId(this.btn)).removeClass('occupied-by-1');
        $(getId(this.btn)).removeClass('occupied-by-2');
        $(getId(this.btn)).removeClass('occupied-by-');
    }
}
