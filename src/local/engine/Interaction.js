
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
        mouseCameDown = true;
        mouseIsDown = true;
    }
    
    this.handleClick = () => {
        mouseClicked = true;
    }
    
    canvas.addEventListener("mousemove", this.handleMouseMove);
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("click", this.handleClick);
    
    ai.addObject(this);
}