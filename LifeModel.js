
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
	for(var x=0; x<this.boardWidth; x++) {
		for(var y=0; y<this.boardHeight; y++) {
			if (Math.random() < 0.20) {
				this.setAt(x,y,1);
			}
		}
	}
};

LifeModel.prototype.fillWith = function(value)
{
	for(var x=0; x<this.boardWidth; x++) {
		for(var y=0; y<this.boardHeight; y++) {
			this.setAt(x,y,value);
		}
	}	
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