$(document).ready(function() {
  $.getJSON( "https://www.googleapis.com/books/v1/volumes?q=hello+world&key=AIzaSyA_0WhuTJiTIrRRbFVvMB05FjzhuL-Yeng", function( data ) {
	  var items = data.items; //array of objects
	  var html = '';
	  $(".results").text(items.length + " results");

	  for (i = 0; i<=items.length-1; i++){
	  	var newLine = '<li>' + items[i].volumeInfo.title + '</li>';
	  	html += newLine;
	  }
	  $(".results-list").html(html);
  });

});