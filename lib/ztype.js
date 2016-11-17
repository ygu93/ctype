import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", ()=>{
  let startButton = document.getElementById("new-game");
  startButton.addEventListener("click", ()=>{
    document.getElementById("main-menu").style.display = 'none';
    let canvas = document.getElementById("game-canvas").getContext("2d");
    let gv = new GameView(canvas);
    gv.start();
  }
  );
  let instructions = document.getElementById('instructions');
  instructions.addEventListener("click", ()=>{
    document.getElementById("how-to-play").style.display = 'block';
    document.getElementById("main-menu").style.display = 'none';
  });

  let back= document.getElementById('back');
  back.addEventListener("click", ()=>{
    document.getElementById("how-to-play").style.display = 'none';
    document.getElementById("main-menu").style.display = 'block';
  });
});
