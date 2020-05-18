import Button from "./button";
import State from "./state";
import {Main} from "./main";
import Player from "./player";

export default class Grid {
    buttons: Button[] = [];
    states: State[] = [];

    get latestState(): State {
        return this.states[this.states.length - 1];
    }

    add(btn: Button): void {
        this.buttons.push(btn);
    }

    gatherState(): void {
        this.states.push(new State(this));
    }

    aiMove(): void {
        let bestMoveForAI = this.minMaxRecursion(this.latestState, Main.humanPlayer);
        console.log('Best move for AI: ', bestMoveForAI);

        if (bestMoveForAI.index != null) {
            this.buttons[bestMoveForAI.index].occupyBy(Main.aiPlayer);
        }
    }

    minMaxRecursion(state: State, player: Player): any {
        // Gather the empty indices of the board
        let availableSpots = state.getEmptyIndices();

        // Check winning conditions
        if (player == Main.aiPlayer && state.isWinningStateFor(Main.humanPlayer)
            || player == Main.humanPlayer && state.isWinningStateFor(Main.aiPlayer)) {
            return {score:-10};
        }
        else if (player == Main.aiPlayer && state.isWinningStateFor(Main.aiPlayer)
            || player == Main.humanPlayer && state.isWinningStateFor(Main.humanPlayer)) {
            return {score:10};
        }
        else if (availableSpots.length == 0) {
            return {score:0};
        }

        // Create a
        let moves = [];

        // loop through available spots
        for (let i = 0; i < availableSpots.length; i++){
            //create an object for each and store the index of that spot
            let move = {index:0,score:0};
            move.index = parseInt(state.value[availableSpots[i]]);

            // set the empty spot to the current player
            state.value[availableSpots[i]] = Main.humanPlayer.character;

            /*collect the score resulted from calling minimax
              on the opponent of the current player*/
            if (player == Main.aiPlayer){
                let result = this.minMaxRecursion(state, Main.humanPlayer);
                move.score = result.score;
            }
            else {
                let result = this.minMaxRecursion(state, Main.aiPlayer);
                move.score = result.score;
            }

            // reset the spot to empty
            state.value[availableSpots[i]] = move.index;

            // push the object to the array
            moves.push(move);
        }

        // if it is the computer's turn loop over the moves and choose the move with the highest score
        let bestMove = 0;
        if(player === Main.aiPlayer){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // else loop over the moves and choose the move with the lowest score
        else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        console.log('All moves: ', moves);

        // return the chosen move (object) from the moves array
        return moves[bestMove];
    }
}