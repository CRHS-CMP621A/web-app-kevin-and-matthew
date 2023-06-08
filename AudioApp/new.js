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
let staves = 1
let melodies = []
let notes = ["C", "D", "E", "F", "G", "A", "B"]
class Melody {
    constructor(notes, lengths, title) {
        this.notes = notes;
        this.lengths = lengths;
        this.title = title  
    }

}

const data = JSON.parse(localStorage.getItem("melodies"));
if (data) {
    melodies = data;
}

function changeToSaved(){

    for (let i = 0; i < melodies.length; i ++) {
        let html = `
        <h2 class = melody${i}>${melodies[i].title}</h2>
        <button type = "input" onClick = "playLine(melodies[${i}].notes, melodies[${i}].lengths, tempo)">Play</button>
    `
    document.querySelector(".music-boxes").insertAdjacentHTML("beforeend", html)
}
}

function playNote(frequency, start, duration,) {


    let audioContext = new AudioContext();
    let osc1 = audioContext.createOscillator();
    let osc2 = audioContext.createOscillator();
    let osc3 = audioContext.createOscillator();
    let volume = audioContext.createGain();
    let volume2 = audioContext.createGain();
    let chorus = Number(document.querySelector(".chorus").value)
    let echo = Number(document.querySelector(".echo").value)

    
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
            
    
            playNote(Number(notes[i]), time, 60 / tempo * noteLengths[i],);
        }
    }
}


function addNote(note) {
    if (noteOrLength === 0) {

        notesList.push(note);
        noteOrLength = 1

    }
    else {
        let changeNote = notesList.pop();
        changeNote = note;
        notesList.push(changeNote);
    }

}
function addLength(length) {
    if (noteOrLength === 1) {
        let notesNumber = notesList.length
        let lastNote = notesList.pop()
        let noteHeight = 13 - (Math.round(12 * Math.log2(lastNote / 440)) + 10);

        while (noteHeight < 1) {
            noteHeight += 12;
        }

        lengthsList.push(length);
        noteOrLength = 0
        notesList.push(lastNote);
        createNote(notesNumber, noteHeight, length);
        //positionNote(notesNumber, noteHeight, length);
    }

}
function changeTempo() {
    tempo = Number(document.querySelector(".tempo").value);

}

function upOctave() {
    let lastNote = notesList.pop();
    lastNote = lastNote * 2;
    notesList.push(lastNote);

}

function addDot() {
    let lastLength = lengthsList.pop();
    lastLength = lastLength * 1.5;
    lengthsList.push(lastLength);
}

function createNote(id, position, length) {
    let note = document.createElement("div");
    note.setAttribute("id", `note${id}`);
    note.setAttribute("class", "note")
    
    noteVisuals.push(note);
    let x = 0
    for (let i = 0; i < lengthsList.length - 1; i++) {
        x += lengthsList[i] * 2;
    }
    x += 2 // one to the right of last note plus one to the right of the labels
    if (x + length > 40 * staves) {
        createStaff();
        
    }
    while (x + length > 40) {
        x -= 40;
    }
    document.getElementById(`staff${staves}`).appendChild(note);

    document.querySelector(`#note${id}`).style.gridColumn = `${x} / ${x + length * 2}`
    document.querySelector(`#note${id}`).style.gridRow = `${position} / ${position + 1}`

    
}

function createStaff() {
    staves += 1
    let space = document.createElement("br")
    let newStaff = document.createElement("div");
    let newLabelC = document.createElement("p");
    let node 
    let newLabelCSharp = document.createElement("p");
    let newLabelD = document.createElement("p");
    let newLabelDSharp = document.createElement("p");
    let newLabelE = document.createElement("p");
    let newLabelF = document.createElement("p");
    let newLabelFSharp = document.createElement("p");
    let newLabelG = document.createElement("p");
    let newLabelGSharp = document.createElement("p");
    let newLabelA = document.createElement("p");
    let newLabelASharp = document.createElement("p");
    let newLabelB = document.createElement("p");

    newStaff.setAttribute("class", "staff");
    newStaff.setAttribute("id", `staff${staves}`);
    newLabelC.setAttribute("class", "c-label note-label");
    newLabelCSharp.setAttribute("class", "c-sharp-label note-label");
    newLabelD.setAttribute("class", "d-label note-label");
    newLabelDSharp.setAttribute("class", "d-sharp-label note-label");
    newLabelE.setAttribute("class", "e-label note-label");
    newLabelF.setAttribute("class", "f-label note-label");
    newLabelFSharp.setAttribute("class", "f-sharp-label note-label");
    newLabelG.setAttribute("class", "g-label note-label");
    newLabelGSharp.setAttribute("class", "g-sharp-label note-label");
    newLabelA.setAttribute("class", "a-label note-label");
    newLabelASharp.setAttribute("class", "a-sharp-label note-label");
    newLabelB.setAttribute("class", "b-label note-label");
    document.getElementById("container").appendChild(space);
    document.getElementById("container").appendChild(newStaff);
    node = document.createTextNode("C");
    newLabelC.appendChild(node);
    node = document.createTextNode("C#");
    newLabelCSharp.appendChild(node);
    node = document.createTextNode("D");
    newLabelD.appendChild(node);
    node = document.createTextNode("D#");
    newLabelDSharp.appendChild(node);
    node = document.createTextNode("E");
    newLabelE.appendChild(node);
    node = document.createTextNode("F");
    newLabelF.appendChild(node);
    node = document.createTextNode("F#");
    newLabelFSharp.appendChild(node);
    node = document.createTextNode("G");
    newLabelG.appendChild(node);
    node = document.createTextNode("G#");
    newLabelGSharp.appendChild(node);
    node = document.createTextNode("A");
    newLabelA.appendChild(node);
    node = document.createTextNode("A#");
    newLabelASharp.appendChild(node);
    node = document.createTextNode("B");
    newLabelB.appendChild(node);


    document.getElementById(`staff${staves}`).appendChild(newLabelC);
    document.getElementById(`staff${staves}`).appendChild(newLabelCSharp);
    document.getElementById(`staff${staves}`).appendChild(newLabelD);
    document.getElementById(`staff${staves}`).appendChild(newLabelDSharp);
    document.getElementById(`staff${staves}`).appendChild(newLabelE);
    document.getElementById(`staff${staves}`).appendChild(newLabelF);
    document.getElementById(`staff${staves}`).appendChild(newLabelFSharp);
    document.getElementById(`staff${staves}`).appendChild(newLabelG);
    document.getElementById(`staff${staves}`).appendChild(newLabelGSharp);
    document.getElementById(`staff${staves}`).appendChild(newLabelA);
    document.getElementById(`staff${staves}`).appendChild(newLabelASharp);
    document.getElementById(`staff${staves}`).appendChild(newLabelB);
}

function deleteNote() {
    let removeNote = document.getElementById(`note${notesList.length}`);
    removeNote.remove();
    notesList.pop();
    lengthsList.pop();
    
}

function save() {
    let title = document.querySelector(".title").value;
    newMelody = new Melody(notesList, lengthsList, title);
    melodies.push(newMelody);
    localStorage.setItem("melodies", JSON.stringify(melodies));
}
