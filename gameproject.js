// Game Project
// Written by Max Bergman



// Variables 
var timerValue = 10;
var Ballnumber = 5;
var Score = 0;
var timer = 10;
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
        let Ball = new Sprite(random(100, 900), random(100, 900), 50, 'k');
        BallGroup.add(Ball);
    }


    // code for "balls" making them appear randomly
    BallGroup.collides(bat, func2Call);
    function func2Call(BallGroup, bat) {
        if (mouse.pressing > 1) 
        BallGroup.remove();
        Score++;
        
    }
}
// Draw
function draw() {
    /*console.log(mouse.pressing()
    );*/

    background('black');
    bat.moveTowards(mouseX, mouseY, 1);
    score();
    displayTimer();

}


function displayTimer() {
    textSize(25);
    fill('red');
    textAlign(CENTER, CENTER);
    textSize(100);
    text(timer, width / 2, height / 2);

    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }
}

function score() {
    textSize(35);
    text("Score:" + Score, 80, 50);
    fill('red');
}
