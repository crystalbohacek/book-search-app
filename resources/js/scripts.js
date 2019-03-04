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
	  $(".results").text(items.length + " results for \"" + value + "\"");

	  for (i = 0; i<=items.length-1; i++){
	  	var newLine = '<li>' + items[i].volumeInfo.title + '</li>';
	  	html += newLine;
	  }
	  $(".results-list").html(html);
  });
});

});