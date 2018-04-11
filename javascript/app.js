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

// clear the info in text box
// function clear() {
//     $("#name_box").val("");
//     $("#destination_box").val("");
//     $("#time_box").val(""); 
//     $("#frequency_box").val("");    
// }

//on click set the data to the firebase 
$("#submit_button").on("click", function() { 
    
    //variables
    var name = $("#name_box").val().trim();
    var destination = $("#destination_box").val().trim();
    var time = $("#time_box").val().trim(); 
    var frequency = $("#frequency_box").val().trim();
    console.log(name, destination, time, frequency);

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
database.ref().orderByChild("dataAdded").on("child_added", function (snapshot) {
    console.log(snapshot.val().name, snapshot.val().destination, snapshot.val().frequency, snapshot.val().time)
    
    // Moments.js
    // H HH is 24hour time 
    // h hh with a(am) or A(pm) for 12 hour time 
    //convert userinput into "hh:mm" 
    var time = snapshot.val().time;
    var frequency = snapshot.val().frequency;

    var timeConversion = moment(time,"HH:mm").subtract(1, "years");
    console.log("user time: ", timeConversion);

    var currentTime = moment();
    console.log("current time: ", moment(currentTime).format("hh:mm"));

    var timeDiff = moment().diff(moment(timeConversion), "minutes");
    console.log("time difference: ", timeDiff);

    var remainder = timeDiff % frequency;
    console.log("remainder: ", remainder);

    var nextTrainMin = frequency - remainder;
    console.log("minutes til train: ", nextTrainMin);

    var nextTrainTime = moment().add(nextTrainMin, "minutes");
    console.log("time of next train: ", moment(nextTrainTime).format("HH:mm"));

        //displays in table on html
        var newRow = $("<tr>");
        newRow.append(
            "<td>" + snapshot.val().name + "</td>"
        ).append(
            "<td>" + snapshot.val().destination + "</td>"
        ).append(
            "<td>" + snapshot.val().frequency + "</td>"
        ).append(
            "<td>" + moment(nextTrainTime).format("HH:mm") + "</td>"
        ).append(
            "<td>" + nextTrainMin + "</td>"
        );
        $("tbody").append(newRow);
});


// }, function (errorObject) {
//     console.log("Error handled: " + errorObject.code);
// });
