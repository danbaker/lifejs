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