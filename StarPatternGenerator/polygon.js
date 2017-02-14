function Polygon() {
  this.vertecies = [];
  this.edges = [];

  this.addVertex = function(x, y) {
    var a = createVector(x, y);
    var total = this.vertecies.length;

    if (total > 0) {
      var prev = this.vertecies[total-1];
      var edge = new Edge(prev, a);
      this.edges.push(edge);
    }

    this.vertecies.push(a);
  }

  this.close = function() {
    var last = this.vertecies[this.vertecies.length-1];
    var first = this.vertecies[0];
    var edge = new Edge(last, first);
    this.edges.push(edge);
  }

  this.hankin = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin();
    }

    for (var i = 0; i < this.edges.length; i++) {
      for (var j = 0; j < this.edges.length; j++) {
        if (i !== j)
          this.edges[i].findEnds(this.edges[j]);
      }
    }
  }

  this.draw = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].draw();
    }
  }
}