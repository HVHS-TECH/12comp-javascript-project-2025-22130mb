// Game Project
// Written by Max Bergman



// Variables 
var Ballnumber=1;
// Setup 
function setup() {
    console.log("setup: ");
    cnv = new Canvas(1000, 1000); 

    bat = new Sprite(400, 400, 10, 10, 'd');
    bat.color = 'white';

    wallLH = new Sprite(0, 1000, 15, 2000, 'k');
    wallRH = new Sprite(1000, 0, 15, 2000, 'k');
    wallTop = new Sprite(0, 1000, 2000, 15, 'k');
    wallBot = new Sprite(0, 0, 2000, 15, 'k');
    wallLH.color = 'white';
    wallRH.color = 'white';
    wallTop.color = 'white';
    wallBot.color = 'white';
    //creates walls
    BallGroup = new Group();
    for (let i = 0; i < Ballnumber; i++) {
        let Ball = new Sprite(random(100, 900), random(100, 900), 50, 50, 'd');
        BallGroup.add(Ball);
        // code for "balls" making them appear randomly
    }

}
// Draw
function draw() {
	background('black');
    bat.moveTowards(mouseX, mouseY, 1);
}
if (mouse.presses()) {
// this code makes the shape move towards where the mouse is 
shape.moveTo(xPos, yPos, 100);
}
