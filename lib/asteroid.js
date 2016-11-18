import Util from './util';
import MovingObject from './moving_object';
import Ship from './ship';

class Asteroid extends MovingObject{
  constructor(options, game, speed){
    options.pos = options.pos;
    options.color = 'orange';
    options.radius = 10;
    options.vel = Util.randomVec(options.pos, speed);
    options.name = options.name;
    options.textColor = options.textColor || "white";
    super(options);
    this.bulletsNeeded = options.name.length || null;
    this.bulletsTaken = 0;
    this.game = game;
  }




  collideWith(otherObj){
    if(otherObj instanceof Ship){
      this.game.ship = null;
      this.game.timeEnd = Date.now();
    }
  }
}

export default Asteroid;
