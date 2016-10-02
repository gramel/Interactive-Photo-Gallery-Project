//Gallery Display and Search

var thumbnail = '';
var image;
var search;

//Changes content of #thumbnails
function print(thumbnail){
  var outputDiv = document.getElementById('thumbnails');
  outputDiv.innerHTML = thumbnail;
}

//Iterate through images.js and display
for(var i = 0; i < images.length; i += 1){
  image = images[i];
  thumbnail += '<li><a href="' + image.link + '">' + '<' + image.type + ' src="' + image.source + '" title="' + image.title + '" alt="' + image.alt + '" /></a></li>';    
}

print(thumbnail); 

//Search for image
$("#search-bar").keyup(function(){
  search = $(this).val().toLowerCase();
  $("li").filter(function(index){
    image = images[index];
    var text = image.alt.toLowerCase();
    var match = text.indexOf(search);
    if (match >= 0){
      $(this).removeClass("hidden");
      return $(this).slideDown();
    } else {
      $(this).addClass("hidden");
      return $(this).slideUp();
    }
  });
}); 


