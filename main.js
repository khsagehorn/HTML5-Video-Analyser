var video = document.getElementById("video");
var ranges = [];
var seekingArr = [];
var playback = {
  pause: [],
  seek: [],
}

var timeFunc = function(){
  if (video.currentTime < 60) {
    return video.currentTime.toFixed(1);
  }
  else {
    return (video.currentTime/60).toFixed(2);
  }
}

video.ended = function() {
    $("#actions").html("<h2 class='animated bounceIn blast'>ENDED @ "+time+" seconds</h2");
    $("#actions").addClass("blast animated bounceIn");  
}  


video.onpause = function(){
  
  var time = timeFunc();

  if (!(video.ended)){

    playback.pause.push(video.currentTime);
    console.log(playback.pause);
    // $("#actions").addClass("animated bounceIn");
    $("#actions").html("<h2 class='animated bounceIn blast'>PAUSED @ "+time+" seconds</h2");
    $("#actions").addClass("blast animated bounceIn");
  }
}

video.addEventListener('progress', function() {

  for (var i = 0; i < video.buffered.length; i++) {
    ranges.push([
      video.buffered.start(i),
      video.buffered.end(i)
      ]);

  }
  
}, false);

video.onseeking = function() {
  time = timeFunc();
  console.log("SEEKING!!");
  seekingArr.push(video.currentTime);
  // console.log(seekingArr);
  playback.seek.push(seekingArr[seekingArr.length - 1]);
  $("#actions").html("<h2 class='animated bounceIn blast'>SKIPPED to "+time+" seconds</h2");
  $("#actions").addClass("blast animated bounceIn");
}

video.onseeked = function() {
  console.log(playback.seek)
}

console.log(playback);

