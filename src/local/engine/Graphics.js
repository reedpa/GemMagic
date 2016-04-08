var scaleFactor = 1;

function Graphics() {
    this.graphicsObjects = [];

    this.draw = function() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.graphicsObjects.sort(function(left, right) {
            return left.zindex - right.zindex;
        });

        for (var i = 0; i < this.graphicsObjects.length; i++) {
            this.graphicsObjects[i].draw();
        }
    };
    
    this.addObject = function(object) {
        this.graphicsObjects.push(object);
    };
    
    this.removeObject = function(object) {
        for (var i = 0; i < this.graphicsObjects.length; i++) {
            if (this.graphicsObjects[i].id === object.id) {
                this.graphicsObjects.splice(i, 1);
                return;
            }
        }
    }

    this.drawImage = function(image, x, y, width, height) {
        if (!width) { width = image.width; }
        if (!height) { height = image.height; }
        ctx.drawImage(image, x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }
    
    this.drawImageRotated = function(image, rotation, x, y, width, height) {
        if (!width) { width = image.width; }
        if (!height) { height = image.height; }
        ctx.translate(x * scaleFactor, y * scaleFactor);
        ctx.rotate(rotation);
        this.drawImage(image, 0, 0, width, height);
        ctx.rotate(-1 * rotation);
        ctx.translate(-1 * x * scaleFactor, -1 * y * scaleFactor);
    }

    this.setFont = function(fontSize, font) {
        ctx.font = (fontSize * scaleFactor).toString() + "px " + font;
    }

    this.setFillStyle = function(fillStyle) {
        ctx.fillStyle = fillStyle;
    }

    this.setLineWidth = function(lineWidth) {
        ctx.lineWidth = lineWidth * scaleFactor;
    }

    this.setStrokeStyle = function(strokeStyle) {
        ctx.strokeStyle = strokeStyle;
    }

    this.setGlobalAlpha = function(globalAlpha) {
        ctx.globalAlpha = globalAlpha;
    }

    this.fillText = function(text, x, y) {
        ctx.fillText(text, x * scaleFactor, y * scaleFactor);
    }

    this.strokeRect = function(x, y, width, height) {
        ctx.strokeRect(x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }

    this.fillRect = function(x, y, width, height) {
        ctx.fillRect(x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }

    this.calculateScaleFactor = function() {
        var windowHeight = window.innerHeight - 50;
        var myScaleFactor = windowHeight / canvas.height;
        if (myScaleFactor > 1.5) {
            scaleFactor = myScaleFactor;
            canvas.height = canvas.height * scaleFactor;
            canvas.width = canvas.width * scaleFactor;
        }
    }

    if (scaleFactor === 1) { this.calculateScaleFactor(); }
}