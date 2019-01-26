
$("#find-video").on("click", function(event) {
    event.preventDefault();

    var postal = $("#postal-code").val();
   

   var oArgs = {

      app_key: "nRBrbMVzRwn54MJK",

      q: "music",

      location: postal, 

      within: 25,

      "date": "This Week",

      page_size: 5,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
   
    console.log(oArgs);
    console.log(oData);
      // Note: this relies on the custom toString() methods below

    });
});
