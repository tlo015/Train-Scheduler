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

var name;
var destination;
var time;
var frequency;

//on click set the data to the firebase 
$("#submit_button").on("click", function() {
event.preventDefault(); 
    
    //variables
    var name = $("#name_box").val().trim();
    var destination = $("#destination_box").val().trim();
    var time = $("#time_box").val().trim(); 
    var frequency = $("#frequency_box").val().trim();
    
    console.log(name, destination, time, frequency);
    
    // store click extract the data as a single object to hold data, 
    // push data into the database upon clicking submit,
    database.ref().set( {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

//Firebase 
//on("child_added") to retreive employee data from database and display in the table 
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

    //display variables in table html
    var newRow = $("<tr>");
        newRow.append(
            "<td>" + snapshot.val().name + "</td>"
        ).append(
            "<td>" + snapshot.val().destination + "</td>"
        ).append(
            "<td>" + snapshot.val().time + "</td>"
        ).append(
            "<td>" + snapshot.val().frequency + "</td>"
        );
        $("tbody").append(newRow);

    // $("#name_box").text(snapshot.val().name)
    // $("#destination_box").text(snapshot.val().destination)     
    // $("#time_box").text(snapshot.val().time)    
    // $("#frequency_box").text(snapshot.val().frequency)

}, function (errorObject) {
    console.log("Error handled: " + errorObject.code);
});
