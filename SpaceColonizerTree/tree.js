function Tree(){
   this.leaves = [];
   this.branches = [];
   this.hue = 0;
   
   for(var i = 0; i < 500; i++){
      this.leaves.push(new Leaf()); 
   }
   
   //root
   var pos = createVector(width/2, height)
   var dir = createVector(0, -1);
   var root = new Branch(null, pos, dir);
   this.branches[0] = root;
   
   var current = root;
   var found = false;
   while(!found){
     for(var i = 0; i < this.leaves.length; i++){
         var d = p5.Vector.dist(current.position, this.leaves[i].position);
         if(d < max_dist){
           found = true;
         }
     }
     if(!found){
        var nextBranch = current.next();
        this.branches.push(nextBranch);
        current = nextBranch;
     }
   }
   
   this.grow = function(){
     for(var i = 0; i < this.leaves.length; i++){
       var leaf = this.leaves[i];
       
       var closestBranch = null;
       var record = 0;
       for(var j = 0; j < this.branches.length; j++){
         var branch = this.branches[j];
         var d = p5.Vector.dist(leaf.position, branch.position);
         if(d < min_dist){
            leaf.reached = true;
            closestBranch = null;
            break;
         } else if(d > max_dist){
            continue; 
         } else if(closestBranch === null || d < record){
            closestBranch = branch; 
            record = d;
         }
         
       }
       
       if(closestBranch != null){
           var newDir = p5.Vector.sub(leaf.position, closestBranch.position);
           newDir.normalize();
           
           closestBranch.direction.add(newDir);
           closestBranch.count++;
       }
     }
     
     for(var i = this.leaves.length-1; i >= 0; i--){
        if(this.leaves[i].reached){
           this.leaves.splice(i, 1); 
        }
     }
     
     for(var i = this.branches.length-1; i >= 0; i--){
        var branch = this.branches[i];
        if(branch.count > 0){
           branch.direction.div(branch.count);
           this.branches.push(branch.next());
        }
        
        branch.reset();
     }
   }
  
   
   this.draw = function(){
      for(var i = 0; i < this.leaves.length; i++){
         this.leaves[i].draw(); 
      }
      for(var i = 0; i < this.branches.length; i++){
        push();
        stroke(255);
        this.branches[i].draw();
        pop();
      }
   }
}