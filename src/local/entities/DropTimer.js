
function DropTimer() {
    
    this.zindex = 5;
    
    this.draw = () => {
        if (dropTime > 0) {
            var sizeMod = Math.floor((5000 - dropTime) / 200);
            var size = sizeMod + 50; 
            ctx.font = size.toString() + "px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(ConvertMillisecondsToSecondString(dropTime) + " s", 100 - sizeMod, 175);
        }
    };
    
    graphics.addObject(this);
}