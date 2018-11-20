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
    var frequency = $("#frequency-input").val().trim();
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
  
    ////////MOMENT STUFF///////
    // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //convert the first time input into a variable
    var firstTime = firstTrain;

    //Covert the first time string into actual time
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    //Take the difference between the current time and the first time. This is basically saying how many
            //minutes have passed between the first time the train left and now
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //Time apart (remainder). 
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    //Minutes until arrival
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
  ////////TABLE STUFF//////////


    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("tbody").append(newRow);
  });