// Initialize Firebase
var config = {
    apiKey: "AIzaSyALyUBFQJ-JzdpjdLDTVH7tFaCceagxLEc",
    authDomain: "train-information-546dc.firebaseapp.com",
    databaseURL: "https://train-information-546dc.firebaseio.com",
    projectId: "train-information-546dc",
    storageBucket: "train-information-546dc.appspot.com",
    messagingSenderId: "971521657876"
};
  
firebase.initializeApp(config);

var database = firebase.database();

// clear the info in text box so data is not generated multiple times
function clear() {
    $("#name_box").val("");
    $("#destination_box").val("");
    $("#time_box").val(""); 
    $("#frequency_box").val("");    
}

//on click set the data to the firebase 
$("#submit").on("click", function() { 
    
    //variables
    var name = $("#name_box").val().trim();
    var destination = $("#destination_box").val().trim();
    var time = $("#time_box").val().trim(); 
    var frequency = $("#frequency_box").val().trim();
    clear();

    // push data into the database upon clicking submit,
    database.ref().push( {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});


//Firebase 
//on("child_added") to retreive employee data from database and display in the table 
// .orderByChild("dateAdded").on

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    
    console.log(snapshot.val().name, snapshot.val().destination, snapshot.val().frequency, snapshot.val().time)
    
    var newRow = $("<tr>");
    newRow.append(
        "<td>" + snapshot.val().name + "</td>"
    ).append(
        "<td>" + snapshot.val().destination + "</td>"
    ).append(
        "<td>" + snapshot.val().frequency + "</td>"
    ).append(
        "<td>" + "next arrival" + "</td>"
    ).append(
        "<td>" + "minutes away" + "</td>"
    );
    $("tbody").append(newRow);
});

// Moments.js
// H HH is 24hour time 
// h hh with a(am) or A(pm) for 12 hour time 

// }, function (errorObject) {
//     console.log("Error handled: " + errorObject.code);
// });
