function AI() {
    this.aiObjects = [];
    
    this.doActions = function() {
        this.aiObjects.sort(function(left, right) {
            if (!left.order) { left.order = 1;}
            if (!right.order) { right.order = 1;}
            return left.order - right.order;
        });

        for (var i = 0; i < this.aiObjects.length; i++) {
            this.aiObjects[i].doActions();
        }
    };
    
    this.addObject = function(object) {
        this.aiObjects.push(object);
    };
    
    this.removeObject = function(object) {
        for (var i = 0; i < this.aiObjects.length; i++) {
            if (this.aiObjects[i].id === object.id) {
                this.aiObjects.splice(i, 1);
                return;
            }
        }
    }
}