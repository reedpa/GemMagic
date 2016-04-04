function AI() {
    this.aiObjects = [];
    
    this.doActions = () => {
        for (var i = 0; i < this.aiObjects.length; i++) {
            this.aiObjects[i].doActions();
        }
    };
    
    this.addObject = (object) => {
        this.aiObjects.push(object);
    };
    
    this.removeObject = (object) => {
        for (var i = 0; i < this.aiObjects.length; i++) {
            if (this.aiObjects[i].id === object.id) {
                this.aiObjects.splice(i, 1);
                return;
            }
        }
    }
}