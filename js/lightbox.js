//Lightbox Functionality

//Variables
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img />");
var $leftArrow = $('<div id="leftArrow"></div>');
var $rightArrow = $('<div id="rightArrow"></div>');
var $closeLightbox = $('<div id="closeLightbox"></div>');
var $caption = $("<p></p>");

//Insert content to #overlay
$overlay.append($image);
$image.before($leftArrow);
$image.after($rightArrow);
$rightArrow.append($closeLightbox);
$overlay.append($caption);

//Insert content (#overlay) to body
$("body").append($overlay);

//Trigger lightbox when thumbnail is clicked
$("#thumbnails a").click(function(event){
  event.preventDefault();
  getCurrentImage(this);
  $overlay.show();
});

//Trigger back and forward to switch between photos
$leftArrow.click(function(){
  getPrevImage();
});

$rightArrow.click(function(){
  getNextImage();
});

//Trigger closing of lightbox when clicked
$closeLightbox.click(function(){
  $overlay.hide();
});

//Functions to navigate back and foward between photos
function getCurrentImage(currentImage) {
  thisImage = currentImage;
  getCurrentMedia(currentImage);
  
  var imageLocation = $(currentImage).attr("href");
  $image.attr("src", imageLocation);

  var captionText = $(currentImage).children().attr("alt");
  $caption.text(captionText);
}

function getPrevImage() {
  imageParent = $(thisImage).parent().prevAll().not(".hidden").first();
  if(imageParent.length!==0){
    thisImage = $(imageParent).children("a"); }
  getCurrentImage(thisImage);  
}

function getNextImage() {
  imageParent = $(thisImage).parent().nextAll().not(".hidden").first();
  if(imageParent.length!==0){
    thisImage = $(imageParent).children("a"); }
  getCurrentImage(thisImage);
}

//Keyboard navigation for browsing photos in lightbox
$("body").keydown(function(e) {
  if(e.keyCode == 27) { // esc
    $overlay.hide();
  } else if(e.keyCode == 37) { // left
    getPrevImage();
  } else if(e.keyCode == 39) { // right
    getNextImage(); }
});

//Support for additional media types like videos
function getCurrentMedia(currentMedia) {
  thisMedia = $(currentMedia).children().get(0).tagName;

  if(thisMedia.toString() == "VIDEO" ) {
    var a = '<video controls><source src="';
    var b = $(currentMedia).attr("href");
    var c = '" type="video/mp4"></video>';
    var d = a.concat(b,c);
    $("#overlay img").replaceWith( d ); }

  if(thisMedia.toString() == "IMG" ) {
    var mediaLocation = $(currentMedia).attr("href");
    $("#overlay video").replaceWith( $image.attr("src", mediaLocation) ); }
}