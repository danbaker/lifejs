
// Create a new "Game of Life Game"
function LifeGame(boardWidth, boardHeight, ctx, squareSize)
{
	this.isRunning = false;
	this.runningTimer = 0;
	this.boardWidth = boardWidth;
	this.boardHeight = boardHeight;
	this.ctx = ctx;
	this.squareSize = squareSize;
	this.board = new LifeModel(boardWidth, boardHeight);
	this.board.randomFill();
}

LifeGame.prototype.redrawBackground = function()
{
	this.ctx.strokeStyle = '#0000ff';
	this.ctx.lineWidth = 1;
	this.ctx.beginPath();
	for(var x=0; x<=this.boardWidth; x++) {
		this.ctx.moveTo(x*this.squareSize+0.5, 0);
		this.ctx.lineTo(x*this.squareSize+0.5, this.boardHeight*this.squareSize);
	}
	this.ctx.stroke();
	this.ctx.beginPath();
	for(var y=0; y<=this.boardHeight; y++) {
		this.ctx.moveTo(0,y*this.squareSize+0.5);
		this.ctx.lineTo(this.boardWidth*this.squareSize,y*this.squareSize+0.5);
	}
	this.ctx.stroke();
};

LifeGame.prototype.redrawCurrentState = function()
{
	for(var x=0; x<this.board.boardWidth; x++) {
		for(var y=0; y<this.board.boardHeight; y++) {
			var v = this.board.getAt(x,y);
			if (v) {
				this.ctx.fillStyle = '#0000ff';				
			} else {
				this.ctx.fillStyle = '#808080';
			}
			var xx = x * this.squareSize+1;
			var yy = y * this.squareSize+1;
			this.ctx.fillRect(xx,yy,this.squareSize-1,this.squareSize-1);
		}
	}
};

LifeGame.prototype.startRunning = function()
{
	var that = this;
	this.isRunning = true;
	this.runningTimer = setInterval(function() {
		that.board.tickToNextState();
		that.redrawCurrentState();
	}, 1);
};

LifeGame.prototype.pauseRunning = function()
{
	this.isRunning = false;
	clearInterval(this.runningTimer);
};