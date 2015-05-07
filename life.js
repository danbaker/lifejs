
var lifeGame;

(function() {
	var htmlCanvas = document.getElementById('c');
	var ctx = htmlCanvas.getContext('2d');
	var squareSize = 16;
	var boardWide = 1;
	var boardHigh = 1;

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
			
			var wasRunning = lifeGame? lifeGame.isRunning : false;
			if (wasRunning) {
				lifeGame.pauseRunning();
			}
			lifeGame = new LifeGame(boardWide, boardHigh, ctx, squareSize);
			if (wasRunning) {
				lifeGame.startRunning();
			}
		}
		redrawEverything();		
	}
	
})();

function playButton()
{
	var btn = document.getElementById('playBtn');
	if (lifeGame.isRunning) {
		lifeGame.pauseRunning();
		btn.value = "Start";
	} else {
		lifeGame.startRunning();		
		btn.value = "Pause";
	}
}
