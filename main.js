// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlmokse-C9wnF8hZeQ0rvbgLAfOCFzNmw",
    authDomain: "fetch-data-aa1d6.firebaseapp.com",
    databaseURL: "https://fetch-data-aa1d6-default-rtdb.firebaseio.com",
    projectId: "fetch-data-aa1d6",
    storageBucket: "fetch-data-aa1d6.appspot.com",
    messagingSenderId: "726799531147",
    appId: "1:726799531147:web:ccff8df3413fc74309e88e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {
    getDatabase,
    ref,
    get,
    set,
    child,
    update,
    remove,
    onValue,
    push
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js"
const db = getDatabase();
//   const key = reference.push().getKey();
//   References
var namebox = document.getElementById("Namebox");
var rollbox = document.getElementById("Rollbox");
var secbox = document.getElementById("Secbox");
var hiddenbox = document.getElementById("hiddenId")
var hiddenbox2 = document.getElementById("hiddenId2")

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");
var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");


let a = 1;
let newKey = push(child(ref(db), 'Studentslist')).key;

// let nt = ref(db).child('Studentslist');
// console.log(nt);
let keyArr = [];
// hiddenbox2.value = push(child(ref(db), 'Studentslist')).key;
// get(child(ref(db), "Studentslist/")).then((snapshot) => {
//     if (snapshot.exists()) {
//         console.log(snapshot.val())
//         child(snapshot.val(), "Harshil").then((snap) => {
//             if (snap.exists()) {
//                 console.log(snap)

//             }
//         })
//     }
// })

function insertData() {
    if (namebox.value !== "" && rollbox.value !== "" && secbox.value !== "") {
        set(ref(db, "Studentslist/" + newKey), {
                id: hiddenbox.value,
                Nameofstd: namebox.value,
                PhoneNo: rollbox.value,
                Section: secbox.value,


            })
            .then(() => {
                alert("Data Stored successfully");
                namebox.value = "";
                rollbox.value = "";
                secbox.value = "";
                // hiddenbox2.value = push(child(ref(db), 'Studentslist')).key;
                newKey = push(child(ref(db), 'Studentslist')).key;

                console.log(keyArr);
            })
            .catch((error) => {
                alert("unsuccessful, error" + error);
            })
    } else {
        alert("Please fill in all the fields")
    }

}

// ASSIGN EVENTS TO BTN
insBtn.addEventListener('click', insertData);
selBtn.addEventListener('click', SelectData);
updBtn.addEventListener('click', updateData);
delBtn.addEventListener('click', delData);

// GET DATA FROM DATABASE
function SelectData() {
    const dbref = ref(db);
    get(child(dbref, "Studentslist/")).then((snapshot) => {
            if (snapshot.exists()) {
                namebox.value = snapshot.val().Nameofstd;
                secbox.value = snapshot.val().Section;
                rollbox.value = snapshot.val().PhoneNo;
            } else {
                alert("No Data found");
            }
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        })
}

// UPDATE DATA FROM DATABASE
function updateData() {
    console.log()
    update(ref(db, "Studentslist/" + keyArr[Number.parseInt(hiddenbox.value)-1]), {
            id: hiddenbox.value,
            Nameofstd: namebox.value,
            Section: secbox.value,
            PhoneNo: rollbox.value

        })
        .then(() => {
            alert("Data Updated successfully");
            updBtn.style.display = "none";
            Insbtn.style.display = "block";
            namebox.value = "";
            rollbox.value = "";
            secbox.value = "";
        })
        .catch((error) => {
            alert("unsuccessfull, error" + error);
        })
}
let trow
let td1
let td2
let td3
let td4
let td5
let td6

function AddItemToTable(name, roll, sec) {


    trow = document.createElement("tr");
    td1 = document.createElement('td');
    td2 = document.createElement('td');
    td3 = document.createElement('td');
    td4 = document.createElement('td');
    td5 = document.createElement('td');
    td6 = document.createElement('td');

    td1.innerHTML = ++stdNo;
    td2.innerHTML = name;
    td2.id = "name" + stdNo;
    td3.innerHTML = roll;
    td3.id = "roll" + stdNo;
    td4.innerHTML = sec;
    td4.id = "sec" + stdNo;
    td5.innerHTML = '<button class="btn btn-warning"  onClick="updateSingleData(' + stdNo + ')">UPDATE</button>';
    td6.innerHTML = '<button class="btn btn-danger" onClick="DeleteSingleData(' + stdNo + ')">DELETE</button>';
    //   

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    tbody.appendChild(trow);

}

function AddAllItemsToTable(TheStudent) {
    stdNo = 0;
    tbody.innerHTML = "";
    TheStudent.forEach(element => {
        AddItemToTable(element.Nameofstd, element.PhoneNo, element.Section);
    });
}
// REMOVE DATA FROM DATABASE
function delData() {
    console.log(keyArr[Number.parseInt(hiddenbox.value)-1])
    remove(ref(db, "Studentslist/" + keyArr[Number.parseInt(hiddenbox.value)-1]))
        .then(() => {
            alert("Data deleted successfully");
            delBtn.style.display = "none";
            Insbtn.style.display = "block";
            namebox.value = "";
            rollbox.value = "";
            secbox.value = "";
        })
        .catch((error) => {
            alert("unsuccessfull, error" + error);
        })
}

var stdNo = 0;
var tbody = document.getElementById("tbody1")

window.updateSingleData = function (x) {
    hiddenbox.value = x;
    Namebox.value = document.getElementById("name" + x).innerHTML;
    rollbox.value = document.getElementById("roll" + x).innerHTML;
    secbox.value = document.getElementById("sec" + x).innerHTML;
    insBtn.style.display = "none";
    selBtn.style.display = "none";
    delBtn.style.display = "none";
    updBtn.style.display = "block";


}

window.DeleteSingleData = function (x) {
    hiddenbox.value = x;
    Namebox.value = document.getElementById("name" + x).innerHTML;
    rollbox.value = document.getElementById("roll" + x).innerHTML;
    secbox.value = document.getElementById("sec" + x).innerHTML;
    insBtn.style.display = "none";
    selBtn.style.display = "none";
    delBtn.style.display = "block";
    updBtn.style.display = "none";

}





// GETTING ALL DATA
//     function GetAllDataOnce(){
//      const dbRef= ref(db);
//    get(child(dbRef, "Studentslist"))
//     .then((snapshot)=>{
//         var students = [];
//         snapshot.forEach(childSnapshot => {
//             students.push(childSnapshot.val());
//         });
//         AddAllItemsToTable(students);
//     })};

function GetAllDataRealTime() {

    const dbRef = ref(db, "Studentslist");
    onValue(dbRef, (snapshot) => {
        a = 1;
        hiddenbox.value = 1;
        keyArr=[];

        console.log(snapshot.child('Studentslist').key);
        var students = [];
        snapshot.forEach(childSnapshot => {
            students.push(childSnapshot.val());
            hiddenbox.value++;
            keyArr.push(childSnapshot.key)
            

        });console.log(keyArr)
        AddAllItemsToTable(students);

    })
}
window.onload = GetAllDataRealTime;