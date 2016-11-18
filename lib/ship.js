
class Ship{
  constructor(){
    this.pos = [220, 500];
    this.color = "Blue";
    this.radius = 10;
  }

  draw(ctx){
    let image = document.getElementById("ship");
  ctx.drawImage(
    image,
    this.pos[0],
    this.pos[1],
    40,
    40);
}

}

export default Ship;
