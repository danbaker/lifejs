//
function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}
function LifeModelTests()
{
}

LifeModelTests.prototype.runTests = function()
{
	this.testNormalBoard();
	this.testEdges();
	this.testCountNeighborsZero();
	this.testCountNeighbors8();
	this.testCountNeighborsOneRow();
	this.testCountNeighborsOneColumn();
	this.testNextStateZeros();
	this.testNextStateOnes();
	this.testNextStateLiveNeighbors();
	this.testNextStateDeadNeighbors();
};

LifeModelTests.prototype.testNormalBoard = function()
{
	var model = new LifeModel(5,8);
	for(var x=0; x<5; x++) {
		for(var y=0; y<8; y++) {
			model.setAt(x,y,0);
			assert(model.getAt(x,y) == 0);			
			model.setAt(x,y,1);
			assert(model.getAt(x,y) == 1);			
		}
	}
};

LifeModelTests.prototype.testEdges = function()
{
	var model = new LifeModel(5,8);
	for(var x=-1; x<6; x++) {
		model.setAt(x,-1,1);
		assert(model.getAt(x,-1) == 0);			
		model.setAt(x,8,1);
		assert(model.getAt(x,8) == 0);			
	}
	for(var y=-1; y<9; y++) {
		model.setAt(-1,y,1);
		assert(model.getAt(-1,y) == 0);			
		model.setAt(6,y,1);
		assert(model.getAt(6,y) == 0);					
	}
};

LifeModelTests.prototype.testCountNeighborsZero = function()
{
	var model = new LifeModel(5,8);
	model.fillWith(0);
	for(var x=0; x<5; x++) {
		for(var y=0; y<8; y++) {
			assert(model.neighbors(x,y) == 0);			
		}
	}
};

LifeModelTests.prototype.testCountNeighbors8 = function()
{
	var model = new LifeModel(5,8);
	model.fillWith(1);
	for(var x=1; x<4; x++) {
		for(var y=1; y<7; y++) {
			assert(model.neighbors(x,y) == 8, "testCount8("+x+","+y+")="+model.neighbors(x,y));			
		}
	}
};

LifeModelTests.prototype.testCountNeighborsOneRow = function()
{
	var model = new LifeModel(5,8);
	model.fillWith(0);
	for(var x=0; x<5; x++) {
		model.setAt(x,3,1);
	}
	
	assert(model.neighbors(2,1) == 0);
	assert(model.neighbors(2,2) == 3);
	assert(model.neighbors(2,3) == 2);
	assert(model.neighbors(2,4) == 3);
	assert(model.neighbors(2,5) == 0);	
};

LifeModelTests.prototype.testCountNeighborsOneColumn = function()
{
	var model = new LifeModel(5,8);
	model.fillWith(0);
	for(var y=0; y<8; y++) {
		model.setAt(3,y,1);
	}
	
	assert(model.neighbors(1,2) == 0);
	assert(model.neighbors(2,2) == 3);
	assert(model.neighbors(3,2) == 2);
	assert(model.neighbors(4,2) == 3);
	assert(model.neighbors(5,2) == 0);	
};

LifeModelTests.prototype.testNextStateZeros = function()
{
	var model = new LifeModel(5,8);
	model.fillWith(0);
	model.visitAll(function(x,y,v) {
		assert(v == 0);
		assert(model.nextState(x,y) == 0);
	});
};

LifeModelTests.prototype.testNextStateOnes = function()
{
	var model = new LifeModel(5,8);
	model.fillWith(1);
	model.visitAll(function(x,y,v) {
		assert(v == 1);
		if (x == 0 && y == 0) {
			assert(model.nextState(x,y) == 1);
		} else if (x == 4 && y == 0) {
			assert(model.nextState(x,y) == 1);
		} else if (x == 4 && y == 7) {
			assert(model.nextState(x,y) == 1);
		} else if (x == 0 && y == 7) {
			assert(model.nextState(x,y) == 1);
		} else {
				assert(model.nextState(x,y) == 0);
		}
	});
};

LifeModelTests.prototype.testNextStateLiveNeighbors = function()
{
	//		0	1	2	3
	//	0	x1	x2	.	.				x1 has 1 neighbor -> dead
	//	1	.	.	X	X				x2 has 2 neighbors -> live
	//	2	.	.	.	x4				x4 has 4 neighbors -> dead
	//	3	.	X	X	X				x6 has 6 neighbors -> dead
	//	4	.	.	x6	.				x7 has 7 neighbors -> dead
	//	5	.	X	X	X
	//	6	.	X	x7	.
	//	7	.	X	X	X
	var model = new LifeModel(5,8);
	model.fillWith(0);
	model.setAt(0,0,1);
	model.setAt(1,0,1);
	model.setAt(2,1,1);
	model.setAt(3,1,1);
	model.setAt(3,2,1);
	model.setAt(1,3,1);
	model.setAt(2,3,1);
	model.setAt(3,3,1);
	model.setAt(2,4,1);
	model.setAt(1,5,1);
	model.setAt(2,5,1);
	model.setAt(3,5,1);
	model.setAt(1,6,1);
	model.setAt(2,6,1);
	model.setAt(1,7,1);
	model.setAt(2,7,1);
	model.setAt(3,7,1);

	assert(model.neighbors(0,0) == 1, "0,0="+model.neighbors(0,0));
	assert(model.neighbors(1,0) == 2, "1,0="+model.neighbors(1,0));
	assert(model.neighbors(3,2) == 4, "3,2="+model.neighbors(3,2));
	assert(model.neighbors(2,4) == 6, "2,4="+model.neighbors(2,4));
	assert(model.neighbors(2,6) == 7, "2,6="+model.neighbors(2,6));

	assert(model.nextState(0,0) == 0);
	assert(model.nextState(1,0) == 1);
	assert(model.nextState(3,2) == 0);
	assert(model.nextState(2,4) == 0);
	assert(model.nextState(2,6) == 0);
};

LifeModelTests.prototype.testNextStateDeadNeighbors = function()
{
	//		0	1	2	3
	//	0	.1	X	.2	X				.1 has 1 neighbor -> dead
	//	1	.	.	.3	.				.2 has 2 neighbors -> dead
	//	2	X	.4	.	X				.3 has 3 neighbors -> live
	//	3	X	X	X	X				.4 has 4 neighbors -> dead
	//	4	.5	X	.6	.				.5 has 5 neighbors -> dead
	//	5	X	X	X	.				.6 has 6 neighbors -> dead
	//	6	X	.7	.	.				.7 has 7 neighbors -> dead
	//	7	X	X	X	.				.8 has 8 neighbors -> dead
	//	8	X	.8	X	.
	//	9	X	X	X	.
	var model = new LifeModel(5,10);
	model.fillWith(0);
	model.setAt(1,0,1);
	model.setAt(3,0,1);
	model.setAt(0,2,1);
	model.setAt(3,2,1);
	model.setAt(0,3,1);
	model.setAt(1,3,1);
	model.setAt(2,3,1);
	model.setAt(3,3,1);
	model.setAt(1,4,1);
	model.setAt(0,5,1);
	model.setAt(1,5,1);
	model.setAt(2,5,1);
	model.setAt(0,6,1);
	model.setAt(0,7,1);
	model.setAt(1,7,1);
	model.setAt(2,7,1);
	model.setAt(0,8,1);
	model.setAt(2,8,1);
	model.setAt(0,9,1);
	model.setAt(1,9,1);
	model.setAt(2,9,1);

	assert(model.neighbors(0,0) == 1, "0,0="+model.neighbors(0,0));
	assert(model.neighbors(2,0) == 2, "2,0="+model.neighbors(2,0));
	assert(model.neighbors(2,1) == 3, "2,1="+model.neighbors(2,1));
	assert(model.neighbors(1,2) == 4, "1,2="+model.neighbors(1,2));
	assert(model.neighbors(0,4) == 5, "0,4="+model.neighbors(0,4));
	assert(model.neighbors(2,4) == 6, "2,4="+model.neighbors(2,4));
	assert(model.neighbors(1,6) == 7, "1,6="+model.neighbors(1,6));
	assert(model.neighbors(1,8) == 8, "1,8="+model.neighbors(1,8));

	assert(model.nextState(0,0) == 0);
	assert(model.nextState(2,0) == 0);
	assert(model.nextState(2,1) == 1);
	assert(model.nextState(1,2) == 0);
	assert(model.nextState(0,4) == 0);
	assert(model.nextState(2,4) == 0);
	assert(model.nextState(1,6) == 0);
	assert(model.nextState(1,8) == 0);
};
