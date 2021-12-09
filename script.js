$(document).ready(function() {
  $('.slide').slide({

    // enable autoplay
    start: true,

    // loop through the images at a specified speed
    speed: 3000,

    // horizontal or fade
    animate: "horizontal"
  })
;})

$(document).ready(function() {
  $('.main-carousel').flickity({
    contain: true,
    cellAlign: 'center',
    wrapAround: true
  })
;})