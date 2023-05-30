musicNotes = []
let c = document.querySelector(".c");
let d = document.querySelector(".d");
let e = document.querySelector(".e");
let f = document.querySelector(".f");
let g = document.querySelector(".g");
let a = document.querySelector(".a");
let b = document.querySelector(".b");
let play = document.querySelector(".play");
let notesList = []
let lengthsList = []
function playNote(frequency, start, duration) {
console.log(frequency)

let audioContext = new AudioContext();
let osc1 = audioContext.createOscillator();
let osc2 = audioContext.createOscillator();
let volume = audioContext.createGain();

volume.gain.value = 0.1;

osc1.type = "triangle";
osc2.type = "triangle";

osc1.connect(volume);
osc2.connect(volume);
volume.connect(audioContext.destination);

osc1.frequency.value = frequency + 1;
osc2.frequency.value = frequency - 2;

osc1.start(audioContext.currentTime + start);
osc2.start(audioContext.currentTime + start);
osc1.stop(start + duration);
osc2.stop(start + duration);
}

function playLine(notes, noteLengths, tempo) {
    for (let i = 0; i < notes.length; i ++) {
        let time = 0
        for (let j = 0; j<= i; j++) {
            time += noteLengths[j]
        } 
        playNote(Number(notes[i]), time, noteLengths[i]);
    }
}
//playNote(440, 0, 1);
//playNote(659.25, 1, 1);
//playLine([440, 880], [1, 1], 120)
function addNote(note) {
    notesList.push(note);
    lengthsList.push(1);
    console.log(notesList);
}
/*
c.addEventListener("click", addNote(261.63));
d.addEventListener("click", addNote(293.66));
e.addEventListener("click", addNote(329.63));
f.addEventListener("click", addNote(349.23));
g.addEventListener("click", addNote(392.00));
a.addEventListener("click", addNote(440.00));
b.addEventListener("click", addNote(493.88));
play.addEventListener("click", playLine(notesList, lengthsList, 120))
*/
c.addEventListener("click", console.log())