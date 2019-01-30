

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
var conditionImage;

var todayDate = moment().format("YYYYMMDD00")

var futureDate = moment().add(5, 'd').format("YYYYMMDD00")

$("#zipSubmit").on("click", function (event) {
   event.preventDefault();

   var postal = $("#zipCode").val().trim();


   var oArgs = {

      app_key: "nRBrbMVzRwn54MJK",

      q: "music",

      location: postal,

      within: 25,

      "date": todayDate + "-" + futureDate,

      page_size: 10,

      sort_order: "popularity"

   };

   EVDB.API.call("/events/search", oArgs, function (oData) {
       console.log(oData);
      const {
         event
      } = oData.events;
      $("#emptyDiv").empty();

      

      for (i = 0; i < event.length; i++) 
      {
         var newDiv = $("<div>");
         newDiv.text("Starts At: " + moment(event[i].start_time).format("LLLL"));
         newDiv.append(" Venue Name: " + event[i].venue_name + " ");
         if (event[i].performers === null) 
         {
            $("<a>", {href: event[i].url, text: "Buy Tickets"}).appendTo(newDiv);
         } 
         else if (event[i].performers.performer.length > 1) 
         {
            newDiv.append("Performing: ")
            for (j = 0; j < event[i].performers.performer.length; j++) 
            {
               newDiv.append(event[i].performers.performer[j].name + " ");
            }
              $("<a>", {href: event[i].url, text: "Buy Tickets"}).appendTo(newDiv);
         } 
         else 
         {
            newDiv.append("Performer: " + event[i].performers.performer.name);
              $("<a>", {href: event[i].url, text: "Buy Tickets"}).appendTo(newDiv);
         }
         $("#emptyDiv").append(newDiv);
      }
      // Note: this relies on the custom toString() methods below

   });
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
                switch(condition) {
                    case "Sunny":

                    break;
                    case "Mostly sunny":

                    break;
                    case "Partly sunny":

                    break;
                    case "Intermittent clouds":

                    break;
                    case "Hazy sunshine":

                    break;
                    case "Mostly cloudy":

                    break;
                    case "Cloudy":

                    break;
                    case "Fog":

                    break;
                    case "Showers":

                    break;
                    case "Mostly cloudy w/ showers":

                    break;
                    case "Partly sunny w/ showers":

                    break;
                    case "T-storms":

                    break;
                    case "Mostly cloudy w/ t-storms":

                    break;
                    case "Partly sunny w/ t-storms":

                    break;
                    case "Rain":

                    break;
                    case "Flurries":

                    break;
                    case "Mostly cloudy w/ flurries":

                    break;
                    case "Partly sunny w/ flurries":

                    break;
                    case "Ice":

                    break;
                    case "Sleet":

                    break;
                    case "Freezing rain":

                    break;
                    case "Rain and snow":

                    break;
                    case "Hot":

                    break;
                    case "Cold":

                    break;
                    case "Windy":

                    break;
                    case "Clear":

                    break;
                    case "Mostly clear":

                    break;
                    case "Partly cloudy":

                    break;
                    case "Mostly cloudy w/ snow":
                    break;
                    default:
                    
                }

                $("#forecast").append("<div><p>Date: " + date + "</p></div><div><p>Condition: " + condition + "</p></div><div><img src=" + conditionImage + "></div><div><p>High Temperature: " + highTemp + " F</p></div><div><p>Low Temperature: " + lowTemp + " F</p></div>")
            };
        });
        
    });
});



$(document).ready(function () {
    $("#postForm").hide();
});

$("#nameSubmit").on("click", function (event) {
    event.preventDefault();
    userName = $("#screenName").val().trim();
    $("#namePick").hide();
    $("#postForm").show();
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
