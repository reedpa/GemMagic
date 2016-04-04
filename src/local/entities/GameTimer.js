
function GameTimer() {
    this.zindex = 5;
    
    this.draw = () => {
        ctx.font = "30px Consolas";
        ctx.fillStyle = "blue";
        ctx.fillText(ConvertMillisecondsToSecondString(gameTime), 280, 250);
    }

    graphics.addObject(this);
}