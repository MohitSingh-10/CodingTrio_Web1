// Add note to local storage
// showNotes();
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    showNotes();

    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("text-area-big");

    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please add Note Title and Details")
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});

let clrBtn = document.getElementById("clrBtn");
clrBtn.addEventListener("click", () => {
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("text-area-big");

    addTitle.value = null;
    addTxt.value = null;
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
        <div class="note" id = "noted">
        <div class = "nice">
        <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <textarea name="" id="savedNotes" cols="31" rows="7"> ${element.text}</textarea>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn btn" id="del">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn btn" id="edit">Edit Note</button>
        </div>
        </div>
            `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);
    // let del = document.getElementById("del");
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }

}

// Function to Edit the Note
function editNote(index) {
    let cIndex = index;
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("text-area-big");

    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert("Please clear the form before editing a note")
    }

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    // notesObj.findIndex((element) => {
    //     addTitle.value = element.title;
    //     addTxt.value = element.text;
    // })

    // notesObj.splice(index, 1);
    notesObj.forEach((element, index) => {
        if (index == cIndex) {
            addTitle.value = element.title;
            addTxt.value = element.text;
            notesObj.splice(index, 1);
            // break;
        }
    });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


showNotes();
// console.log("HI");
