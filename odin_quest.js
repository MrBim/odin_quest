// colors
var grassColor = "#02B109";
var waterColor = "#1865ed";

// sounds
//var gameMusic = new Audio("music_one.wav");


// keyboard
var keys = [];


// canvas variables
var width = 1000;
var height = 700; 


// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


// event listeners
document.body.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	keys[e.keyCode] = false;
});


// game elements
var hasRun = false;
var lives = 9;
var baseSize = 10;
var dispSize = baseSize;
var xPos = ((width/2) - (dispSize/2));
var yPos = ((height/2) - (dispSize/2));
var moveSize = 1;
var isPointing
var map = 1;
var margin = 15;
var wallThick = 15;

// map stuff
function mapOne(){
	//Grass
	ctx.fillStyle = grassColor;
	ctx.fillRect(0,0, width, height);
	ctx.fill;


	//walls
	ctx.lineWidth = 15;
	ctx.fillStyle = '#0000000';
	//top wall
	ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(450, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(550, 0);
    ctx.lineTo(1000, 0);
    ctx.stroke();


	//right wall
    ctx.beginPath();
    ctx.moveTo(1000, 0);
    ctx.lineTo(1000, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1000, 400);
    ctx.lineTo(1000, 700);
	ctx.stroke();


	//bottom wall
    ctx.beginPath();
	ctx.moveTo(1000, 700);
    ctx.lineTo(550, 700);
    ctx.stroke();

    ctx.beginPath();
	ctx.moveTo(450, 700);
    ctx.lineTo(0, 700);
    ctx.stroke();

    
	// left wall
    ctx.beginPath();
    ctx.moveTo(0, 700);
    ctx.lineTo(0, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 300);
    ctx.stroke();
}
function mapTwo(){
	//Grass
	ctx.fillStyle = waterColor;
	ctx.fillRect(0,0, width, height);
	ctx.fill;


	//walls
	ctx.lineWidth = 15;
	ctx.fillStyle = '#0000000';
	//top wall
	ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(450, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(550, 0);
    ctx.lineTo(1000, 0);
    ctx.stroke();


	//right wall
    ctx.beginPath();
    ctx.moveTo(1000, 0);
    ctx.lineTo(1000, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1000, 400);
    ctx.lineTo(1000, 700);
	ctx.stroke();


	//bottom wall
    ctx.beginPath();
	ctx.moveTo(1000, 700);
    ctx.lineTo(550, 700);
    ctx.stroke();

    ctx.beginPath();
	ctx.moveTo(450, 700);
    ctx.lineTo(0, 700);
    ctx.stroke();

    
	// left wall
    ctx.beginPath();
    ctx.moveTo(0, 700);
    ctx.lineTo(0, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 300);
    ctx.stroke();
}
function walls(){
	ctx.lineWidth = wallThick;
	ctx.fillStyle = '#0000000';
	//top wall
	ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(450, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(550, 0);
    ctx.lineTo(1000, 0);
    ctx.stroke();


	//right wall
    ctx.beginPath();
    ctx.moveTo(1000, 0);
    ctx.lineTo(1000, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1000, 400);
    ctx.lineTo(1000, 700);
	ctx.stroke();


	//bottom wall
    ctx.beginPath();
	ctx.moveTo(1000, 700);
    ctx.lineTo(550, 700);
    ctx.stroke();

    ctx.beginPath();
	ctx.moveTo(450, 700);
    ctx.lineTo(0, 700);
    ctx.stroke();

    
	// left wall
    ctx.beginPath();
    ctx.moveTo(0, 700);
    ctx.lineTo(0, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 300);
    ctx.stroke();
}

function landscape(){
	ctx.fillStyle = grassColor;
	ctx.fillRect(0,0, width, height);
	ctx.fill;
}

function clearCanvas() {
	ctx.clearRect(0,0,width,height);
	if (map == 1){
		mapOne();
	}
	else if (map == 2){
		mapTwo();
	}
}

function drawPlayer() {
	clearCanvas();
	ctx.fillStyle = "#000000";
	ctx.fillRect(xPos, yPos,dispSize,dispSize);
	ctx.fill();	
}

function movement(){
	// up arrow
	if (keys[38]) {
		yPos -= moveSize;
		if( yPos <= 0 + wallThick )
			yPos = 0 +wallThick;
	}
	// down arrow
	if (keys[40]) {
		yPos += moveSize;
		if( yPos >= height - dispSize - wallThick)
			yPos = height - dispSize - wallThick;
	}    
	// left arrow
	if (keys[37]) {
		xPos -= moveSize;
		if( xPos <= 0 + wallThick)
			xPos = 0 + wallThick;
	}
	// right arrow
	if (keys[39]) {
		xPos += moveSize;
		if( xPos >= width - dispSize - wallThick)
			xPos = width - dispSize - wallThick;
	}
}

function enterDoor(){
	dispSize = (baseSize * 4);

	if (map == 1){
		map = 2;
	}
	else if (map == 2){
		map = 1;
	}

	if(yPos <= margin){
		yPos = height - dispSize;
	}
	if(yPos >= height - margin - dispSize ){
		yPos = 0;
	}
}

function actions(){
	// space
	if (keys[32]) { // space
		dispSize = (baseSize);// do a fighting (lightening) thing
	}



	if (keys[17] == true) { // ctrl

		// go thru doors
		if(((xPos > 450 )&&(xPos < 550)) && ((yPos > 685) || (yPos < 15))) {
			enterDoor();
		}
		if(((yPos > 300 )&&(yPos < 400)) && ((xPos > 985) || (xPos < 15))) {
			enterDoor();
		}

		// pick up object
		// if (player close to object){
		// 	add object to inventory and remove from screen
		// }

		// talk to person
		// if (player close to person){
		// 	trigger conversation
		// }
	}
	
}
function quit() {	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	xPos = ((width/2) - (dispSize/2));
	yPos = ((height/2) - (dispSize/2));
}


//------------------ gameloop ---------------------------------------------------------
function gameLoop(){
	
	if (hasRun === false) {
		// initalise all game variables here
		clearCanvas();		
		hasRun = true;	
	}
	
	if (lives === 0) {
		quit();
	}
	
 	requestAnimationFrame(gameLoop);
	
 	movement();
 	actions();
 	drawPlayer();

	// 'q' for quit
	if (keys[81]) {  	
		quit();
	}
	
}
