
$(document).ready(function() {
  let $searchingWrapper = $("#searching-wrapper");
  let $resultsWrapper = $("#results-wrapper");
  let $resultsList = $(".results-list");

  let value = "";

  $("input") //store the value of the search query
    .keyup(function() {
      value = $(this).val();
    })
    .keyup();

  $("input").keypress(function(e) {
    if (e.which == 13) {
      //Enter key pressed
      $("#search-button").click(); //Trigger search button click event
    }
  }); 

  let parameters = "";

  $("input:checkbox").change(
    function(){
        parameters = "";
        if ($("#preview").is(":checked")) {
            parameters += "&filter=full";
        } 
        if ($("#ebook").is(":checked")) {
          parameters += "&filter=ebooks";
        }
  });

  $("#search-button").click(function() {
      $searchingWrapper.removeClass("hide");
      $resultsWrapper.addClass("hide");  
      $resultsList.addClass("hide");  
      
      //clear it

    $.getJSON(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        value +
        parameters +
        "&maxResults=20&key=AIzaSyA_0WhuTJiTIrRRbFVvMB05FjzhuL-Yeng",
      function(data) {

        //only run this code if google returns something. otherwise display "books not found" message. 
        
        $searchingWrapper.addClass("hide");
        $resultsWrapper.removeClass("hide");  
        $resultsList.removeClass("hide");  

        const results = data.items;

        console.log(data);

        //filter out "unknown author" books:
        const items = results.filter(r =>
          r.volumeInfo.hasOwnProperty("authors")
          && r.volumeInfo.hasOwnProperty("publisher")
        );

        let html = "";

        $(".results").text('displaying results for "' + value + '"');

        for (i = 0; i <= 11; i++) {
          let image = items[i].volumeInfo.imageLinks.thumbnail;
          let largeImage = image.replace("zoom=1", "zoom=3");

          let newLine =
            '<div class="results-list-item col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"><div class="bg-white">' +
            (!!items[i].volumeInfo.imageLinks &&
              '<a href="' +
                items[i].volumeInfo.infoLink +
                '"><img class="card-img-top" src="' +
                largeImage +
                '">') +
            '<div class="card-body" <p class="mt-3"><span class="book-title">' +
            items[i].volumeInfo.title +
            "</span></p></a><div><p> by " +
            (!!items[i].volumeInfo.authors
              ? items[i].volumeInfo.authors[0]
              : "unknown author") +
            "</p></div>" +
            '<div><p class="publisher">' +
            (!!items[i].volumeInfo.publisher
              ? items[i].volumeInfo.publisher
              : "unknown publisher") +
            "</p></div></div></div></div>";

          html += newLine;
        }
        $(".results-list").html(html);
        $(".results-list-item").each(function(i){
          let $resultListItem = $(this);
        });
      }
    );
  });
});
