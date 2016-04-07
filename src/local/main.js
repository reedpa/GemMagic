var canvas;
var ctx;

var graphics;
var ai;
var interaction;
var audio;
var mainMenu;
var gameOver;

function InitializeGame() {
    ai = new AI();
    graphics = new Graphics();
    interaction = new Interaction();
    audio = new Audio();
    mainMenu = new MainMenu();
}

function main() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    InitializeGame();
    MainLoop();
}

main();