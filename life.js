(function() {
	var htmlCanvas = document.getElementById('c');
	var ctx = htmlCanvas.getContext('2d');
	var squareSize = 25;
	var boardWide = 1;
	var boardHigh = 1;

	initialize();

	function initialize() {
		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
	}

	function redrawEverything() {
		ctx.strokeStyle = '#0000ff';
		ctx.lineWidth = 1;
		ctx.beginPath();
		for(var x=0; x<=boardWide; x++) {
			ctx.moveTo(x*squareSize+0.5, 0);
			ctx.lineTo(x*squareSize+0.5, boardHigh*squareSize);
		}
		ctx.stroke();
		ctx.beginPath();
		for(var y=0; y<=boardHigh; y++) {
			ctx.moveTo(0,y*squareSize+0.5);
			ctx.lineTo(boardWide*squareSize,y*squareSize+0.5);
		}
		ctx.stroke();
	}

	function resizeCanvas()
	{
		var bodyRect = document.body.getBoundingClientRect();
    	var elemRect = htmlCanvas.getBoundingClientRect();
    	var topOffset = elemRect.top - bodyRect.top;
		
		var w = window.innerWidth - elemRect.left*2;
		boardWide = Math.floor(w / squareSize); 
		w = boardWide * squareSize;
		
		var h = window.innerHeight - topOffset - 10;
		boardHigh = Math.floor(h / squareSize); 
		h = boardHigh * squareSize;
		
		htmlCanvas.width = w + 1;
		htmlCanvas.height = h + 1;
		redrawEverything();
	}
	
})();
