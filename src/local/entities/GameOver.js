
function GameOver() {
    this.zindex = 100;
    this.id = "GameOver";
    
    this.button = document.getElementById("buttonwhite");
    
    this.doActions = () => {
        if (mouseClicked) {
            this.loadMainMenu();
        }
    }
    
    this.draw = () => {
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("GAME", 110, 140);
        ctx.fillText("OVER", 110, 190);

        ctx.drawImage(this.button, 110, 220, 120, 40);
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Main Menu", 120, 245);
    }
    
    this.loadMainMenu = () => {
        if (mouseX > 110 && mouseX < 235 && mouseY > 220 && mouseY < 270) {
            graphics.graphicsObjects = null;
            ai.aiObjects = null;
            graphics = null;
            ai = null;
            gameBoard = null;
            mainMenu = null;
            graphics = new Graphics();
            ai = new AI();
            interaction = new Interaction();
            mainMenu = new MainMenu();
            canvas.removeEventListener("click", this.loadMainMenu);
        }
    }
    
    graphics.addObject(this);
    ai.addObject(this);
}