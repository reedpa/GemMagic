
function GameOver() {
    this.zindex = 100;
    this.id = "GameOver";
    
    this.button = document.getElementById("buttonwhite");
    
    this.doActions = function() {
        if (mouseCameDown) {
            this.loadMainMenu();
        }
    }
    
    this.draw = function() {
        graphics.setFillStyle("black");
        graphics.setGlobalAlpha(0.2);
        graphics.fillRect(0, 0, canvas.width, canvas.height);
        graphics.setGlobalAlpha(1);
        graphics.setFont(40, "Arial");
        graphics.setFillStyle("white");
        graphics.fillText("GAME", 110, 140);
        graphics.fillText("OVER", 110, 190);

        graphics.drawImage(this.button, 110, 220, 120, 40);
        graphics.setFont(20, "Arial");
        graphics.setFillStyle("black");
        graphics.fillText("Main Menu", 120, 245);
    }
    
    this.loadMainMenu = function() {
        if (mouseX > 110 && mouseX < 235 && mouseY > 220 && mouseY < 270) {
            audio.playSound("buttonclick");
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