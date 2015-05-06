
function LifeModel(boardWidth, boardHeight)
{
	this.boardWidth = boardWidth;
	this.boardHeight = boardHeight;
	this.board = new Array(boardWidth);
	for(var x=0; x<this.boardWidth; x++) {
		this.board[x] = new Array(boardHeight);
	}
}

LifeModel.prototype.randomFill = function()
{
	var that = this;
	this.visitAll(function(x,y,v) {
		if (Math.random() < 0.20) {
			that.setAt(x,y,1);
		}		
	});
};

LifeModel.prototype.fillWith = function(value)
{
	var that = this;
	this.visitAll(function(x,y,v) {
		that.setAt(x,y,value);
	});
};

LifeModel.prototype.setAt = function(x,y,value)
{
	if (x < 0 || x >= this.boardWidth || y < 0 || y >= this.boardHeight) {
	} else {
		this.board[x][y] = value;		
	}
};

LifeModel.prototype.getAt = function(x,y)
{
	if (x < 0 || x >= this.boardWidth || y < 0 || y >= this.boardHeight) {
		return 0;
	}
	return this.board[x][y];
};

LifeModel.prototype.visitAll = function(fnc)
{
	for(var x=0; x<this.boardWidth; x++) {
		for(var y=0; y<this.boardHeight; y++) {
			fnc(x,y, this.getAt(x,y));
		}
	}
};

LifeModel.prototype.neighbors = function(x,y)
{
	var neighbors = 0;
	for(var dx=-1; dx<=1; dx++) {
		for(var dy=-1; dy<=1; dy++) {
			if (dx != 0 || dy != 0) {
				if (this.getAt(x+dx,y+dy)) {
					neighbors++;
				}
			}
		}
	}
	return neighbors;
};

LifeModel.prototype.nextState = function(x,y)
{
	var nextLive = false;
	var n = this.neighbors(x,y);
	if (this.getAt(x,y)) {
		// this cell is currently "live"
		if (n < 2) nextLive = false;
		else if (n == 2 || n == 3) nextLive = true;
		else if (n > 3) nextLive = false;
	} else {
		// this cell is currently "dead"
		if (n == 3) nextLive = true;
	}
	return nextLive;
};

