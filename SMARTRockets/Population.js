function Population() {
  this.rockets = [];
  this.matingpool = [];
  this.generation = 1;
  this.amountCompleted = 0;

  for (var i = 0; i < G_AMOUNT_OF_ROCKETS; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function() {
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].update(); 
      this.rockets[i].draw();
    }
  }

  this.evaluate = function() {
    var maxfit = 0.0;
    this.amountCompleted = 0;

    //calculate the fitness and the best fitness!
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].calcFitness();
      if(this.rockets[i].completed)
      {
         this.amountCompleted++; 
      }
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    
    gen2P.html(gen1P.html());
    gen1P.html('Maxfit of Generation #' + this.generation + " : " + floor(maxfit*100.0)/(100.0*G_REACHED_TARGET_MULTIPLICATOR) + " and " + ((maxfit > G_MAXDIST)?"<font color='green'>"+this.amountCompleted+" hit</font>":"<font color='red'>none hit</font>") + " the target!");

    //normalize the fitness values
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var n =  this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;

      var child = parentA.crossover(parentB);
      child.mutate();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
    this.generation++;
  }
}