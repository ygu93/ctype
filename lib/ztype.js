import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", ()=>{
  let canvas = document.getElementById("game-canvas").getContext("2d");
  let gv = new GameView(canvas);
  gv.start();
});
