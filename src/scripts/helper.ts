import Player from "@/scripts/classes/player";
import $ from "jquery";

export function isWinningStateFor(values: number[], player : Player): boolean {
  return (values[0] == player.index && values[1] == player.index && values[2] == player.index) ||
    (values[3] == player.index && values[4] == player.index && values[5] == player.index) ||
    (values[6] == player.index && values[7] == player.index && values[8] == player.index) ||
    (values[0] == player.index && values[3] == player.index && values[6] == player.index) ||
    (values[1] == player.index && values[4] == player.index && values[7] == player.index) ||
    (values[2] == player.index && values[5] == player.index && values[8] == player.index) ||
    (values[0] == player.index && values[4] == player.index && values[8] == player.index) ||
    (values[2] == player.index && values[4] == player.index && values[6] == player.index);
}

export function logValues(x: number[], y?: number[]) {
  if (y) logValuesXY(x, y);
  else logValuesX(x);
}

function logValuesX(X: number[]) {
  console.log(`\t|${X[0]}, ${X[1]}, ${X[2]}|\n`
    + `\t|${X[3]}, ${X[4]}, ${X[5]}|\n`
    + `\t|${X[6]}, ${X[7]}, ${X[8]}|\n`);
}

function logValuesXY(X: number[], Y: number[]) {
  console.log(`\t|${X[0]}, ${X[1]}, ${X[2]}|\t\t|${Y[0]}, ${Y[1]}, ${Y[2]}|\n`
    + `\t|${X[3]}, ${X[4]}, ${X[5]}|\t\t|${Y[3]}, ${Y[4]}, ${Y[5]}|\n`
    + `\t|${X[6]}, ${X[7]}, ${X[8]}|\t\t|${Y[6]}, ${Y[7]}, ${Y[8]}|\n`);
}

export async function displayLoadingScreen() {
  $('#game-board').addClass('paused');

  $(`#startOver`).prop('disabled', true);
  $(`#saveModel`).prop('disabled', true);
  $(`#downloadModel`).prop('disabled', true);
}

export async function hideLoadingScreen() {
  $('#game-board').removeClass('paused');

  $(`#startOver`).prop('disabled', false);
  $(`#saveModel`).prop('disabled', false);
  $(`#downloadModel`).prop('disabled', false);
}

export async function debug(text: string) {
  $('#debug').html(text);
}

export async function displayScore(human: number, ai: number, tie: number) {
  $('#score-human').html(human.toString());
  $('#score-ai').html(ai.toString());
  $('#score-tie').html(tie.toString());
}
