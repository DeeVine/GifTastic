var topicsArray = ['dog', 'cat', 'bird', 'monkey'];

generateButtons();
//generate initial buttons
function generateButtons () {
	$('#gif-buttons').empty();
	for (var i = 0; i < topicsArray.length; i++) {	
	var b = $('<button>');
	b.addClass('gif-button');
	b.attr('button-text', topicsArray[i]);
	b.text(topicsArray[i]);
	$('#gif-buttons').append(b);
	}
	renderGifs();
}

$("#add-button").on("click", function(event) {
      // prevent page from refreshing when form tries to submit itself
      event.preventDefault();
      var textInput = $('#name-input').val();
      topicsArray.push(textInput)
      generateButtons();
});


renderGifs();

function renderGifs() {

	$(".gif-button").on("click", function() {
  // In this case, the "this" keyword refers to the button that was clicked
  $('.gifs-go-here').empty();

  var topic = $(this).attr("button-text");

  // Constructing a URL to search Giphy for the name of the topic who said the quote
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .done(function(response) {
      // Storing an array of results in the results variable
      console.log(response);

      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var topicImage = $("<img class='gif'>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          topicImage.attr("src", results[i].images.fixed_height_still.url);
          topicImage.attr("data-state", 'still');
          topicImage.attr("data-still", results[i].images.fixed_height_still.url);
          topicImage.attr("data-animate", results[i].images.fixed_height.url);
         
          // Appending the paragraph and topicImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(topicImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $(".gifs-go-here").prepend(gifDiv);

  				//pause gifs
					$(".gif").off().on("click", function() {

						console.log('clickable');
					  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
					  var state = $(this).attr("data-state");
					  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
					  // Then, set the image's data-state to animate
					  // Else set src to the data-still value
					  if (state === "still") {
					    $(this).attr("src", $(this).attr("data-animate"));
					    $(this).attr("data-state", "animate");
					  } else {
					    $(this).attr("src", $(this).attr("data-still"));
					    $(this).attr("data-state", "still");
					  }
					});
        }
      }
    });
});


}

