var topScore = window.localStorage.getItem('TopScore') || 0;
var topMove = window.localStorage.getItem('TopMove') || 0;
var topZen = window.localStorage.getItem('TopZen') || 0;


function MainMenu() {
    this.zindex = 1;
    this.active = true;
    this.id = "MainMenu";
    this.image = document.getElementById("mainmenu");
    this.titleImage = document.getElementById("title");

    this.lastX = 0;
    this.lastY = 0;

    var gameModes = [
        [145, 165, 65, 50, "Zen", document.getElementById("buttonpurple")],
        [100, 265, 155, 50, "Score Blitz", document.getElementById("buttonred")],
        [65, 365, 230, 50, "Move Champion", document.getElementById("buttonyellow")]
    ];
    
    this.doActions = () => {
        if (mouseClicked) {
            this.handleClick();
        }
        
        this.handleMouseMove();
    }

    this.draw = () => {
        ctx.drawImage(this.image, 0, 0, 360, 640)
        ctx.drawImage(this.titleImage, 90, 0);
        ctx.strokeStyle = "black";
        
        for (var i = 0; i < gameModes.length; i++) {
            var offset = 0;
            if (this.isInside(this.lastX, this.lastY, i)) {
                offset = 1;
            }

            ctx.drawImage(gameModes[i][5], gameModes[i][0] + offset, gameModes[i][1] + offset, gameModes[i][2], gameModes[i][3]);
            ctx.font = "30px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(gameModes[i][4], gameModes[i][0]+5+offset, gameModes[i][1]+32+offset);
        }
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 490, 360, 200);
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
        ctx.fillText("Longest Zen: " + topZen.toString(), 5, 525);
        ctx.fillText("Top Score: " + topScore.toString(), 5, 575);
        ctx.fillText("Top Move: " + topMove.toString(), 5, 625);
    };

    this.handleClick = () => {
        if (this.active) {
            for (var i = 0; i < gameModes.length; i++) {
                if (this.isInside(mouseX, mouseY, i)) {
                    this.initializeGame(i);
                    return;
                }
            }
        }
    };
    
    this.handleMouseMove = () => {
        if (this.active) {
            this.lastX = mouseX;
            this.lastY = mouseY;
        }
    };
    
    this.isInside = (x, y, i) => {
        if (x > gameModes[i][0] && x < (gameModes[i][0] + gameModes[i][2])) {
            if (y > gameModes[i][1] && y < (gameModes[i][1] + gameModes[i][3])) {
                return true;
            }
        }
        return false;
    }

    this.initializeGame = (index) => {
        var gameBoard = new GameBoard(gameModes[index][4]);
        graphics.addObject(gameBoard);
        ai.addObject(gameBoard);
        
        this.active = false;
        graphics.removeObject(this);
    }
    
    if (gameOver !== null) { gameOver = null; }

    graphics.addObject(this);
    ai.addObject(this);
}