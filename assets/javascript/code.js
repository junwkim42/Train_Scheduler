  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB_fv4af1SIEt4pEYPMCcOQ2V8PNNKkPVw",
    authDomain: "bootcamp-4a35a.firebaseapp.com",
    databaseURL: "https://bootcamp-4a35a.firebaseio.com",
    projectId: "bootcamp-4a35a",
    storageBucket: "bootcamp-4a35a.appspot.com",
    messagingSenderId: "106449429868",
    appId: "1:106449429868:web:729285412e33598a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var dest = $("#destination").val().trim();
    var fTime = $("#first-train").val().trim();
    var freq = $("#frequency").val().trim();


    var firstTimeConverted = moment(fTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % freq;
 
    var tMinutesTillTrain = freq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    var newSchedule = {
        name: trainName,
        destination: dest,
        first: fTime,
        frequency: freq,
        next: nextTrain,
        mAway: tMinutesTillTrain
    };

    database.ref().push(newSchedule);    

    var trainName = $("#train-name").val("");
    var dest = $("#destination").val("");
    var fTime = $("#first-train").val("");
    var freq = $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var fTime = childSnapshot.val().first;
    var freq = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().next;
    var tMinutesTillTrainv = childSnapshot.val().mAway;
    // Store everything into a variable.

  

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(fTime),
      $("<td>").text(freq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrainv)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });