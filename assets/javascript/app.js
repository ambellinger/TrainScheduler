 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyClNgHMFMTrRX66voqP9DMdrhdUyjDsje0",
    authDomain: "train-scheduler-9eef7.firebaseapp.com",
    databaseURL: "https://train-scheduler-9eef7.firebaseio.com",
    projectId: "train-scheduler-9eef7",
    storageBucket: "train-scheduler-9eef7.appspot.com",
    messagingSenderId: "972300804241"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = moment($("#frequency-input").val().trim(), "MM/DD/YYYY").format("X");
    var firstTrain = $("#first-train-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: destination,
      freq: frequency,
      first: firstTrain
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.freq);
    console.log(newTrain.first);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var frequency = childSnapshot.val().freq;
    var firstTrain = childSnapshot.val().first;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrain);
  
    ////////MOMENT STUFF/////////////////
    // Prettify the employee start

    //Determine the next time of Arrival
    var nextTimeOfArrival = moment.unix(empStart).format("MM/DD/YYYY");
  
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
     var empMonths = moment().diff(moment(empStart, "X"), "months");
     console.log(empMonths);
  
    // // Calculate the total billed rate
     var empBilled = empMonths * empRate;
     console.log(empBilled);
  ////////MOMENT STUFF/////////////////




    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text("Next Arrival Time"),
      $("<td>").text("Minutes Away")
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });