// Game Project
// Written by Max Bergman

// Variables
var timerValue = 10;
var Ballnumber = 1; // Only one ball will be on screen at a time
var Score = 0;
var timer = 10;
var currentBall; // The current ball object
var imgFace;
var gamestate = Start;

function preload() {
    imgBG = loadImage('pixil-frame-0.png');
    imgFace = loadImage('pixil-frame-0.png'); // Load the image for the ball
}

function setup() {
    console.log("setup: ");
    createCanvas(1000, 1000);

    imgFace.resize(150, 150); // Resize image so it fits properly

    bat = new Sprite(400, 400, 10, 10, 'd');
    bat.color = 'white';

    // Create walls
    wallLH = new Sprite(0, 500, 15, 1000, 'k');
    wallRH = new Sprite(1000, 500, 15, 1000, 'k');
    wallTop = new Sprite(500, 0, 1000, 15, 'k');
    wallBot = new Sprite(500, 1000, 1000, 15, 'k');

    wallLH.color = 'white';    wallRH.color = 'white';
    wallTop.color = 'white';
    wallBot.color = 'white';

    // Create the first ball
    createBall();
}

function draw() {
    background('black');

    bat.position.x = mouseX;
    bat.position.y = mouseY;

    score();
    displayTimer();
}

// Function to handle timer
function displayTimer() {
    textSize(100);
    fill('red');
    textAlign(CENTER, CENTER);
    text(timer, width / 2, height / 2);

    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }

    if (timer <= 0) {
        textSize(50);
        text("Game Over!", width / 2, height / 2 + 100);
        noLoop(); // Stops draw loop
    }
}

// Function to handle score display
function score() {
    textSize(35);
    fill('red');
    text("Score: " + Score, 80, 50);
}

// Function to create a new ball with an image
function createBall() {
    currentBall = new Sprite(random(100, 900), random(100, 900), 50, 50, 'k');
    currentBall.img = imgFace; // Assign image to the ball
    currentBall.scale = 0.5; // Scale image if needed

    currentBall.collides(bat, function (ball, bat) {
        ball.remove();
        Score++;
        createBall();
    });
}
