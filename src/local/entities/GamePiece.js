
function GamePiece() {
    this.color = "black";
    this.top = 0;
    this.left = 0;
    this.grabbed = false;
    this.hovered = false;
    this.matched = false;
    this.id = "";
    
    this.oldPixelLeft = -1;
    this.oldPixelTop = -1;
    
    this.speed = 6;
    this.animating = false;
    
    this.image;

    this.zindex = 2;
    this.draw = function() {
        var offset = 0;
        if (!this.image) {
            this.image = document.getElementById(this.color);
        }
        graphics.setStrokeStyle(this.color);

        if (this.matched) {
            graphics.setLineWidth(5);
            graphics.setStrokeStyle("gold");
            graphics.strokeRect(this.getPixelLeft() + 5, this.getPixelTop() + 5, 50, 50);
        }

        if (this.hovered) {
            offset = 2;
        }
        graphics.setFillStyle("black");
        graphics.setFont(30, "Arial");
        graphics.drawImage(this.image, this.getPixelLeft() + offset, this.getPixelTop() + offset);
    }

    this.getPixelLeft = function() {
        var exactLeft = (this.left * squareWidth);
        if (this.grabbed) {
            this.oldPixelLeft = boardMouseX - 20;
            return boardMouseX - 20;
        } else if (this.oldPixelLeft !== -1 && this.oldPixelLeft !== exactLeft) {
            this.animating = true;
            if (this.oldPixelLeft > exactLeft) {
                this.oldPixelLeft -= Math.min(this.speed, this.oldPixelLeft - exactLeft);
                return this.oldPixelLeft;
            } else {
                this.oldPixelLeft += Math.min(this.speed, exactLeft - this.oldPixelLeft);
                return this.oldPixelLeft;
            }
        }
        this.oldPixelLeft = exactLeft;
        this.animating = false;
        return exactLeft;
    }

    this.getPixelTop = function() {
        var exactTop = (this.top * squareHeight) + boardTop;
        if (this.grabbed) {
            this.oldPixelTop = boardMouseY - 20;
            return boardMouseY - 20;
        } else if (this.oldPixelTop !== -1 && this.oldPixelTop !== exactTop) {
            this.animating = true;
            if (this.oldPixelTop > exactTop) {
                this.oldPixelTop -= Math.min(this.speed, this.oldPixelTop - exactTop);
                return this.oldPixelTop;
            } else {
                this.oldPixelTop += Math.min(this.speed, exactTop - this.oldPixelTop);
                return this.oldPixelTop;
            }
        }
        this.oldPixelTop = exactTop;
        this.animating = false;
        return exactTop;
    }

    graphics.addObject(this);
}