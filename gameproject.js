// Game Project
// Written by Max Bergman


var timerValue = 10;
var Ballnumber = 1; // Number of balls on screen
var Score = 0;
var timer = 10;
var currentBall; // current ball in play
var imgFace, imgHammer;
var Background;
var gameState = "start"; // decides whether the game is set to start, playing or end 
var restartButton; // restarts game 
function preload() {
    // Load all the required images before the game starts
    imgBG = loadImage('images/pixil-frame-0.png');
    imgFace = loadImage('images/pixil-frame-0.png'); // Ball image
    imgHammer = loadImage('images/hammer.png'); // Hammer (bat) image
    Background = loadImage('images/background.png'); // Game background image
}

function setup() {

    createCanvas(1000, 1000);
    imgFace.resize(150, 150);

    // Create the hammer (bat) sprite, initially hidden
    bat = new Sprite(400, 400, 400, 400, 'd');
    bat.img = imgHammer;
    bat.scale = 0.2;

    bat.visible = false; // Makes bat invisible until game start

    // Create wall sprites to keep sprites on screen
    wallLH = new Sprite(0, 500, 15, 1000, 'k');
    wallRH = new Sprite(1000, 500, 15, 1000, 'k');
    wallTop = new Sprite(500, 0, 1000, 15, 'k');
    wallBot = new Sprite(500, 1000, 1000, 15, 'k');


    wallLH.color = 'white';
    wallRH.color = 'white';
    wallTop.color = 'white';
    wallBot.color = 'white';

    //makes walls invisible until game start
    wallLH.visible = false;
    wallRH.visible = false;
    wallTop.visible = false;
    wallBot.visible = false;


    restartButton = createButton("Restart");
    restartButton.position(width / 2 - 50, height / 2 + 75);
    restartButton.mousePressed(restartGame); // restarts game
    restartButton.hide(); // hides button
}

function draw() {
    // Check the current game state and choose the right screen
    if (gameState === "start") {
        showStartScreen();
    } else if (gameState === "playing") {
        background(Background); // make background the background image

        // make all game elements visible during gameplay when the game starts
        bat.visible = true;
        wallLH.visible = true;
        wallRH.visible = true;
        wallTop.visible = true;
        wallBot.visible = true;


        bat.position.x = mouseX;
        bat.position.y = mouseY;

        score();
        displayTimer();
    } else if (gameState === "end") {
        showEndScreen(); // Show the end screen when the game is over
    }
}

function mousePressed() {
    // startss the game when mouse is pressed on the start screen
    if (gameState === "start") {
        gameState = "playing"; // Switch to playing state of game 
        createBall(); // generate the first ball
    }
}

function displayTimer() {
    textSize(100);
    fill('Black');
    textAlign(CENTER, CENTER);
    text(timer, width / 2, height / 2); //  timer in the center 

    if (frameCount % 60 == 0 && timer > 0) {
        timer--; // 60 frames= one second so timer goes down one time per 60 frames
    }

    if (timer <= 0) {
        gameState = "end"; // end game when timer is 0
    }
}

function score() {
    // show the player's score on screen
    textSize(35);
    fill('Black');
    text("Score: " + Score, 80, 50); // 
}

function createBall() {
    if (currentBall) {
        currentBall.remove();
    }

    // Create a new ball at a random position
    currentBall = new Sprite(random(100, 900), random(100, 900), 50, 50, 'k');
    currentBall.img = imgFace;
    currentBall.scale = 0.5;

    //  collision between ball and bat
    currentBall.collides(bat, function (ball, bat) {
        ball.remove(); // Remove the ball 
        Score++; // Increase score
        createBall(); // Generate a new ball afte4r i hit the it with bat
    });
}

function showStartScreen() {
    // start screen with instructions
    background(0);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);
    text("Click to Start", width / 2, height / 2);
    restartButton.hide(); // hides restart button
}

function showEndScreen() {
    background(0);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2); // game over text and line below shows score
    text("Score: " + Score, width / 2, height / 2 + 50);
    restartButton.show(); // show restart button after timer finishes
    
    // Hide sprites when the game is over
    bat.visible = false;
    wallLH.visible = false;
    wallRH.visible = false;
    wallTop.visible = false;
    wallBot.visible = false;

    if (currentBall) {
        currentBall.remove();
    }
}

function restartGame() {
    // restarts the game
    gameState = "start";
    Score = 0; // Reset score
    timer = 10; // Reset timer
    restartButton.hide(); // Hide restart button
    if (currentBall) {
        currentBall.remove(); // this makes sure only one ball spawns after you hit respawn buttton
    }
}
