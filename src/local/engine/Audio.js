
function Audio() {
    
    //expects "soundName" to be the id of your sound element
    //will make sure your sound always gets played even it is always playing
    //probably not appropriate for music and the like but good for sounds that can potentially play more frequently
    //than they are long
    this.playSound = function(soundName) {
        try {
            var sound = document.getElementById(soundName).cloneNode(true);
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        } catch(e) {}
    }
}