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
let tempo = 120
let noteOrLength = 0
let noteVisuals = []
function playNote(frequency, start, duration) {
    console.log(frequency)

    let audioContext = new AudioContext();
    let osc1 = audioContext.createOscillator();
    let osc2 = audioContext.createOscillator();
    let osc3 = audioContext.createOscillator();
    let volume = audioContext.createGain();
    let volume2 = audioContext.createGain();
    let chorus = Number(document.querySelector(".chorus").value)
    let echo = Number(document.querySelector(".echo").value)
    console.log(echo)
    
    volume.gain.value = Number(document.querySelector(".volume").value) / 100;
    volume2.gain.value = Number(document.querySelector(".volume").value) / 150
    
    osc1.type = "triangle";
    osc2.type = "triangle";
    osc3.type = "triangle";

    osc1.connect(volume);
    osc2.connect(volume);
    osc3.connect(volume2);
    volume.connect(audioContext.destination);
    volume2.connect(audioContext.destination);
    
    osc1.frequency.value = frequency + (chorus / 50);
    osc2.frequency.value = frequency - (chorus / 25);
    osc3.frequency.value = frequency

    volume.gain.linearRampToValueAtTime(0, start + duration);
    volume2.gain.linearRampToValueAtTime(0, start + duration + (echo / 100))

    osc1.start(audioContext.currentTime + start);
    osc2.start(audioContext.currentTime + start);
    osc3.start(audioContext.currentTime + start);
    osc1.stop(start + duration);
    osc2.stop(start + duration);
    osc3.stop(start + duration + (echo / 50));
}

function playLine(notes, noteLengths, tempo) {
    if (notesList.length === lengthsList.length){ 
        for (let i = 0; i < notes.length; i ++) {
            let time = 0
            for (let j = 0; j<= i; j++) {
                time += 60 / tempo * noteLengths[j]
            } 
            playNote(Number(notes[i]), time, 60 / tempo * noteLengths[i]);
        }
    }
}


function addNote(note) {
    if (noteOrLength === 0) {

        notesList.push(note);
        noteOrLength = 1

    }
    console.log(notesList);
}
function addLength(length) {
    if (noteOrLength === 1) {
        let notesNumber = notesList.length
        let noteHeight = 12 * Math.log2(notesList[-1])
        console.log(noteHeight)
        lengthsList.push(length);
        noteOrLength = 0
        createNote(notesNumber, length);
        positionNote(notesNumber, noteHeight);
    }
    console.log (lengthsList)
}
function changeTempo() {
    tempo = Number(document.querySelector(".tempo").value);
    console.log(tempo);
}

function upOctave() {
    let lastNote = notesList.pop();
    lastNote = lastNote * 2;
    notesList.push(lastNote);
    console.log(notesList);
}

function addDot() {
    let lastLength = lengthsList.pop();
    lastLength = lastLength * 1.5;
    lengthsList.push(lastLength);
}

function createNote(id, length) {
    let note = document.createElement("div");
    note.setAttribute("id", `note${id}`);
    note.setAttribute("class", "note")
    document.getElementById("staff").appendChild(note);
    noteVisuals.push(note);
    console.log(noteVisuals);
    document.querySelector(`#note${id}`).style.position = "absolute";
    document.querySelector(`#note${id}`).style.length = `${length * 10}px`;
}

function positionNote(id, position,) {
    let x = 0
    for (each in lengthsList) {
        x += each;
    }
    document.querySelector(`#note${id}`).style.top = `${336 + position}px`
    document.querySelector(`#note${id}`).style.left = x 

}

function deleteNote() {

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
