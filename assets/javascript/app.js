
$("#find-video").on("click", function(event) {
    event.preventDefault();

    var postal = $("#postal-code").val();
   

   var oArgs = {

      app_key: "nRBrbMVzRwn54MJK",

      q: "music",

      location: postal, 

      within: 25,

      "date": "2019061000-2019062000",

      page_size: 5,

      sort_order: "popularity",

   };
  
   // var url = "http://eventful.com/rest/events/searh?" + "&location=" + location +  "&date=" + oArgs.date;

   EVDB.API.call("/events/search", oArgs, function(oData) {
      // var area = oArgs.location;
      // JSON.stringify(area);
   
    console.log(oArgs);
   //  console.log(url);
    console.log(oData);
      // Note: this relies on the custom toString() methods below

    });
});
