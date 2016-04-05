
var boardWidth = 360;
var boardHeight = 360;
var boardLeft = 0;
var boardTop = 280;

var squareWidth = 360 / 6;
var squareHeight = 360 / 6;

var boardMouseX = 0;
var boardMouseY = 0;

var stateLength = 20;
var nextId = 0;
var score = 0;
var turnScore = 0;
var bestMove = 0;

var dropTime = 0;
var gameTime = 0;
var gameStart = 0;

var gameStyle = "";

function GameBoard(style) {
    this.highlitX = -1;
    this.highlitY = -1;
    this.pieces = [];
    this.grabbedPiece = null;
    this.hoveredPiece = null;
    this.stateCountdown = 0;
    this.state = "playing";
    this.id = "the game board";
    this.backDrop = null;
    this.image = null;
    
    score = 0;
    
    turnScore = 0;
    bestMove = 0;
    dropTime = 0;
    gameTime = 0;
    gameStart = Date.now();
    gameStyle = style;
    
    switch(gameStyle) {
        case "Zen":
            this.image = document.getElementById("board_green");
            break;
        case "Score Blitz":
            this.image = document.getElementById("board_red");
            break;
        case "Move Champion":
            this.image = document.getElementById("board_yellow");
            break;
        default:
            this.image = document.getElementById("board_green");
    }

    this.zindex = 1;
    this.draw = () => {
        ctx.drawImage(this.image, boardLeft, boardTop);
    };
    
    this.doActions = () => {
        this.highLightSquare();

        if (mouseCameDown) {
            this.grabPiece();
        }

        if (mouseCameUp) {
            this.dropPiece();
        }
        
        this.handleTimer();
        this.handleGameTime();
        if (this.stateCountdown > 1) {
            this.stateCountdown--;
        } else if (this.stateCountdown === 1) {
            this.stateCountdown--;
            switch(this.state) {
                case "solving":
                    this.clearPieces();
                    this.state = "clearing";
                    this.stateCountdown = stateLength;
                    break;
                case "clearing":
                    this.repopulateBoard();
                    this.solveBoard();
                    break;
            }
        }
    }

    this.handleTimer = () => {
        if (dropTime > 0) {
            dropTime -= loopStart - loopEnd;
            if (dropTime <= 0) {
                this.dropPiece();
            }
        }
    }
    
    this.handleGameTime = () => {
        if (gameTime > 0 && this.state === "playing") {
            gameTime -= loopStart - loopEnd;
            if (gameTime <= 0) {
                this.endGame();
            }
        }
    }

    this.clearPieces = () => {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].matched) {
                graphics.removeObject(this.pieces[i]);
                this.pieces[i] = null;
            }
        }
    }
    
    this.repopulateBoard = () => {
        for (var i = 0; i < 6; i++) {
            this.repopulateColumn(i);
        }
    }
    
    this.repopulateColumn = (index) => {
        var neededPieces = 0;
        for (var i = 5; i > -1; i--) {
            var piece = i * 6 + index;
            if (!this.pieces[piece]) {
                neededPieces++;
            }
        }
        for (var i = 5; i > -1; i--) {
            var piece = i * 6 + index;
            var nextPiece = (i - 1) * 6 + index;
            if (!this.pieces[piece]) {
                var toDrop = 1;
                while (nextPiece > 0 && !this.pieces[nextPiece]) {
                    toDrop++;
                    nextPiece-=6;
                }
                if (nextPiece >= 0 && this.pieces[nextPiece]) {
                    this.pieces[piece] = this.pieces[nextPiece];
                    this.pieces[nextPiece] = null;
                    this.pieces[piece].top += toDrop;
                }
            }
        }
        for (var i = neededPieces - 1; i >= 0; i--) {
            var newPiece = new GamePiece();
            newPiece.top = i;
            newPiece.left = index;
            newPiece.color = colors[Math.floor(Math.random() * colors.length)];
            newPiece.id = nextId.toString();
            newPiece.oldPixelTop = 640 - ( (6 + neededPieces - i) * squareHeight);
            nextId++;
            this.pieces[i * 6 + index] = newPiece;
        }
    }
    
    this.highLightSquare = () => {
        boardMouseX = mouseX;
        boardMouseY = Math.max(mouseY, boardTop);
        if ((boardMouseX % squareWidth) > 10 && ((boardMouseY - boardTop) % squareHeight > 10)) {
            var newX = Math.floor(boardMouseX / squareWidth);
            var newY = Math.floor((boardMouseY - boardTop) / squareHeight);
            if (newX !== this.highlitX || newY !== this.highlitY) {
                if (this.grabbedPiece && this.grabbedPiece.grabbed) {
                    var tempTop = this.grabbedPiece.top;
                    var tempLeft = this.grabbedPiece.left;
                    var tempPiece = this.getPiece(newY, newX);
                    this.grabbedPiece.top = tempPiece.top;
                    this.grabbedPiece.left = tempPiece.left;

                    tempPiece.top = tempTop;
                    tempPiece.left = tempLeft;
                }
            }
            this.highlitX = newX;
            this.highlitY = newY;
            
            if (this.hoveredPiece) { this.hoveredPiece.hovered = false; }
            this.hoveredPiece = this.getPiece(this.highlitY, this.highlitX);
            if (this.hoveredPiece) { this.hoveredPiece.hovered = true; }
        }
    };

    this.getPiece = (top, left) => {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] && this.pieces[i].top === top && this.pieces[i].left === left) {
                return this.pieces[i];
            }
        }
    }

    this.grabPiece = () => {
        if (mouseX > 340 && mouseY < 22) {
            this.endGame();
        } else if (this.state === "playing") {
            this.grabbedPiece = this.getPiece(this.highlitY, this.highlitX);
            this.grabbedPiece.grabbed = true;
            this.grabbedPiece.zindex = 1000;
            this.unsetMatches();
            
            if (gameStyle !== "Zen") {
                dropTime = 5000;
            }
        }
    };

    this.dropPiece = () => {
        if (this.grabbedPiece && this.grabbedPiece.grabbed) {
            this.ungrabPiece();
            this.solveBoard();
        }
    };
    
    this.ungrabPiece = () => {
        if (this.grabbedPiece && this.grabbedPiece.grabbed) {
            this.grabbedPiece.grabbed = false;
            this.grabbedPiece.zindex = 2;
            dropTime = 0;
        }
    }
    
    this.endGame = () => {
        this.state = "Game Over";
        this.ungrabPiece();

        var now = Date.now();
        if ( (now - gameStart) > topZen && gameStyle === "Zen") {
            topZen = now - gameStart;
            window.localStorage.setItem('TopZen', topZen);
        }
        if (score > topScore && gameStyle === "Score Blitz") {
            topScore = score;
            window.localStorage.setItem('TopScore', topScore);
        }
        if (bestMove > topMove && gameStyle === "Move Champion") {
            topMove = bestMove;
            window.localStorage.setItem('TopMove', topMove);
        }
        gameOver = new GameOver();
    };
    
    this.unsetMatches = () => {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].matched = false;
        }
    }

    this.solveBoard = () => {
        var matched = false;
        this.pieces.sort( (left, right) => {
            return ((left.top * 6 + left.left) - (right.top * 6 + right.left) );
        });

        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                var index = i * 6 + j;
                var downMatches = this.findMatchesDown(index);
                var rightMatches = this.findMatchesRight(index);
                if (downMatches) {
                    for (var k = 0; k < downMatches.length; k++) {
                        matched = true;
                        this.pieces[downMatches[k]].matched = true;
                        turnScore += 100;
                    }
                }
                if (rightMatches) {
                    for (var m = 0; m < rightMatches.length; m++) {
                        matched = true;
                        this.pieces[rightMatches[m]].matched = true;
                        turnScore += 100;
                    }
                }
            }
        }
        
        if (matched) {
            this.state = "solving";
            this.stateCountdown = stateLength;
        } else {
            score += turnScore;
            if (bestMove < turnScore) {
                bestMove = turnScore;
            }
            turnScore = 0;
            this.state = "playing";
        }
    }
    
    this.findMatchesDown = (index) => {
        var ret = [index];
        var colorToSearch = this.pieces[index].color;
        index += 6;
        while (index < this.pieces.length && this.pieces[index].color === colorToSearch) {
            ret.push(index);
            index += 6;
        }
        if (ret.length >= 3) {
            return ret;
        } else {
            return null;
        }
    }
    
    this.findMatchesRight = (index) => {
        var ret = [index];
        var colorToSearch = this.pieces[index].color;
        index += 1;
        while ((index % 6) !== 0 && this.pieces[index].color === colorToSearch) {
            ret.push(index);
            index += 1;
        }
        if (ret.length >= 3) {
            return ret;
        } else {
            return null;
        }
    }

    var colors = ["blue", "green", "red", "purple", "yellow", "pink"];

    for (var i = 0; i < 36; i++) {
        var newPiece = new GamePiece();
        newPiece.top = Math.floor(i / 6);
        newPiece.left = (i % 6);
        newPiece.color = colors[Math.floor(Math.random() * colors.length)];
        newPiece.id = nextId.toString();
        nextId++;
        this.pieces.push(newPiece);
    }
    
    this.backDrop = new BackDrop();
    this.backDrop.height = boardTop;
    this.backDrop.width = boardWidth;
    
    this.scoreBoard = new ScoreBoard();
    this.dropTimer = new DropTimer();

    if (gameStyle === "Score Blitz") {
        gameTime = 60000;
        this.gameTimer = new GameTimer();
    }

}