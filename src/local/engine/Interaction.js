
var mouseX = -1;
var mouseY = -1;
var mouseIsDown = false;
var mouseClicked = false;
var mouseCameUp = false;
var mouseCameDown = false;

function Interaction() {

    this.order = 100000;
    
    mouseX = -1;
    mouseY = -1;
    mouseIsDown = false;
    mouseClicked = false;
    mouseCameUp = false;
    mouseCameDown = false;

    this.doActions = () => {
        //other AI objects get one frame to handle these events and then we clear them
        mouseCameUp = false;
        mouseCameDown = false;
        mouseClicked = false;
    };
    
    this.handleMouseMove = (event) => {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    }
    
    this.handleMouseUp = (event) => {
        mouseIsDown = false;
        mouseCameUp = true;
    }
    
    this.handleMouseDown = () => {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
        mouseCameDown = true;
        mouseIsDown = true;
    }
    
    this.handleClick = () => {
        mouseClicked = true;
    }
    
    this.handleTouchStart = () => {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
        mouseCameDown = true;
        mouseIsDown = true;
    }
    
    this.handleTouchMove = () => {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
    }
    
    this.handleTouchEnd = () => {
        mouseX = -1;
        mouseY = -1;
        mouseCameUp = true;
        mouseIsDown = false;
    }
    
    canvas.addEventListener("mousemove", this.handleMouseMove);
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("click", this.handleClick);
    
    canvas.addEventListener("touchstart", this.handleTouchStart);
    canvas.addEventListener("touchmove", this.handleTouchMove);
    canvas.addEventListener("touchend", this.handleTouchEnd);
    
    ai.addObject(this);
}