<!-- src/views/main-content.vue -->
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
        <div class="game">
            <table>
                <tbody>
                <tr><td><button id="0"></button></td><td><button id="1"></button></td><td><button id="2"></button></td></tr>
                <tr><td><button id="3"></button></td><td><button id="4"></button></td><td><button id="5"></button></td></tr>
                <tr><td><button id="6"></button></td><td><button id="7"></button></td><td><button id="8"></button></td></tr>
                </tbody>
            </table>
        </div>
        <div class="footer">
            <button id="startOver">Start over</button>
        </div>
        <div>
            <p>{{ webpack }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default {
        name: "main-content",
        data: () => ({
            // reactive data property of the component.
            webpack: 'Powered by webpack!',
        })
    }
</script>