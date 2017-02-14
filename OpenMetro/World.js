function World(){
  
  this.stations = [];
  
  for(var i = 0; i < 3; i++) {
     var s1 = new Station();
     this.stations.push(s1);
  }
  
  this.draw = function(){
    for(var i = 0; i < this.stations.length; i++) {
       this.stations[i].draw(); 
    }
  }
  
  this.update = function(){
    
  }
}