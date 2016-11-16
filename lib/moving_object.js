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
    ctx.textAlign = "center";
    ctx.fillStyle = this.textColor;
    ctx.font = "900 21px sans-serif";
    ctx.fillText(this.name, this.pos[0], this.pos[1]-21);
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  move(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  collideWith(otherObj){

  }

  isCollidedWith(otherObj){
    let distance = Util.distance(this.pos, otherObj.pos);
    return (distance < this.radius + otherObj.radius);
  }
}

export default MovingObject;
