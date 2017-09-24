$(document).ready(function () {

	var config = {
	    apiKey: "AIzaSyD_3_vYngtTAfLsVal5F_IMrKK-TMUY-kk",
	    authDomain: "train-scheduler-565ab.firebaseapp.com",
	    databaseURL: "https://train-scheduler-565ab.firebaseio.com",
	    projectId: "train-scheduler-565ab",
	    storageBucket: "train-scheduler-565ab.appspot.com",
	    messagingSenderId: "779787338532"
  	};

  	firebase.initializeApp(config);

  	var database = firebase.database();

  	$("#addTrainButton").click(function (event) {

  		event.preventDefault();

  		var trainName = $("#trainNameInput").val().trim();
  		var trainDestination = $("#destinationInput").val().trim();
  		var firstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "hh:mm").format("hh:mm");
  		var trainFrequency = $("#frequencyInput").val().trim();

  		var newTrain = {
  			name: trainName,
  			destination: trainDestination,
  			time: firstTrainTime,
  			frequency: trainFrequency,
  		};

  		database.ref().push(newTrain);

  		$("#trainNameInput").val("");
  		$("#destinationInput").val("");
  		$("#firstTrainTimeInput").val("");
  		$("#frequencyInput").val("");

  	});

  	database.ref().on("child_added", function (trainAdded) {

  		var trainName = trainAdded.val().name;
  		var trainDestination = trainAdded.val().destination;
  		var firstTrainTime = trainAdded.val().time;
  		var trainFrequency = trainAdded.val().frequency;

  		var trainFrequencyInput = $("#frequencyInput").val().trim();

  		var trainArrival = moment($("#firstTrainTimeInput").val().trim(), "hh:mm").format("hh:mm");

  		var trainArrivalConverted = moment(trainArrival, "hh:mm").subtract(1, "years");

  		var currentTime = moment().format("hh:mm");

  		console.log(currentTime);

  		var timeDiff = moment().diff(moment(trainArrivalConverted), "minutes");

  		console.log(timeDiff);

  		var timeRemaining = timeDiff % trainFrequencyInput;

  		var minutesTillNextTrain = trainFrequencyInput - timeRemaining;

  		var nextTrain = moment().add(minutesTillNextTrain, "minutes");

  		$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + 
  			trainFrequency + "</td><td>" + trainArrival + "</td><td>" + minutesTillNextTrain + "</td></tr>"); 
  	});

});