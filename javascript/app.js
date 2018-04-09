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



//on click set the data to the firebase 
$("#submit_button").on("click", function() {
 
    //variables
    var name = $("#name_box").val().trim();
    var destination = $("#destination_box").val().trim();
    var time = $("#time_box").val().trim(); 
    var frequency = $("#frequency_box").val().trim();
    
    console.log(name, destination, time, frequency);
    
    //store click data to Firebase
    database.ref().set( {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("value")

    //display variables in table 
    $("#name_box").text()
    $("#destination_box").text()
    $("#time_box").text() 
    $("#frequency_box").text()