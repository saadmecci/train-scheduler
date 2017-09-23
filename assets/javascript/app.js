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
  		var firstTrainTime = $("#firstTrainTimeInput").val().trim();
  		var trainFrequency = $("#frequencyInput").val().trim();

  		var newTrain = {
  			name: trainName,
  			destination: trainDestination,
  			time: firstTrainTime,
  			frequency: trainFrequency,
  		};

  		console.log(newTrain.name);
  		console.log(newTrain.destination);
  		console.log(newTrain.time);
  		console.log(newTrain.frequency);

  		database.ref().push(newTrain);

  		$("#trainNameInput").val("");
  		$("#destinationInput").val("");
  		$("#firstTrainTimeInput").val("");
  		$("#frequencyInput").val("");

  	});


});