$(document).ready(function() {
  let $searchingWrapper = $("#searching-wrapper");
  let $resultsWrapper = $("#results-wrapper");
  let $noResultsWrapper = $("#no-results-wrapper");
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

  //trigger the search filters when the checkbox is checked:
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

  //display the "searching..." message during search:
  $("#search-button").click(function() {
      $searchingWrapper.removeClass("hide");
      $resultsWrapper.addClass("hide");  
      $resultsList.addClass("hide");  
      $noResultsWrapper.addClass("hide");

    $.getJSON(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        value +
        parameters +
        "&maxResults=40&key=AIzaSyA_0WhuTJiTIrRRbFVvMB05FjzhuL-Yeng",
      function(data) {
        
        $searchingWrapper.addClass("hide");

        const results = data.items;

        console.log(data);

        if (data.totalItems && data.totalItems > 0) {

            //display the result header and information:
            $resultsWrapper.removeClass("hide");  
            $resultsList.removeClass("hide");  
            $(".results").text('displaying results for "' + value + '"');


            //filter out books with no author or no thumbnail:
            const items = results.filter(r =>
              r.volumeInfo.hasOwnProperty("authors") &&
              r.volumeInfo.hasOwnProperty("imageLinks")
            );

            //loop through 12 books unless there are fewer than 12 available:
            let iterations = 12

            if (items.length < 12) {
              iterations = items.length
            }

            //create the book list:
            let html = "";

            for (i = 0; i <= iterations-1; i++) {
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
                '<div class="card-body" <p class="mt-3"><span class="book-title truncate">' +
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

        } else {
          //display the no results message:
          $noResultsWrapper.removeClass("hide");
        }
      }
    );
  });
});
