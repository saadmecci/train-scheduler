$(document).ready(function () {

	//initialize firebase
	var config = {
	    apiKey: "AIzaSyD_3_vYngtTAfLsVal5F_IMrKK-TMUY-kk",
	    authDomain: "train-scheduler-565ab.firebaseapp.com",
	    databaseURL: "https://train-scheduler-565ab.firebaseio.com",
	    projectId: "train-scheduler-565ab",
	    storageBucket: "train-scheduler-565ab.appspot.com",
	    messagingSenderId: "779787338532"
  	};

  	firebase.initializeApp(config);

  	//store firebase data into a variable
  	var database = firebase.database();


  	//sumbit button click function to capture and store user data
  	$("#addTrainButton").click(function (event) {

  		//prevents page from reloading
  		event.preventDefault();

  		//store user input into variables
  		var trainName = $("#trainNameInput").val().trim();
  		var trainDestination = $("#destinationInput").val().trim();
  		var firstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "hh:mm").format("hh:mm");
  		var trainFrequency = $("#frequencyInput").val().trim();

  		//object to push user input into data base
  		var newTrain = {
  			name: trainName,
  			destination: trainDestination,
  			time: firstTrainTime,
  			frequency: trainFrequency,
  		};

  		//push into firebase database
  		database.ref().push(newTrain);

  		//clear input fields for next input
  		$("#trainNameInput").val("");
  		$("#destinationInput").val("");
  		$("#firstTrainTimeInput").val("");
  		$("#frequencyInput").val("");

  	});

  	//function to modify html page and calculate times using moment.js
  	database.ref().on("child_added", function (trainAdded, prevChildKey) {

  		//storing database object values as variables
  		var trainName = trainAdded.val().name;
  		var trainDestination = trainAdded.val().destination;
  		var firstTrainTime = trainAdded.val().time;
  		var trainFrequency = trainAdded.val().frequency;

  		//storing train frequency user input into a variable
  		var trainFrequencyInput = $("#frequencyInput").val().trim();

  		console.log(trainFrequencyInput);

  		//storing train arrival time into a variable as time using moment
  		var trainArrival = moment($("#firstTrainTimeInput").val().trim(), "hh:mm").format("hh:mm");

  		//setting the arrival time back a year to make sure it comes before current time
  		var trainArrivalConverted = moment(trainArrival, "hh:mm").subtract(1, "years");

  		//storing current time in hh:mm format
  		var currentTime = moment().format("hh:mm");

  		console.log(currentTime);

  		//difference between current time and that time 1 year ago
  		var timeDiff = moment().diff(moment(trainArrivalConverted), "minutes");

  		console.log(timeDiff);

  		//get the remainder of dividing time diufference by train frequency
  		var timeRemaining = timeDiff % trainFrequencyInput;

  		//cant figure out the logic of this part; reminder calculation does not yield correct time that I need
  		var minutesTillNextTrain = trainFrequencyInput - timeRemaining;

  		console.log(minutesTillNextTrain);

  		var nextTrain = moment().add(minutesTillNextTrain, "minutes");

  		var nextTrainTime = moment(nextTrain).format("hh:mm");

  		console.log(nextTrainTime);

  		$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + 
  			trainFrequency + "</td><td>" + trainArrival + "</td><td>" + minutesTillNextTrain + "</td></tr>"); 
  	});

});