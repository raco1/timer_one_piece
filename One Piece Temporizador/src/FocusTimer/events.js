import * as el from './elements.js'
import * as actions from './actions.js'
import * as sounds from './sounds.js'
import * as timer from './timer.js'
import state from './state.js'

export function registerControls() {

    // controles 
    el.controls.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        if (typeof actions[action] != 'function') {
            return;
        }
        actions[action]();
    })

    // começar e pausar a musica
    for (var i = 0; i < el.playTheme.length; i++) {
        el.playTheme[i].addEventListener('click', element => {
            actions.musica(element.target.dataset.music);
        });
    }

    // volume do input
    for (var i = 0; i < el.items.length; i++) {
        el.items[i].addEventListener('change', element => {
    
            // Volume a ser alterado
            // Valor do input que foi alterado
            let volumeAlterado = element.currentTarget.value;
            
            // Aonde eu vou alterar o volume
            let elemento = document.getElementById(element.currentTarget.id).dataset.name;
    
            sounds.sounds[elemento].volume = volumeAlterado;
            
            sounds.sounds[elemento].audio.volume = sounds.sounds[elemento].volume;
        });
    }
};

export function setMinutes() {

    // dar foco à caixa para alterar os minutos
    el.minutes.addEventListener('focus', () => {
        el.minutes.textContent = '';
    });

    // permitir apenas números na caixa de minutos
    el.minutes.onkeydown = (event) => /\d/.test(event.key);

    // permitir até 60 minutos
    el.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent;
        time = time > 60 ? 60 : time;

        state.minutes = time;
        state.seconds = 0;

        timer.updateDisplay();
    })
};