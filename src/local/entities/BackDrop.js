function BackDrop() {
    this.zindex = 3;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.image = null;//document.getElementById("trees");
    
    switch(gameStyle) {
        case "Zen":
            this.image = document.getElementById("background_green");
            break;
        case "Score Blitz":
            this.image = document.getElementById("background_red");
            break;
        case "Move Champion":
            this.image = document.getElementById("background_yellow");
            break;
        default:
            this.image = document.getElementById("background_green");
    }
    
    this.draw = function() {
        graphics.setFillStyle("#FFFFFF");
        graphics.drawImage(this.image, 0, 0);
        
        graphics.setFont(25, "Arial");
        graphics.setFillStyle("#000000");
        graphics.fillText("X", 340, 22);
    };
    
    graphics.addObject(this);
}