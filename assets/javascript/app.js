var config = {
    apiKey: "AIzaSyBs-LMND4VzFjF0kL_udcvJlIm7jFvuoMw",
    authDomain: "postsforhotthisweekend.firebaseapp.com",
    databaseURL: "https://postsforhotthisweekend.firebaseio.com",
    projectId: "postsforhotthisweekend",
    storageBucket: "postsforhotthisweekend.appspot.com",
    messagingSenderId: "168090664160"
};

firebase.initializeApp(config);

var database = firebase.database();

var messageBoard = database.ref("/messages")

$(document).ready(function () {
    $("#postForm").hide();
});

var userName;
var zipCode;
var city;
var state;
var date;
var condition;
var highTemp;
var lowTemp;
var zipKey;
var queryUrl;
$("#nameSubmit").on("click", function (event) {
    event.preventDefault();
    userName = $("#screenName").val().trim();
    $("#namePick").hide();
    $("#postForm").show();
});
$("#zipSubmit").on("click", function(event){
    event.preventDefault();
    $("#location").empty();
    $("#forecast").empty();
    zipCode = $("#zipCode").val().trim();
    queryUrl = "https://dataservice.accuweather.com/locations/v1/search?q=" + zipCode + "&apikey=SrginRltEdOGpYssHXGe2dd3lecyyXgh"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response[0].Key);
        zipKey = response[0].Key
        state = response[0].AdministrativeArea.EnglishName
        city = response[0].LocalizedName
        $("#location").append("<div><p>City: " + city + "</p></div><div><p>State: " + state + "</p></div>")
        console.log(city);
        console.log(state);
        var zipQuery = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + zipKey + "?apikey=SrginRltEdOGpYssHXGe2dd3lecyyXgh"
        $.ajax({
            url: zipQuery,
            method: "GET"
        }).then(function (zipResponse) {
            console.log(zipResponse);
            for (var i = 0; i < zipResponse.DailyForecasts.length; i++) {
                date = zipResponse.DailyForecasts[i].Date
                condition = zipResponse.DailyForecasts[i].Night.IconPhrase
                highTemp = zipResponse.DailyForecasts[i].Temperature.Maximum.Value
                lowTemp = zipResponse.DailyForecasts[i].Temperature.Minimum.Value
                $("#forecast").append("<div><p>Date: " + date + "</p></div><div><p>Condition: " + condition + "</p></div><div><p>High Temperature: " + highTemp + " F</p></div><div><p>Low Temperature: " + lowTemp + " F</p></div>")
            };
        });
        
    });
});
    
$("#postSubmit").on("click", function (event) {
    event.preventDefault();
    var message = $("#post").val().trim();
    messageBoard.push({
        "name": userName,
        "message": message
    });
    $("#post").val('');
});

messageBoard.on("child_added", function (snapshot) {
    var name = snapshot.val().name
    var message = snapshot.val().message
    $("#messages").prepend(name + ": " + message + "<br>")
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
