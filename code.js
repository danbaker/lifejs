
// Create a new "Game of Life Game"
function LifeGame(boardWidth, boardHeight, ctx, squareSize)
{
	this.boardWidth = boardWidth;
	this.boardHeight = boardHeight;
	this.ctx = ctx;
	this.squareSize = squareSize;
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
	
};
