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

// thor = {
// 	lives : 9,
// 	baseSize : 10, // size of player block
// 	dispSize : this.baseSize,// allows making player block bigger for testing purposes
// 	xPos : ((width/2) - (this.dispSize/2)), //starts player in the center of the screen
// 	yPos : ((height/2) - (this.dispSize/2)),
// 	moveSize : 1, //controlls the speed of movement 
// 	isPointing : 1 // 1 = up, 2 = left, 3 = dowwn, 4 = right,
// }

var lives = 9;
var baseSize = 10; // size of player block
var dispSize = baseSize;// allows making player block bigger for testing purposes
var xPos = ((width/2) - (dispSize/2)); //starts player in the center of the screen
var yPos = ((height/2) - (dispSize/2));
var moveSize = 2; //controlls the speed of movement 
var isPointing = 1; // 1 = up, 2 = left, 3 = dowwn, 4 = right,
var lighteningOne = false;
var directionOne = 1;
var startXOne;
var startYOne;





var map = 1; // starts player on the first map
var margin = 20;
var wallThick = 15;

giantOne = {
	x : 20,
	y : 20
}

giantTwo = {
	x : 0,
	y : 0
}

// map stuff
function mapOne(){
	//Grass
	ctx.fillStyle = grassColor;
	ctx.fillRect(0,0, width, height);
	ctx.fill;

	//walls
	ctx.lineWidth = wallThick;
	ctx.fillStyle = '#0000000';
	//top left
	ctx.beginPath();
    ctx.moveTo(0,300);
    ctx.lineTo(0,0);
    ctx.moveTo(0,0);
    ctx.lineTo(450,0);
    ctx.stroke();
    //top right
    ctx.beginPath();
    ctx.moveTo(550,0);
    ctx.lineTo(1000,0);
    ctx.moveTo(1000,0);
    ctx.lineTo(1000,300);
    ctx.stroke();
    //bottom right
    ctx.beginPath();
    ctx.moveTo(1000, 400);
    ctx.lineTo(1000, 700);
	ctx.moveTo(1000, 700);
    ctx.lineTo(550, 700);
    ctx.stroke();
    //bottom left
    ctx.beginPath();
	ctx.moveTo(450,700);
    ctx.lineTo(0,700);
    ctx.moveTo(0,700);
    ctx.lineTo(0,400);
    ctx.stroke();
}

function mapTwo(){
	//Grass
	ctx.fillStyle = waterColor;
	ctx.fillRect(0,0, width, height);
	ctx.fill;


	//walls
	ctx.lineWidth = wallThick;
	ctx.fillStyle = '#0000000';
	//top left
	ctx.beginPath();
    ctx.moveTo(0,300);
    ctx.lineTo(0,0);
    ctx.moveTo(0,0);
    ctx.lineTo(450,0);
    ctx.stroke();
    //top right
    ctx.beginPath();
    ctx.moveTo(550,0);
    ctx.lineTo(1000,0);
    ctx.moveTo(1000,0);
    ctx.lineTo(1000,300);
    ctx.stroke();
    //bottom right
    ctx.beginPath();
    ctx.moveTo(1000, 400);
    ctx.lineTo(1000, 700);
	ctx.moveTo(1000, 700);
    ctx.lineTo(550, 700);
    ctx.stroke();
    //bottom left
    ctx.beginPath();
	ctx.moveTo(450,700);
    ctx.lineTo(0,700);
    ctx.moveTo(0,700);
    ctx.lineTo(0,400);
    ctx.stroke();
}

function drawCanvas() {
	ctx.clearRect(0,0,width,height);
	if (map == 1){
		mapOne();
	}
	else if (map == 2){
		mapTwo();
	}
}

function enterDoor(){ // currently flipflops between 1 and 2 
	dispSize = (baseSize * 4);

	if (map == 1){
		map = 2;
	}
	else if (map == 2){
		map = 1;
	}

	if(yPos <= margin){
		yPos = height - dispSize;//yes
		
	}
	else if(yPos >= height - margin - dispSize ){//no
		yPos = margin;
		
	}
	else if(xPos <= margin){//yes
		xPos = width - dispSize;
		
	}
	else if(xPos >= width - margin - dispSize ){// no
		xPos = margin;
		
	}
}

function thor_movement(){
	// up arrow
	if (keys[38]) {
		isPointing = 1;
		yPos -= moveSize;
		if( yPos <= 0){
			yPos = 0;
		}
	}
	// down arrow
	if (keys[40]) {
		isPointing = 3;
		yPos += moveSize;
		if( yPos >= height - dispSize){
			yPos = height - dispSize;
		}
	}    
	// left arrow
	if (keys[37]) {
		isPointing = 2;
		xPos -= moveSize;
		if( xPos <= 0){
			xPos = 0;
		}
	}
	// right arrow
	if (keys[39]) {
		isPointing = 4;
		xPos += moveSize;
		if( xPos >= width - dispSize){
			xPos = width - dispSize;
		}
	}
}

function moveGiantOne(){
	if (giantOne.x < xPos){
		giantOne.x += 1;
	}
	else if (giantOne.x >= xPos){
		giantOne.x -= 1;
	}
	if (giantOne.y < yPos){
		giantOne.y += 1;
	}
	else if (giantOne.y >= yPos){
		giantOne.y -= 1;
	}
}

function actions(){
	// space
	if (keys[32]) { // space
		dispSize = (baseSize);
		castLightening();// do a fighting (lightening) thing
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

function castLightening(){

	startXOne = (xPos + (dispSize/4));
	startYOne = (yPos + (dispSize/4));
	lighteningOne = true;
	directionOne = isPointing;


	//draw a rectangle, move it in isPointing
}
function drawLightening(){
	if (lighteningOne == true){
		if(directionOne == 1){
			startYOne -= 2;
		}
		if(directionOne == 2){
			startXOne -= 2;
		}
		if(directionOne == 3){
			startYOne += 2;
		}
		if(directionOne == 4){
			startXOne += 2;
		}
	}

	ctx.fillStyle = "#00ffff";
	ctx.fillRect(startXOne, startYOne, (dispSize/2), (dispSize/2));
	ctx.fill();
}

function drawPlayer() {
	drawCanvas();
	ctx.fillStyle = "#000000";
	ctx.fillRect(xPos, yPos,dispSize,dispSize);
	ctx.fill();	
}

function drawGiant() {
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(giantOne.x, giantOne.y,dispSize,dispSize);
	ctx.fill();	
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
		drawCanvas();		
		hasRun = true;	
	}
	
	if (lives === 0) {
		quit();
	}
	
 	requestAnimationFrame(gameLoop);
	
 	thor_movement();
 	actions();
 	drawPlayer();
 	moveGiantOne();
 	drawGiant();
 	drawLightening();
	// 'q' for quit
	if (keys[81]) {  	
		quit();
	}
	
}
