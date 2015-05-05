(function() {
	var htmlCanvas = document.getElementById('c');
	var ctx = htmlCanvas.getContext('2d');
	var squareSize = 25;
	var boardWide = 1;
	var boardHigh = 1;
	var lifeGame;

	initialize();

	function initialize() {
		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
	}

	function redrawEverything() {
		lifeGame.redrawBackground();
		lifeGame.redrawCurrentState();
	}

	function resizeCanvas()
	{
		var bodyRect = document.body.getBoundingClientRect();
    	var elemRect = htmlCanvas.getBoundingClientRect();
    	var topOffset = elemRect.top - bodyRect.top;
		
		var w = window.innerWidth - elemRect.left*2;
		var bWide = Math.floor(w / squareSize);
		
		var h = window.innerHeight - topOffset - 10;
		var bHigh = Math.floor(h / squareSize);
		
		if (bWide != boardWide || bHigh != boardHigh)
		{
			boardWide = bWide;
			boardHigh = bHigh;
			htmlCanvas.width = boardWide * squareSize + 1;
			htmlCanvas.height = boardHigh * squareSize + 1;
		
			lifeGame = new LifeGame(boardWide, boardHigh, ctx, squareSize);
		}
		redrawEverything();		
	}
	
})();
