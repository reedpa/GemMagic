var numTrickShots = 0;

function TrickShotLabel() {
    this.image = document.getElementById("trickshot_text");
    this.top = 0;
    this.left = 0;
    this.ticksToLive = 33;
    this.zindex = 10001;
    this.id = "trickshot" + numTrickShots.toString();
    numTrickShots++;

    this.draw = function() {
        graphics.drawImageRotated(this.image, 0 - 20*Math.PI/180, this.left, this.top);
    }
    
    this.doActions = function() {
        this.ticksToLive--;
        if (this.ticksToLive < 0) {
            ai.removeObject(this);
            graphics.removeObject(this);
        }
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}