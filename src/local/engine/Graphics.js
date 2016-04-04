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
}