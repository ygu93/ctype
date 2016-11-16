import Util from './util';
import MovingObject from './moving_object';
import Ship from './ship';

class Asteroid extends MovingObject{
  constructor(options, game){
    options.pos = options.pos;
    options.color = 'orange';
    options.radius = 10;
    options.vel = Util.randomVec(options.pos, 1000);
    options.name = options.name;
    options.textColor = options.textColor || "white";
    super(options);
  }


  collideWith(otherObj){
    if(otherObj instanceof Ship){
      otherObj.destroy();
    }
  }
}

export default Asteroid;
