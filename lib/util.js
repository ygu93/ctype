const Util ={
  distance(pos1, pos2){
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  },
  norm(vec){
    return Util.distance([0,0], vec);
  },
  randomVec(pos, m){
    let vec = [225-pos[0], 500 -pos[1]];
    vec = this.scale(vec, m);
    return vec;
  },
  dir(vec){
    let norm = Util.norm(vec);
    return Util.scale(vec, 1/ norm);
  },
  scale(vec, m){
    return [vec[0]/m, vec[1]/m];
  },
  vecToAsteroid(pos, m){
    let vec = [pos[0] - 220, pos[1] - 500];
    vec = this.scale(vec, m);
    return vec;
  }


};

export default Util;
