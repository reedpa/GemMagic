
function GameTimer() {
    this.zindex = 5;
    
    this.draw = () => {
        graphics.setFont(30, "Consolas");
        graphics.setFillStyle("blue");
        graphics.fillText(ConvertMillisecondsToSecondString(gameTime), 280, 250);
    }

    graphics.addObject(this);
}