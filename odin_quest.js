// colors
var grassColor = "#02B109";
var waterColor = "#1865ed";

// sounds
var gameMusic = new Audio("music_one.wav");


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
var score = 0;
var baseSize = 40; // size of player block
var dispSize = baseSize;// allows making player block bigger for testing purposes 
var walkAnimFrame = 0;

var thorPicOneN = new Image();
thorPicOneN.src = 'thor_one_n.png';

var thorPicTwoN = new Image();
thorPicTwoN.src = 'thor_two_n.png';

var thorPicOneE = new Image();
thorPicOneE.src = 'thor_one_e.png';

var thorPicTwoE = new Image();
thorPicTwoE.src = 'thor_two_e.png';

var thorPicOneS = new Image();
thorPicOneS.src = 'thor_one_s.png';

var thorPicTwoS = new Image();
thorPicTwoS.src = 'thor_two_s.png';

var thorPicOneW = new Image();
thorPicOneW.src = 'thor_one_w.png';

var thorPicTwoW = new Image();
thorPicTwoW.src = 'thor_two_w.png';


var xPos = ((width/2) - (dispSize/2)); //starts player in the center of the screen
var yPos = ((height/2) - (dispSize/2));
var moveSize = 2; //controlls the speed of movement 
var isPointing = 1; // 1 = up, 2 = left, 3 = dowwn, 4 = right,
var lighteningOne = false;
var directionOne = 1;
var startXOne;
var startYOne; // add code to kill lightening once off screen


var map = 1; // starts player on the first map
var margin = 40;
var wallThick = 15;

var tGateSize = 20;
var rGateSize = 940;
var bGateSize = 640;
var lGateSize = 20;


giantOne = {
	x : 20,
	y : 20,
	alive : true,
	animFrame : 0
}
giantPointing = 1;

var giantPicOneN = new Image();
giantPicOneN.src = 'giant_one_n.png';

var giantPicTwoN = new Image();
giantPicTwoN.src = 'giant_two_n.png';

var giantPicOneE = new Image();
giantPicOneE.src = 'giant_one_e.png';

var giantPicTwoE = new Image();
giantPicTwoE.src = 'giant_two_e.png';

var giantPicOneS = new Image();
giantPicOneS.src = 'giant_one_s.png';

var giantPicTwoS = new Image();
giantPicTwoS.src = 'giant_two_s.png';

var giantPicOneW = new Image();
giantPicOneW.src = 'giant_one_w.png';

var giantPicTwoW = new Image();
giantPicTwoW.src = 'giant_two_w.png';


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
	if (map == 1){
		map = 2;
	}
	else if (map == 2){
		map = 1;
	}
	// top and left dont ,  bottom and right work
	if(yPos <= tGateSize){ // is it up
		yPos = bGateSize - 10;//
	}
	else if(xPos <= lGateSize){// is it left
		xPos = rGateSize - 10;	
	}
	else if(xPos >= rGateSize ){// is it right
		xPos = lGateSize + 10;	
	}
	else if(yPos >= bGateSize ){// is it down
		yPos = tGateSize + 10;	
	}
	giantStart();
}

function thor_movement(){
	// up arrow
	if (keys[38]) {
		isPointing = 1;
		yPos -= moveSize;
		if( yPos <= 0){
			yPos = 0;
		}
		walkAnimFrame += 1;
	}
	// down arrow
	if (keys[40]) {
		isPointing = 3;
		yPos += moveSize;
		if( yPos >= height - dispSize){
			yPos = height - dispSize;
		}
		walkAnimFrame += 1;
	}    
	// left arrow
	if (keys[37]) {
		isPointing = 2;
		xPos -= moveSize;
		if( xPos <= 0){
			xPos = 0;
		}
		walkAnimFrame += 1;
	}
	// right arrow
	if (keys[39]) {
		isPointing = 4;
		xPos += moveSize;
		if( xPos >= width - dispSize){
			xPos = width - dispSize;
		}
		walkAnimFrame += 1;
	}
}
function giantStart(){
	giantOne.x = ((Math.random() * 1000) + 50);
	giantOne.y = ((Math.random() * 700) + 35);
	giantOne.alive = true;
}
function moveGiantOne(){
	var xDiff;
	var yDiff;

	if (giantOne.x < xPos){
		xDiff = xPos - giantOne.x;
		giantOne.x += 1;
		giantPointing = 2;
	}
	else if (giantOne.x >= xPos){
		xDiff = giantOne.x - xPos;

		giantOne.x -= 1;
		giantPointing = 4;
	}
	if (giantOne.y < yPos){
		yDiff = yPos - giantOne.y;
		giantOne.y += 1;
		giantPointing = 3;
	}
	else if (giantOne.y >= yPos){
		yDiff = giantOne.y - yPos;
		giantOne.y -= 1;
		giantPointing = 1;
	}



	giantOne.animFrame += 1;

}

function actions(){
	// space
	if (keys[32]) { // space
		castLightening();// do a fighting (lightening) thing
	}

	if (keys[17] == true) { // ctrl

		// go thru doors
		if(((xPos > 450 )&&(xPos < 550)) && ((yPos > 620) || (yPos < 15))) { //top and bottom doors
			enterDoor();
		}
		if(((yPos > 300 )&&(yPos < 400)) && ((xPos > 920) || (xPos < 15))) { // left and right doors
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
			if(startYOne <= 0){
				lighteningOne = false;
			}
		}
		if(directionOne == 2){
			startXOne -= 2;
			if(startXOne <= 0){
				lighteningOne = false;
			}
		}
		if(directionOne == 3){
			startYOne += 2;
			if(startYOne >= 700){
				lighteningOne = false;
			}
		}
		if(directionOne == 4){
			startXOne += 2;
			if(startXOne >= 1000){
				lighteningOne = false;
			}
		}
	

		ctx.fillStyle = "#00ffff";
		ctx.fillRect(startXOne, startYOne, (dispSize/2), (dispSize/2));
		ctx.fill();
	}
}

// function drawPlayer() { // draw player as a square
// 	drawCanvas();
// 	ctx.fillStyle = "#000000";
// 	ctx.fillRect(xPos, yPos,dispSize,dispSize);
// 	ctx.fill();	
// }

function drawPlayer() {
	var thorPicOne
	var thorPicTwo
	if(isPointing == 1){
		thorPicOne = thorPicOneN; 
		thorPicTwo = thorPicTwoN;
	}
	if(isPointing == 4){// dirtections are labeled backwards somewhere
		thorPicOne = thorPicOneE;
		thorPicTwo = thorPicTwoE;
	}
	if(isPointing == 3){
		thorPicOne = thorPicOneS;
		thorPicTwo = thorPicTwoS;
	}
	if(isPointing == 2){// dirtections are labeled backwards somewhere
		thorPicOne = thorPicOneW;
		thorPicTwo = thorPicTwoW;
	}

	if (walkAnimFrame < 10) {
		ctx.beginPath();
		ctx.drawImage(thorPicOne, xPos, yPos, 40, 40);
		ctx.closePath();
	}
	else if (walkAnimFrame > 9) {
		ctx.beginPath();
		ctx.drawImage(thorPicTwo, xPos, yPos, 40, 40);
		ctx.closePath();
		
		if(walkAnimFrame > 19){
			walkAnimFrame = 0;
		}
	}// draw player from a .png (40px,40px)
}

// function drawGiant() { // draw as a square
// 	if (giantOne.alive == true){
// 		ctx.fillStyle = "#ff0000";
// 		ctx.fillRect(giantOne.x, giantOne.y,dispSize,dispSize);
// 		ctx.fill();	
// 	}
// }

function drawGiant() { //draw as .png
	var giantPicOne
	var giantPicTwo
	if (giantOne.alive == true){
		if(giantPointing == 1){
			giantPicOne = giantPicOneN; 
			giantPicTwo = giantPicTwoN;
		}
		if(giantPointing == 4){// dirtections are labeled backwards somewhere
			giantPicOne = giantPicOneE;
			giantPicTwo = giantPicTwoE;
		}
		if(giantPointing == 3){
			giantPicOne = giantPicOneS;
			giantPicTwo = giantPicTwoS;
		}
		if(giantPointing == 2){// dirtections are labeled backwards somewhere
			giantPicOne = giantPicOneW;
			giantPicTwo = giantPicTwoW;
		}

		if (giantOne.animFrame < 10) {
			ctx.beginPath();
			ctx.drawImage(giantPicOne, giantOne.x, giantOne.y, 40, 40);
			ctx.closePath();
		}
		else if (giantOne.animFrame > 9) {
			ctx.beginPath();
			ctx.drawImage(giantPicTwo, giantOne.x, giantOne.y, 40, 40);
			ctx.closePath();
			
			if(giantOne.animFrame > 19){
				giantOne.animFrame = 0;
			}
		}
	}// draw player from a .png (40px,40px)
}
function lighteningStrike() {
	if((startXOne >= (giantOne.x - dispSize))&&(startXOne <= (giantOne.x + dispSize))
		&&(startYOne >= (giantOne.y - dispSize))&&(startYOne <= (giantOne.y + dispSize))){
		if(giantOne.alive == true){
			giantOne.x = 1100;
			giantOne.y = 800;
			giantOne.alive = false;
			score += 10;
		}
	}
}

function quit() {
	hasRun = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	xPos = ((width/2) - (dispSize/2));
	yPos = ((height/2) - (dispSize/2));
	giantOne.alive = true;
}
function stopMusic(){
	gameMusic.pause();

}

//------------------ gameloop ---------------------------------------------------------
function gameLoop(){
	
	if (hasRun === false) {
		giantStart();
		// initalise all game variables here
		drawCanvas();	
		gameMusic.play();	
		hasRun = true;
		score = 0;	
	
	}
	
	if (lives === 0) {
		quit();
	}

	
	drawCanvas();
 	thor_movement();
 	actions();
 	drawPlayer();
 	moveGiantOne();
 	drawGiant();
 	drawLightening();
 	lighteningStrike();	
 	requestAnimationFrame(gameLoop);
	// 'q' for quit
	if (keys[81]) {  	
		quit();
	}
	document.getElementById("score").innerHTML = score;
}