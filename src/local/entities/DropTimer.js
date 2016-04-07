
function DropTimer() {
    
    this.zindex = 5;
    
    this.draw = function() {
        if (dropTime > 0) {
            var sizeMod = Math.floor((5000 - dropTime) / 200);
            var size = sizeMod + 50; 
            graphics.setFont(size, "Arial");
            graphics.setFillStyle("red");
            graphics.fillText(ConvertMillisecondsToSecondString(dropTime) + " s", 100 - sizeMod, 175);
        }
    };
    
    graphics.addObject(this);
}