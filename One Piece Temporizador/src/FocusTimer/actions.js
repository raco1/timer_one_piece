import state from './state.js'
import * as sounds from './sounds.js'
import * as el from './elements.js'
import * as timer from './timer.js'

export function toggleRunning() {
    state.isRunning = document.documentElement.classList.toggle('running');
    timer.countdown();
};

export function set() {
    el.minutes.setAttribute('contenteditable', true);
    el.minutes.focus();
};


export function reset() {
    state.isRunning = false;
    document.documentElement.classList.remove('running')
    timer.updateDisplay();
}

export function musica(element) {

    const play = document.querySelector("#" + element);
    const playing = sounds.sounds[element];

    if(playing == undefined){
        return false
    }

    if (state.isPlaying) {
        playing.audio.pause();
    } else {
        playing.audio.play();
        playing.audio.volume = (playing.volume == 0 ? 0.50 : playing.volume);
    };

    playing.audio.onplaying = () => {
        play.classList.add('active');
        state.isPlaying = true;
        playing.audio.loop = true;
    };
    playing.audio.onpause = () => {
        play.classList.remove('active');
        playing.audio.currentTime = 0;
        state.isPlaying = false;
    };
};

