var canvas;
var ctx;

var graphics = new Graphics();
var ai = new AI();
var interaction;
var mainMenu;
var gameOver;

function InitializeGame() {
    mainMenu = new MainMenu();
}

function main() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    interaction = new Interaction();
    InitializeGame();
    MainLoop();
}

main();