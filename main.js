var video = document.getElementById("video");
var ranges = [];
var seekingArr = [];
var playback = {
  pause: [],
  seek: [],
  replay: 0
}

var bounce = function(){
  $("#actions").addClass("blast animated bounceIn"); 
}

var timeFunc = function(){
  if (video.currentTime < 60) {
    return video.currentTime.toFixed(1);
  }
  else {
    return (video.currentTime/60).toFixed(2);
  }
}

video.onended = function() {
  time = timeFunc();
  $("#actions").html("<h2 class='animated bounceIn blast'>ENDED @ "+time+" seconds</h2");
  bounce();
}  


video.onpause = function(){
  
  var time = timeFunc();

  if (!(video.ended)){

    playback.pause.push(video.currentTime);
    console.log(playback.pause);
    // $("#actions").addClass("animated bounceIn");
    $("#actions").html("<h2 class='animated bounceIn blast'>PAUSED @ "+time+" seconds</h2");
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
  console.log(time);

 if (time > 0){
  seekingArr.push(video.currentTime);
  // console.log(seekingArr);
  playback.seek.push(seekingArr[seekingArr.length - 1]);
  $("#actions").html("<h2 class='animated bounceIn blast'>SKIPPED to "+time+" seconds</h2");
  }
  else {
  $("#actions").html("<h2 class='animated bounceIn blast'>STARTED OVER</h2");
      playback.replay++;
      console.log(playback);

  }
}

video.onseeked = function() {
  console.log(playback)
}

console.log(playback);

