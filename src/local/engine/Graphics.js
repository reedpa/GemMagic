var scaleFactor = 1;

function Graphics() {
    this.graphicsObjects = [];

    this.draw = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.graphicsObjects.sort((left, right) => {
            return left.zindex - right.zindex;
        });

        for (var i = 0; i < this.graphicsObjects.length; i++) {
            this.graphicsObjects[i].draw();
        }
    };
    
    this.addObject = (object) => {
        this.graphicsObjects.push(object);
    };
    
    this.removeObject = (object) => {
        for (var i = 0; i < this.graphicsObjects.length; i++) {
            if (this.graphicsObjects[i].id === object.id) {
                this.graphicsObjects.splice(i, 1);
                return;
            }
        }
    }

    this.drawImage = (image, x, y, width, height) => {
        if (!width) { width = image.width; }
        if (!height) { height = image.height; }
        ctx.drawImage(image, x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }

    this.setFont = (fontSize, font) => {
        ctx.font = (fontSize * scaleFactor).toString() + "px " + font;
    }

    this.setFillStyle = (fillStyle) => {
        ctx.fillStyle = fillStyle;
    }

    this.setLineWidth = (lineWidth) => {
        ctx.lineWidth = lineWidth * scaleFactor;
    }

    this.setStrokeStyle = (strokeStyle) => {
        ctx.strokeStyle = strokeStyle;
    }

    this.setGlobalAlpha = (globalAlpha) => {
        ctx.globalAlpha = globalAlpha;
    }

    this.fillText = (text, x, y) => {
        ctx.fillText(text, x * scaleFactor, y * scaleFactor);
    }

    this.strokeRect = (x, y, width, height) => {
        ctx.strokeRect(x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }

    this.fillRect = (x, y, width, height) => {
        ctx.fillRect(x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }

    this.calculateScaleFactor = () => {
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