var todayDate = moment().format("YYYYMMDD00")

var futureDate = moment().add(5, 'd').format("YYYYMMDD00")

$("#find-video").on("click", function(event) {
    event.preventDefault();

    var postal = $("#postal-code").val();
   

   var oArgs = {

      app_key: "nRBrbMVzRwn54MJK",

      q: "music",

      location: postal, 

      within: 25,

      "date": todayDate + "-" + futureDate,

      page_size: 20,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
   
   //  console.log(oArgs);
    for (i = 0; i < oData.events.event.length; i++){
    console.log(oData.events.event[i].start_time);
    }
      // Note: this relies on the custom toString() methods below

    });
});
