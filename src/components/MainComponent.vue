<template>
  <div class="container">
    <div class="header">
      <h1>Tic Tac Toe game with AI</h1>
      <p>
        This game is played with a trained AI that is based on a
        neural network that has been taught to defend and win.
      </p>
      <p>You are playing for <b>X</b> and AI for <b>O</b>.</p>
      <p>
        Make your first move and AI will compete with you, then
        continue until either of you win or it's a draw.
      </p>
    </div>
    <div class="row score">
      <div class="col"><p>Player: <span id="score-human"></span></p></div>
      <div class="col"><p>AI: <span id="score-ai"></span></p></div>
      <div class="col"><p>Tie: <span id="score-tie"></span></p></div>
    </div>
    <div id="game-board" class="game">
      <div class="loading">
        <div class="loader"></div>
        Please wait...
      </div>
      <table>
        <tbody>
        <tr>
          <td>
            <button id="button-0"></button>
          </td>
          <td>
            <button id="button-1"></button>
          </td>
          <td>
            <button id="button-2"></button>
          </td>
        </tr>
        <tr>
          <td>
            <button id="button-3"></button>
          </td>
          <td>
            <button id="button-4"></button>
          </td>
          <td>
            <button id="button-5"></button>
          </td>
        </tr>
        <tr>
          <td>
            <button id="button-6"></button>
          </td>
          <td>
            <button id="button-7"></button>
          </td>
          <td>
            <button id="button-8"></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h4 id="winner"></h4>
    </div>
    <div class="footer">
      <button id="startOver" class="sm primary">Start over</button>
      <button id="saveModel" class="sm secondary">Save Model</button>
      <button id="downloadModel" class="sm secondary">Download Model</button>
    </div>
    <div>
      <p id="debug"></p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "MainComponent",
});
</script>

<style lang="scss">
@import "../styles/style.scss";
</style>
