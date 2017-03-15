var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var path = [];


var start;
var end;

function removeFromArray(arr, obj)
{
    for (var i = arr.length -1; i >= 0; i--)
    {
        if (arr[i] === obj)
        {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b)
{
    //var d = dist(a.x, a.y, b.x, b.y);
	var d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;
}

function setup() {
    createCanvas(400, 400);
    console.log("A*");

	smooth();
	
    //2D Array
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++)
        {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++)
        {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols-1][rows-1];



    start.wall = false;

    end.wall = false;

    openSet.push(start);
}

function draw() {
    background(255);

    if (openSet.length > 0)
    {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++)
            if (openSet[i].f < openSet[winner].f)
                winner = i;

        var current = openSet[winner];

        if (current === end)
        {
            console.log("Done!");
            noLoop();
        }

        closedSet.push(current);

        removeFromArray(openSet, current);

        var neighbors = current.neighbors;

        for (var i = 0; i < neighbors.length; i++)
        {
            var neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.wall) {

                tempg = current.g + 1;


                var newPath = false;


                if (openSet.includes(neighbor)) {
                    if (tempg < neighbor.g) {
                        neighbor.g = tempg;

                        newPath = true;
                    }
                } else {
                    neighbor.g = tempg;
                    openSet.push(neighbor);

                    newPath = true;
                }


                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;

                }
            }
        }
    }
    else {
        console.log("No solution!");
        noLoop();

        return;
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++)
        {
            grid[i][j].draw(color(255));
        }
    }

    /*for (var i = 0; i < closedSet.length; i++)
    {
        closedSet[i].draw(color(81, 8, 30));
    }

    for (var i = 0; i < openSet.length; i++)
    {
        openSet[i].draw(color(20, 93, 183));
    }*/





    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous)
    {
        path.push(temp.previous);
        temp = temp.previous;
    }

    //for (var i = 0; i < path.length; i++)
    //{
    //    path[i].draw(color(188, 16, 168));
    //}

	noFill();
	stroke(188, 16, 168);
	strokeWeight(4);
	beginShape();
	for (var i = 0; i < path.length; i++)
	{
		vertex(path[i].x * width/cols + width/cols/2, path[i].y * height/rows + height/rows/2);
	}
	endShape();

}