var todayDate = moment().format("YYYYMMDD00")

var futureDate = moment().add(5, 'd').format("YYYYMMDD00")

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
      const {
         event
      } = oData.events;
      $("#emptyDiv").empty();
      for (i = 0; i < event.length; i++) 
      {
         var newDiv = $("<div>");
         newDiv.text("Starts At: " + event[i].start_time + " ");
         newDiv.append("Venue Name: " + event[i].venue_name + " ");
         if (event[i].performers === null) 
         {
            newDiv.append("Performing: ")
            $("<a>", {href: event[i].url}).append("More Info Here").appendTo(newDiv);
         } 
         else if (event[i].performers.performer.length > 1) 
         {
            newDiv.append("Performing: ")
            for (j = 0; j < event[i].performers.performer.length; j++) 
            {
               newDiv.append(event[i].performers.performer[j].name + " ");
            }
         } 
         else 
         {
            newDiv.append("Performer: " + event[i].performers.performer.name);
         }
         $("#emptyDiv").append(newDiv);
      }
      // Note: this relies on the custom toString() methods below

   });
});