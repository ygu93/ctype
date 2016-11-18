import Game from './game.js';

class GameView{
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game(this.ctx);
    this.volume =  !document.getElementById('bg-music').paused;
    this.running = true;

  }


  start(){
    this.bindKeyHandlers();
    let gameStart = setInterval(()=>{
      if(this.game.ship === null){
        clearInterval(gameStart);
        this.game.gameOver();
      }
      this.game.draw(this.ctx);
      this.game.step();
    }, 20);
    this.bindVolumeButton();
    let canvas = document.getElementById("game-canvas");
    canvas.addEventListener("click", (e)=> {
      let clickedX = e.pageX - canvas.offsetLeft;
      let clickedY = e.pageY - canvas.offsetTop;
      if(clickedX >= 430 && clickedY >= 560 && this.running){
        this.running = false;
        clearInterval(gameStart);
      }else if(clickedX >= 430 && clickedY >= 560 && !this.running){
        this.running = true;
        gameStart = setInterval(()=>{
          if(this.game.ship === null){
            clearInterval(gameStart);
            this.game.gameOver();
          }
          this.game.draw(this.ctx);
          this.game.step();
        }, 20);
      }
    });
  }


  bindKeyHandlers(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach((letter)=> key(letter, ()=> this.game.getInput(letter)));
    key('enter', ()=>this.game.useBomb());
  }

  bindVolumeButton(){
    let canvas = document.getElementById("game-canvas");
    canvas.addEventListener("click", (e)=> {
      let clickedX = e.pageX - canvas.offsetLeft;
      let clickedY = e.pageY - canvas.offsetTop;
      if(clickedX <= 50 && clickedY >= 560 && this.volume){
        document.getElementById('bg-music').pause();
        this.volume = !this.volume;
      }else if(clickedX <= 50 && clickedY >= 560 && !this.volume){
        document.getElementById('bg-music').play();
        this.volume = !this.volume;
      }
    });
  }

  bindPauseButton(){
    let canvas = document.getElementById("game-canvas");
    canvas.addEventListener("click", (e)=> {
      let clickedX = e.pageX - canvas.offsetLeft;
      let clickedY = e.pageY - canvas.offsetTop;
      if(clickedX <= 430 && clickedY >= 560 && this.running){
        // clearinterval
        this.running = !this.running;
      }else if(clickedX <= 430 && clickedY >= 560 && !this.running){
        // setInterval
        this.running = !this.running;
      }
    });
  }


}

export default GameView;
