import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", ()=>{
  let startButton = document.getElementById("new-game");
  startButton.addEventListener("click", ()=>{
    document.getElementById("main-menu").style.display = 'none';
    let canvas = document.getElementById("game-canvas").getContext("2d");
    document.getElementById('canvas-wrapper').style.display = 'block';
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

  let audioOn = document.getElementById('audio-on');
  let audioOff = document.getElementById('audio-off');
  let audioOn2 = document.getElementById('audio-on2');
  let audioOff2 = document.getElementById('audio-off2');
  audioOn.addEventListener("click", ()=>{
    document.getElementById('bg-music').pause();
    audioOn.style.display='none';
    audioOff.style.display='inline';
  });

  audioOff.addEventListener("click", ()=>{
    document.getElementById('bg-music').play();
    audioOn.style.display='inline';
    audioOff.style.display='none';
  });

  audioOn2.addEventListener("click", ()=>{
    document.getElementById('bg-music').pause();
    audioOn2.style.display='none';
    audioOff2.style.display='inline';
  });

  audioOff2.addEventListener("click", ()=>{
    document.getElementById('bg-music').play();
    audioOn2.style.display='inline';
    audioOff2.style.display='none';
  });

  document.getElementById('restart').addEventListener("click", ()=>{
    document.getElementById("game-over-wrapper").style.display = 'none';
    let gameOver = document.getElementById("game-over");
    while (gameOver.firstChild) {
      gameOver.removeChild(gameOver.firstChild);
    }
    let canvas = document.getElementById("game-canvas").getContext("2d");
    document.getElementById('canvas-wrapper').style.display = 'block';
    let gv = new GameView(canvas);
    gv.start();
  });

  document.getElementById('back-to-home').addEventListener("click", ()=>{
    document.getElementById("game-over-wrapper").style.display = 'none';
    let gameOver = document.getElementById("game-over");
    while (gameOver.firstChild) {
      gameOver.removeChild(gameOver.firstChild);
    }
    document.getElementById("main-menu").style.display = 'block';
  });
});
