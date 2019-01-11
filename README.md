# DuckHunt - JavaScript

## Description


Duck Hunt is a 1984 light gun shooter video game developed and published by Nintendo for the Nintendo Entertainment System (NES) video game console. 

A simplified version of the game has been created using HTML, CSS and Javascript. The main capabilities is a simple point and click,recording highscore with a specified time limit.


## Implementation

The functionality has been implemented using the following features:

* HTML5
* CSS
* JavaScript
* jQuery

## Introduction:

With this JavaScript version of DuckHunt.The objective is simply to collect as much point as possible. 

Aiming for the high score of 7000!

If you miss your hit to many time,a dog animation will appear laughing at you,mimicing the same actions in the original NES game.

The more enemies you shoot the higher your score will be.


Whats your HighScore!?

Play here [Game](https://yinkamerit.github.io/)

### There is one main game modes

#### Waves:

In this mode the duck will be spawn in waves. With the speed up the ducks moving across the screen increasing as you progress through the waves.

## How to play

When you launch the page you will be presented with the titlescreen,containing the option to start the game or see the instructions on how to play. 

After clicking 'start game' you will hear the game team as the ducks start flying. 

This is your time to shine. 

Shoot them down!


### Controls

Use your mouse to control the direction the you are firing. 

## Development
### Issues:

* Animation
* Image positioning
* Audio

##### Animation:

A couple of issues where present when trying the form animate the intro scene of the duck.

With the sprite sheet for the dog not containing an consistent height and pixel pixel.

Overcame by running the aninmation with a iteration of 1.9 and while slightly cropping the image.

```css
#dog {
  position: absolute;
  background: url('images/dogwalk.png');
  top: 520px;
  width: 182px;
  height: 171px;
  animation: walk 2s steps(5) 1.9, dogMove 3.8s linear;
  animation-fill-mode: forwards;
}

@keyframes walk {
  0% {
    background-position: 910px;
  }
  100% {
    background-position: 0px;
  }
}

@keyframes dogMove {
  0% {
    transform: translateX(-100px);
  }
  10% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(300px);
    overflow: hidden;
  } 
}

```

Including these lines of code allowed for a smooth animation for the walking across the screen

##### Image Positioning:

Initial ideas were to position the ducks behind the background.However this posed many problems with an expected solution of the css function

```
z-index: -1;

```
not solving the problem.

Instead requiring and overlay of the grass.png on top of the backgroun image. This was succesfully achieved with the css:

```css
body:after {
display:inline-block;
padding-bottom: 10px;
content: '';
background-image: url('images/grass.png');
background-size: cover;
position: absolute;
bottom: 0;
width: 100%;
height: 175px;
```

##### Audio:

With the limitations of Chrome implementing audio on loadup was particularly difficult. Chrome has an autoplay prevention feature.Therefore setting background music required using the

```jQuery
setTimeOut(function,time(ms));
```

```js
  var title = $('#titlesound');
  function timer(){
    var sec = 80;
    var timerCountdown = setInterval(function(){
      // console.log(sec);
      sec--;
      if (sec == 79) {
        title[0].play();
      }}, 100);
    }
  timer();
```	

With this a timer is created that	 runs a function that plays the audio if the timer meets a condition e.g. after 1 second.

##### Bugs:
Some bugs are still present in the current build of the game.

Examples of this would be the dog laughing event added with the shot is missed twice. If the player were to miss again i.e. click on the page where a duck is not present then the event will automatically end without fully loaded the animation.

Another potential bug is the time delay in the audio when a shot is fired.There is currently a delay of 1s therefore two proceding shots wont sound one after the other instead the sound play again on the 4 shot.

These are future task that could be completed to improve the functionality of the game.

##### Potential Features:
Potential features could be adding more events for the bird flying animations and interations with the dog.

Also including an interface that counts the ammunition and limits how many the user has.