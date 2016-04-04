var debugMessage = "All's well";
var lastSecond = Date.now();
var totalTicks = 0;
var ticks = 0;
var tps = 0;

var loopStart;
var loopEnd;

function MainLoop() {
    loopStart = Date.now();

    try {
        totalTicks++;
        ticks++;

        ai.doActions();
        graphics.draw();

        calcTicksPerSecond();
    } catch (e) {
        console.log("Exception! " + e.toString());
    }

    loopEnd = Date.now();

    window.setTimeout(MainLoop, Math.max(30 - (loopEnd - loopStart), 0));
}

function writeDebugInfo() {
    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.fillText(tps.toString(), 320, 30);
    ctx.fillText(totalTicks.toString(), 30, 60);
    ctx.fillText(debugMessage, 30, 90);
}

function calcTicksPerSecond() {
    var now = Date.now();
    if (now - lastSecond > 1000) {
        tps = ticks;
        ticks = 0;
        lastSecond = now;
    }
}