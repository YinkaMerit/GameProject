$(document).ready(function(){

  console.log('Welcome to Duck Hunt!');
  var title = $('#titlesound');
  var bark = $('#bark');
  function timer(){
    var sec = 80;
    var timerCountdown = setInterval(function(){
      // console.log(sec);
      sec--;
      if (sec == 79) {
        title[0].play();
        bark[0].play();
      }}, 100);
    }
  timer();
})
