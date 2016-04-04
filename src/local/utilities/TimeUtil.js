
function ConvertMillisecondsToSecondString(inTime) {
    inTime = Math.max(inTime, 0);
    var seconds = Math.floor(inTime / 1000).toString();
    var afterSeconds = Math.floor((inTime % 1000) / 10).toString();
    afterSeconds.length < 2 ? afterSeconds = "0" + afterSeconds : afterSeconds = afterSeconds;
    
    return seconds + "." + afterSeconds;
}