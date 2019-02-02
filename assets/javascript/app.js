var weatherTemplate = '<div style="display: inline-block; overflow-x: auto; text-align: center; background-color: aliceblue;"><div><p style="margin: 2px;"><b>$DayOfWeek$</b></p></div><div><img height="75" width="75" src="$Image$"></div><div><p style="margin: 2px;">$Forecast$</p></div><div><p style="margin: 2px;">$Low$F / $High$F</p></div></div>';


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


   function animateCSS(element, animationName, callback) {
      const node = document.querySelector(element)
      
      node.classList.add('animated', animationName)

      function handleAnimationEnd() {
         node.classList.remove('animated', animationName)
         node.removeEventListener('animationend', handleAnimationEnd)

         if (typeof callback === 'function') callback()
      }

      node.addEventListener('animationend', handleAnimationEnd)
   }


   if (postal === "") {

      animateCSS('#zipCode', 'shake')
   } else {
      EVDB.API.call("/events/search", oArgs, function (oData) {
         const {
            event
         } = oData.events;
         $("#emptyDiv").empty();



         var eventTemplate = '<div class="card text-left" style="margin-top: 15px;"><div class="card-heading bg-primary" style="padding: 5px;">$Start$</div><div class="card-body"><b>Venue:</b> $Venue$<br/><b>Performing:</b> $Performing$<br/><button class="btn-primary buy-button" style="padding: 10px; margin-top: 10px;" data-href="$ButtonLink$">Buy Tickets Now</button></div></div>';
         for (i = 0; i < event.length; i++) {
            
           var performing = "";
           if(event[i].performers)
             {
        for (j = 0; j < event[i].performers.performer.length; j++) {
                 performing += event[i].performers.performer[j].name + ",";
           }
             }
           
           
           var eventHTML = eventTemplate.replace('$Start$', moment(event[i].start_time).format("LLLL"))
                                        .replace('$Venue$', event[i].venue_name)
                                        .replace('$Performing$', performing)
                                        .replace('$ButtonLink$', event[i].url);
           
           $("#emptyDiv").append(eventHTML);
         }
         $("#emptyDiv").find('.buy-button').on('click', function() {
            window.open($(this).attr('data-href'));
          })

         // Note: this relies on the custom toString() methods below

      });
   }

    $("#location").empty();
    $("#forecast").empty();
    zipCode = $("#zipCode").val().trim();
    queryUrl = "https://dataservice.accuweather.com/locations/v1/search?q=" + zipCode + "&apikey=oVONGqGATVzjTaufWGgfKCwcCmG6oWBh"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response[0].Key);
        zipKey = response[0].Key
        state = response[0].AdministrativeArea.EnglishName
        city = response[0].LocalizedName
        $("#location").append("<div><p style='margin-bottom: 0px;'>City: " + <b>city</b> + "</p></div><div><p style='margin-top: 2px;'>State: " + <b>state</b> + "</p></div>")
        console.log(city);
        console.log(state);
        var zipQuery = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + zipKey + "?apikey=oVONGqGATVzjTaufWGgfKCwcCmG6oWBh"
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
                switch (condition) {
                    case "Sunny":
                        conditionImage = "assets/images/sun.jpg"
                        break;
                    case "Mostly sunny":
                        conditionImage = "assets/images/sun.jpg"
                        break;
                    case "Partly sunny":
                        conditionImage = "assets/images/cloudy.png"
                        break;
                    case "Intermittent clouds":
                        conditionImage = "assets/images/cloudy.png"
                        break;
                    case "Hazy sunshine":
                        conditionImage = "assets/images/cloudy.png"
                        break;
                    case "Mostly cloudy":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Cloudy":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Fog":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Showers":
                        conditionImage = "assets/images/rain.jpg"
                        break;
                    case "Mostly cloudy w/ showers":
                        conditionImage = "assets/images/rain.jpg"
                        break;
                    case "Partly sunny w/ showers":
                        conditionImage = "assets/images/rain.jpg"
                        break;
                    case "T-storms":
                        conditionImage = "assets/images/thunder.jpg"
                        break;
                    case "Mostly cloudy w/ t-storms":
                        conditionImage = "assets/images/thunder.jpg"
                        break;
                    case "Partly sunny w/ t-storms":
                        conditionImage = "assets/images/thunder.jpg"
                        break;
                    case "Rain":
                        conditionImage = "assets/images/rain.jpg"
                        break;
                    case "Flurries":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Mostly cloudy w/ flurries":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Partly sunny w/ flurries":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Ice":
                        conditionImage = "assets/images/cold.jpg"
                        break;
                    case "Sleet":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Freezing rain":
                        conditionImage = "assets/images/rain.jpg"
                        break;
                    case "Rain and snow":
                        conditionImage = "assets/images/rain.jpg"
                        break;
                    case "Hot":
                        conditionImage = "assets/images/sun.jpg"
                        break;
                    case "Cold":
                        conditionImage = "assets/images/cold.jpg"
                        break;
                    case "Windy":
                        conditionImage = "assets/images/windy.jpg"
                        break;
                    case "Clear":
                        conditionImage = "assets/images/moon.jpg"
                        break;
                    case "Mostly clear":
                        conditionImage = "assets/images/moon.jpg"
                        break;
                    case "Partly cloudy":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    case "Mostly cloudy w/ snow":
                        conditionImage = "assets/images/clouds2.png"
                        break;
                    default:
                        conditionImage = "assets/images/clouds2.png"
                };
                var dayOfWeek = GetDayOfWeek(new Date(Date.parse(date)));
                var weatherHTML = weatherTemplate.replace('$DayOfWeek$', dayOfWeek)
                                                 .replace('$Forecast$', condition)
                                                 .replace('$Low$', lowTemp)
                                                 .replace('$High$', highTemp)
                                                .replace('$Image$', conditionImage);
                console.log(weatherHTML);
                $("#forecast").append(weatherHTML);
               // $("#forecast").append("<div style='display: inline-block; overflow-x: auto;'><div><p>Date: " + moment(date).format("LLLL") + "</p></div><div><p>Condition: " + condition + "</p></div><div><img src=" + conditionImage + " height='175' width='175'></div><div><p>High Temperature: " + highTemp + " F</p></div><div><p>Low Temperature: " + lowTemp + " F</p></div></div>")
            };
            $("#weatherTitle").show;
            $("#eventTitle").show;
        });

    });

});



$(document).ready(function () {
   $("#postForm").hide();
});

$("#nameSubmit").on("click", function (event) {

    event.preventDefault();
    userName = $("#screenName").val().trim();
    if (userName === "") {
        console.log("error")
    } else {
        $("#namePick").hide();
        $("#postForm").show();
    };

});


$("#postSubmit").on("click", function (event) {

    event.preventDefault();
    var message = $("#post").val().trim();
    if (message === "") {
        console.log("error")
    } else {
        messageBoard.push({
            "name": userName,
            "message": message
        });
        $("#post").val('');
    }

});

messageBoard.on("child_added", function (snapshot) {
   var name = snapshot.val().name
   var message = snapshot.val().message
   var messageTemplate = "<div class='card' style='margin: 10px;'><div class='card-heading bg-primary' style='padding: 2px; padding-left: 5px;'><b>$Name$</b> <i>says..</i></div><div class='card-body' style='padding: 2px; padding-left: 10px;'>$Message$</div></div>";
   $("#messages").prepend(messageTemplate.replace('$Name$', name).replace('$Message$', message));
}, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
});




function GetDayOfWeek(date)
{
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[date.getDay()];
}


