
function ScoreBoard() {
    this.zindex = 4;
    
    this.currentScore = 0;
    this.currentTurnScore = 0;
    
    var scoreSpeed = 20;
    var currentScoreSpeed = 20;
    
    this.draw = function() {
        graphics.setFillStyle("#FFFFFF");
        graphics.setFont(20, "Arial");
        graphics.fillText("Best Move", 20, 25);
        graphics.fillText(bestMove.toString(), 125, 25);
        graphics.fillText("Score", 20, 50);
        graphics.fillText(this.getScore(), 125, 50);

        graphics.setFont(30, "Arial");
        graphics.fillText(this.getTurnScore(), 25, 250);
    }
    
    this.getScore = function() {
        if (this.currentScore < score) {
            this.currentScore += Math.min(scoreSpeed, score - this.currentScore);
        }
        return this.currentScore.toString();
    }
    
    this.getTurnScore = function() {
        if (this.currentTurnScore < turnScore) {
            this.currentTurnScore += Math.min(currentScoreSpeed, turnScore - this.currentTurnScore);
            graphics.setFont(((this.currentTurnScore % 400) / 10 + 30), "Arial");
        } else {
            graphics.setFont(30, "Arial");
            this.currentTurnScore += Math.max(0 - currentScoreSpeed, turnScore - this.currentTurnScore);
        }
        return this.currentTurnScore.toString();
    }
    
    graphics.addObject(this);
}