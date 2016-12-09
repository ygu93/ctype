import Util from './util.js';

class MovingObject{
  constructor(object){
    this.pos = object.pos;
    this.vel = object.vel;
    this.radius = object.radius;
    this.color = object.color;
    this.game = object.game;
    this.name = object.name;
    this.textColor = object.textColor;
  }

  drawText(ctx){
    ctx.font = "900 21px Orbitron";
    // ctx.textAlign = "center";
    ctx.textBaseline = 'top';
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    let width = ctx.measureText(this.name).width;
    ctx.fillRect(this.pos[0]-10, this.pos[1]-25, width+20, 25);
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.name, this.pos[0], this.pos[1]-20);
  }

  draw(ctx){
    let image = document.getElementById("asteroid");
    ctx.drawImage(
      image,
      this.pos[0],
      this.pos[1],
      25,
      25);
  }

  move(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  collideWith(otherObj){

  }

  isCollidedWith(otherObj){
    if(otherObj && this){
      let distance = Util.distance(this.pos, otherObj.pos);
      return (distance < this.radius + otherObj.radius);
    }
  }
}

export default MovingObject;
