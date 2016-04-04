
function ScoreBoard() {
    this.zindex = 4;
    
    this.currentScore = 0;
    this.currentTurnScore = 0;
    
    var scoreSpeed = 20;
    var currentScoreSpeed = 20;
    
    this.draw = () => {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "20px Arial";
        ctx.fillText("Best Move", 20, 25);
        ctx.fillText(bestMove.toString(), 125, 25);
        ctx.fillText("Score", 20, 50);
        ctx.fillText(this.getScore(), 125, 50);

        ctx.font = "30px Arial";
        ctx.fillText(this.getTurnScore(), 25, 250);
    }
    
    this.getScore = () => {
        if (this.currentScore < score) {
            this.currentScore += Math.min(scoreSpeed, score - this.currentScore);
        }
        return this.currentScore.toString();
    }
    
    this.getTurnScore = () => {
        if (this.currentTurnScore < turnScore) {
            this.currentTurnScore += Math.min(currentScoreSpeed, turnScore - this.currentTurnScore);
            ctx.font = ((this.currentTurnScore % 400) / 10 + 30).toString() + "px Arial";
        } else {
            ctx.font = "30px Arial";
            this.currentTurnScore += Math.max(0 - currentScoreSpeed, turnScore - this.currentTurnScore);
        }
        return this.currentTurnScore.toString();
    }
    
    graphics.addObject(this);
}