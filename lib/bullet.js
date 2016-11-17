import Util from './util';
import Asteroid from './asteroid';

class Bullet{
  constructor(vel, game, astTarget){
    this.pos = [220, 500];
    this.vel = vel;
    this.game = game;
    this.radius = 5;
    this.astTarget = astTarget;
  }

  draw(ctx){
    let bullet = document.getElementById("bullet");
    ctx.drawImage(
      bullet,
      this.pos[0],
      this.pos[1],
      30,
      30);
  }

  move(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
  isCollidedWith(otherObject) {
    let dist = Util.distance(this.pos, otherObject.pos);
    return (dist < this.radius + otherObject.radius && (otherObject === this.astTarget));
  }

  drawExplosion(ctx){
    let explosion = document.getElementById("explosion");
    ctx.drawImage(
      explosion,
      this.pos[0],
      this.pos[1],
      30,
      30);
  }

  playExplosion(){
    let explosion = new Audio("../sounds/explosion.wav");
    explosion.play();
  }

  collideWith(otherObj){
    if(otherObj instanceof Asteroid){
      this.game.bullets.splice(this.game.bullets.indexOf(this), 1);
      if(otherObj.bulletsTaken === otherObj.bulletsNeeded){
        let explosion = setInterval(()=> this.drawExplosion(this.game.ctx), 10);
        this.playExplosion();
        setTimeout(()=>clearInterval(explosion), 300);
        this.game.destroyedAsteroids.push(otherObj);
        this.game.asteroids.splice(this.game.asteroids.indexOf(otherObj), 1);
        this.game.currentWordIndex = "";
      }
    }
  }
}

export default Bullet;
