var todayDate = moment().format("YYYYMMDD00")
console.log(todayDate);
var futureDate = moment().add(5, 'd').format("YYYYMMDD00")
console.log(futureDate);
$("#find-video").on("click", function (event) {
   event.preventDefault();

   var postal = $("#postal-code").val().trim();


   var oArgs = {

      app_key: "nRBrbMVzRwn54MJK",

      q: "music",

      location: postal,

      within: 25,

      "date": todayDate + "-" + futureDate,

      page_size: 20,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function (oData) {
      console.log(oData);
      const {
         event
      } = oData.events;

      for (i = 0; i < event.length; i++) {
         console.log(event[i].start_time);
         console.log(event[i].venue_name);
         if (event[i].performers === null) {
            console.log("More Info at: " + event[i].url);
         } else if (event[i].performers.performer.length > 1) {


            for (j = 0; j < event[i].performers.performer.length; j++) {

               console.log(event[i].performers.performer[j].name);
            }
         } else {
            console.log(event[i].performers.performer.name);
         }
      }
      // Note: this relies on the custom toString() methods below

   });
});