var todayDate = moment().format("YYYYMMDD00");
console.log(todayDate);
var endDate = moment().add(5, "days").format("YYYYMMDD00");
console.log(endDate);
$("#click-button").on("click", function(event){
event.preventDefault();

var postal = $("#event-input").val();
$("#event-input").val("");
var oArgs = {

  app_key: "9b6ZNRwKT6x9tPMt",

  q: "music",

  within: 25,

  // venue_name: "",

  location: postal, 

  "date": todayDate + "-" + endDate,

  page_size: 20,

  sort_order: "popularity",

};


EVDB.API.call("/events/search", oArgs, function(oData) {
  const {event} = oData.events;

for (var i = 0; i < event.length; i++) {
  console.log(oData);
  console.log(event[i].start_time);
  console.log(event[i].venue_name);
  console.log(event[i].performers);

  if(event[i].performers === null) {
    console.log("More info here: " + event[i].url);
    startTime.append("<br>" + "Performing: ")
    $("<a>", {href: event[i].url}).append("More Info Here").appendTo(startTime);
  }
  else if(event[i].performers.performer.length > 0) {
  
  
  for (var j = 0; j < event[i].performers.performer.length; j++) {
    console.log(event[i].performers.performer[j].name);
  }
  }
  else {
    console.log(event[i].performers.performer.name);
  }

  var startTime = $("<div>");
  startTime.text("Start time: " + event[i].start_time);
  $("#info-here").append(startTime);
  startTime.append("<br>" + " Venue name: " + event[i].venue_name);

  


  


}





})

})