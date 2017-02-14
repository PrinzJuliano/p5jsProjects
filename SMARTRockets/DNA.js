function DNA(genes) {

  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];

    for (var i = 0; i < G_LIFESPAN; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(G_MAX_FORCE);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));

    for (var i = 0; i < this.genes.length; i++) {
      if (i < mid) {
        newgenes.push(this.genes[i].copy());
      } else {
        newgenes.push(partner.genes[i].copy());
      }
    }

    return new DNA(newgenes);
  }
  
  this.mutate = function(){
     for(var i = 0; i < this.genes.length; i++){
       if(random(100) < G_MUTATION_RATE) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(G_MAX_FORCE);
       }
     }
  }
}