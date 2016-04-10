
function Audio() {
    
    //expects "soundName" to be the id of your sound element
    //will make sure your sound always gets played even it is always playing
    //probably not appropriate for music and the like but good for sounds that can potentially play more frequently
    //than they are long
    this.playSound = function(soundName) {
        window.setTimeout(this.playSoundAsync, 0, soundName);
    }
    
    this.playSoundAsync = function(soundName) {
        try {
            var sound;
            if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
                sound = document.getElementById(soundName).cloneNode(true);
            } else {
                sound = document.getElementById(soundName);
            }
            sound.pause();
            sound.volume = 0.5;
            sound.currentTime = 0;
            sound.play();
        } catch(e) {}
    }
    
    this.loopSound = function(soundName) {
        try {
            var sound = document.getElementById(soundName);
            if (!sound.loop) {
                sound.pause();
                sound.currentTime = 0;
                sound.loop = true;
                sound.play();
            }
        } catch(e) {}
    }
    
    this.stopSound = function(soundName) {
        try {
            var sound = document.getElementById(soundName);
            sound.pause();
            sound.currentTime = 0;
            sound.loop = false;
        } catch(e) {}
    }
}