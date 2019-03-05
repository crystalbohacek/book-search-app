$(document).ready(function() {

var value = '';
var apikey = config.API_KEY;

$( "input" )
  .keyup(function() {
    value = $( this ).val();
  })
  .keyup();

$( "button" ).click(function() {
    $.getJSON( "https://www.googleapis.com/books/v1/volumes?q=" + value + "&key=" + apikey, function( data ) {
	  var items = data.items; 
	  var html = '';
	  $(".results").text("displaying results for \"" + value + "\"");

	  for (i = 0; i<=items.length-1; i++){
		var newLine = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3"><div class="book-info bg-white">' + 
		(!!items[i].volumeInfo.imageLinks && '<img src="' + items[i].volumeInfo.imageLinks.thumbnail + '">' ) +
		'<p class="mt-3"><span class="book-title">' + items[i].volumeInfo.title + '</span> by ' +
		(!!items[i].volumeInfo.authors ? items[i].volumeInfo.authors[0] : "unknown author") + '</p>' +
		(!!items[i].volumeInfo.infoLink && '<a class="book-link btn btn-success" href="' + items[i].volumeInfo.infoLink + '">See this book</a></div></div>');

	  	html += newLine;
	  }
	  $(".results-list").html(html);

	  // $('.book-info img').each(function(){
	  // 	var imgSrc = $(this).prop('src').replace('zoom=1', 'zoom=2');
	  // });
  });
});

});