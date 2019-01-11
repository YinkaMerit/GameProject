$(document).ready(function(){

  console.log('Welcome to Duck Hunt!');

  //Sounds Varable
  var intro = $('#intro');
  var shot = $('#shot');
  var quack = $('#quack');
  var gameover = $('#gameover');
  var laugh = $('#laugh');
  var youfailed = $('#youfailed');

  //timing variables
  var lostDuckFadeOutTime = 180;
  var gameSpeed = 200;   // 2 fps

  //Score and Fadeout variable
  var numKilled = 0;
  var dieFadeOutTime = 1000;

  //Counter
  var counter = 0;

  // Runs a counter depend on the number if missed clicks runs addClass doglaugh
  $(document).on('click',
    function dogLaugh(){
      counter++;
      shot[0].play();
      console.log(counter);
      if (counter % 3 == 0 ) {
        console.log("You have clicked the screen");
        var classAdd = setTimeout(
          function(){
            $('.dog').addClass('doglaugh');
            laugh[0].play();
          },0.0001);
      } else {
        $('.dog').removeClass('doglaugh');
        clearTimeout(classAdd);
      }
    }
  )
  // Updates the score
  function updateScore() {
    $('.score').html('Score: ' + numKilled);
  }

  //Checks if ducks are alive
  function isAlive(duck) {
    return duck.hasClass('left') || duck.hasClass('right');
  }

  //Recyles the ducks
  function recycle(duck) {
    // console.log('recycle: duck = ' + duck.offset().top);

    // Variable to determine the random location along the x-axis of the page
    var newLeft = Math.round(Math.random() * $(document).width());

    //Moves the new duck to the bottom of the page with a random location on the page
    duck.css('left', newLeft);
    duck.css('bottom', 0);
    quack[0].play();

    // randomly choose a left facing or right facing orientation
    if (Math.random() > 0.5) {
      duck.removeClass('shot').show().addClass('left');
    }
    else {
      duck.removeClass('shot').show().addClass('right');
    }
  }

  // Updating the collision of the ducks in regards to the edges of the screen
  function updateDuck(duck) {

    // bounce left to right
    if (duck.offset().left < 0) {
      duck.removeClass('left').addClass('right');
    }

    // bounce right to left
    if (duck.offset().left > $(document).width() - 300) {
      duck.removeClass('right').addClass('left');
    }

    // Variable to determine the new location of the duck along the y-axis of the page
    var newBottom = $(document).height() - duck.offset().top;
    // Set the vertical position of the duck.
    duck.css('bottom', newBottom);

    // flap the wings; toggles on and of the .flap class
    duck.toggleClass('flap');

    // if duck has escaped, fade it out and recycle it.
    if (duck.offset().top < 0) {
      duck.fadeOut(lostDuckFadeOutTime, function() {
        duck.removeClass('left right');
        recycle(duck);
      });
    }
  }

  // update the score, duck positions, orientations, and state
  function step() {
    $('.duck').each(function (i, duck) {
      duck = $(duck);
      if (isAlive(duck)) {
        updateDuck(duck);
      }
    });

    // move each left facing duck a little further to the left
    $('.duck.left').each(function (i, duck) {
      duck = $(duck);
      duck.css('left', duck.offset().left - 30);
    });

    // move each right facing duck a little further to the right
    $('.duck.right').each(function (i, duck) {
      duck = $(duck);
      duck.css('left', duck.offset().left + 30);
    });

    updateScore();
  }


  function die(duck) {
    numKilled += 100;
    //Adds the shot class and fadesout out the duck object
    duck.removeClass('left right').addClass('shot').fadeOut(dieFadeOutTime, function () {
      recycle(duck);
    });

    //Increases the speed of the ducks depending on the score
    if (numKilled > 0 && numKilled < 1000) {
      $('.duck').css("transition-duration", 0.65 + "s");
      $('.status').html("Wave 1");
    }
    if (numKilled >= 1000 && numKilled < 2000) {
      $('.duck').css("transition-duration", 0.65 + "s");
      $('.status').html("Wave 2");
    }
    if (numKilled >= 2000 && numKilled < 3000) {
      $('.duck').css("transition-duration", 0.55 + "s");
      $('.status').html("Wave 3");
    }
    if (numKilled >= 3000 && numKilled < 4000) {
      $('.duck').css("transition-duration", 0.45 + "s");
      $('.status').html("Wave 4");
    }
    if (numKilled >= 4000 && numKilled < 5000) {
      $('.duck').css("transition-duration", 0.35 + "s");
      $('.status').html("Wave 5");
    }
    if (numKilled >= 5000 && numKilled < 6000) {
      $('.duck').css("transition-duration", 0.3 + "s");
      $('.status').html("Final Wave");
    }
    if (numKilled >= 6000) {
      $('.duck').css("transition-duration", 0.25 + "s");
    }
    if (numKilled >= 7100) {
      $('.status').html("You Win");
      clearInterval(gameRunning);
      clearInterval(timerCountdown);
      $('.timer').remove();
    }
  }

  // Removes the current class of the ducks and add the shot class
  $('.duck').on('click', function(event) {
    die($(event.target));
    event.stopPropagation();
    shot[0].play()
    shot.get[0].currentTime = 0.2;
  });


  // Creates an on screen countdown

  function timer(){
    var sec = 75;

    var timerCountdown = setInterval(
    function(){
      //Add the Countdown to corner of screen
      $('.timer').html(sec+"s");
      sec--;
      if (sec == 74) {
        intro[0].play();
        quack[0].play();
      }
      // End game,if sec is less then 0 is stops the countdown and stops the game from running
      if (sec < 0) {
        console.log("game over");
        clearInterval(gameRunning);
        clearInterval(timerCountdown);

        //Plays sounds and displays depending on score.
        if (numKilled == 0) {
          $('.timer').css('right', '400px')
          $('.timer').html("<a href='duckhunt.html'>You gained a score of " + numKilled + " better luck next time</a>");
          $('.status').remove();
          youfailed[0].play();
        }
        if (numKilled == 7100) {
          $('.timer').css('right', '400px', 'font-size', '5em')
          $('.timer').html("<a href='duckhunt.html'>You Win</a>");
          $('.status').remove();
          gameover[0].play();
        }
        if (numKilled>0 && numKilled<7000) {
          $('.timer').css('top', '200px', 'font-size', '5em')
          $('.timer').html("<a href='duckhunt.html'>You gained a score of " + numKilled + " Well Done! Try and Get 7000!</a>");
          $('.status').remove();
          gameover[0].play();
        }
      }
    }, 1000);
  }
  timer();


  //Runs the full process of the game
  var gameRunning = setInterval(step, gameSpeed);
})
