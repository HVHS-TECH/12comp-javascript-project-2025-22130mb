// Game Project
// Written by Max Bergman

// Variables 
var timerValue = 10;
var Ballnumber = 1; // Only one ball will be on screen at a time
var Score = 0;
var timer = 10;
var currentBall; // The current ball object

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

    // Create walls

    // Create the first ball
    createBall();
}

// Draw
function draw() {
    background('black');
    bat.moveTowards(mouseX, mouseY, 1);
    score();
    displayTimer();
}

// Function to handle timer
function displayTimer() {
    textSize(25);
    fill('red');
    textAlign(CENTER, CENTER);
    textSize(100);
    text(timer, width / 2, height / 2);

    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }

    if (timer <= 0) {
        // Game ends when the timer hits 0
        textSize(50);
        text("Game Over!", width / 2, height / 2 + 100);
        noLoop(); // got this idea from p5 play website
    }
}

// Function to handle score display
function score() {
    textSize(35);
    text("Score: " + Score, 80, 50);
    fill('red');
}

// Function to create a new ball
function createBall() {
    // Create a new ball at a random spot
    currentBall = new Sprite(random(100, 900), random(100, 900), 50, 50, 'k');
    currentBall.color = 'red'; // Color the ball red

    // Set up collision thing for this ball
    currentBall.collides(bat, function (ball, bat) {
        // If bat touches the ball, add 1 to my score, remove current ball, and spawn a new one
        ball.remove();
        Score++;
        createBall(); // Spawn a new ball after the current one is hit
    });
}
