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

$(".zipSubmit").on("click", function (event) {
    event.preventDefault();

    $(".container").addClass("zoomOutUp");

    $('html, body').animate({
        scrollTop: $(".one").offset().top
    }, 2000);

    var postal = $("#zipCode").val().trim();


    var oArgs = {

        app_key: "nRBrbMVzRwn54MJK",

        q: "music",

        location: postal,

        within: 25,

        "date": todayDate + "-" + futureDate,

        page_size: 9,

        sort_order: "popularity"

    };

    EVDB.API.call("/events/search", oArgs, function (oData) {
        console.log(oData);
        const {
            event
        } = oData.events;
        $("#emptyDiv").empty();



        for (i = 0; i < event.length; i++) {
            var newDiv = $("<div>");
            newDiv.text("Starts At: " + moment(event[i].start_time).format("LLLL"));
            newDiv.append("<br>Venue Name: " + event[i].venue_name + " ");
            if (event[i].performers === null) {
                $("<a>", { href: event[i].url, text: " Buy Tickets Here" }).appendTo(newDiv);
            }
            else if (event[i].performers.performer.length > 1) {
                newDiv.append("<br>Performing: ")
                for (j = 0; j < event[i].performers.performer.length; j++) {
                    newDiv.append(event[i].performers.performer[j].name + " ");
                }
                $("<a>", { href: event[i].url, text: " Buy Tickets Here" }).appendTo(newDiv);
            }
            else {
                newDiv.append("<br>Performer: " + event[i].performers.performer.name);
                $("<a>", { href: event[i].url, text: " Buy Tickets Here" }).appendTo(newDiv);
            }
            $("#emptyDiv").append(newDiv);
        }

        var scrollButton =  $("<button class='btn btn-outline-secondary zipWeather' type='button' id='button-addon2'>Want to stay away from weather trouble? Click here to check it out!</button>");
        
        $(".scrollDown").append(scrollButton);
        // Note: this relies on the custom toString() methods below

    });
    
});

    $(".scrollDown").on("click",function(event){
        event.preventDefault();

        $("#forecast-row").addClass("lightSpeedIn delay-2s");
        $('html, body').animate({
            scrollTop: $(".weatherDiv").offset().top
        }, 2000);

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
            $("#location").append("<div class='citystate'><p>City: " + city + "</p></div><div class='citystate2'><p>State: " + state + "</p></div>")
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
                    switch (condition) {
                        case "Sunny":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/sunny.png"
                        break;
                        case "Mostly sunny":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/mostlysunny.png"
                        break;
                        case "Partly sunny":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/partlysunny.png"
                        break;
                        case "Intermittent clouds":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/intermittentclouds.png"
                        break;
                        case "Hazy sunshine":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/hazysunshine.png"
                        break;
                        case "Mostly cloudy":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/mostlycloudy.png"
                        break;
                        case "Cloudy":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/cloudy.png"
                        break;
                        case "Fog":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/fog.png"
                        break;
                        case "Showers":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/showers.png"
                        break;
                        case "Mostly cloudy w/ showers":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/mostlycloudyshowers.pngassets/images/rain.jpg"
                        break;
                        case "Partly sunny w/ showers":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/partlysunnyshowers.png"
                        break;
                        case "T-storms":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/tstorms.png"
                        break;
                        case "Mostly cloudy w/ t-storms":
                        conditionImage = "assets/images/thunder.jpg"
                        break;
                        case "Partly sunny w/ t-storms":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/partlysunnyTstorms.png"
                        break;
                        case "Rain":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/rain.png"
                        break;
                        case "Flurries":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/flurries.png"
                        break;
                        case "Mostly cloudy w/ flurries":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/mostlycloudlyflurries.png"
                        break;
                        case "Partly sunny w/ flurries":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/partlysunnyflurries.png"
                        break;
                        case "Ice":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/ice.png"
                        break;
                        case "Sleet":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/sleet.png"
                        break;
                        case "Freezing rain":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/freezingrain.png"
                        break;
                        case "Rain and snow":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/rainandsnow.png"
                        break;
                        case "Hot":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/hot.png"
                        break;
                        case "Cold":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/cold.png"
                        break;
                        case "Windy":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/windy.png"
                        break;
                        case "Clear":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/clear.png"
                        break;
                        case "Mostly clear":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/mostlyclear.png"
                        break;
                        case "Partly cloudy":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/partlycloudy.png"
                        break;
                        case "Mostly cloudy w/ snow":
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/mostlycloudysnow.png"
                        break;
                        default:
                        conditionImage = "/Users/SahraanMohammed/Desktop/hasanainm.github.io/project1/assets/images/mostlycloudy.png"
                    };
                    
                    var weatherInfo = $("<div class='card card-default'><div class='card-header'>" + moment(date).format("ddd, MMM D") + "</div><div class='card-body'><img src=" + conditionImage + "><br>" + highTemp + "° F/" + lowTemp + "° F<br>" + condition + "</div></div>");
                    
                    $("#forecast-row").append(weatherInfo);
                    
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
    $("#messages").prepend(name + ": " + message + "<br>")
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});