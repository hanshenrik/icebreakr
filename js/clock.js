// Specify number of seconds to countdown
var countdown = 63;

$(document).ready(function() {
  var clock = $('.clock').FlipClock(countdown, {
    clockFace: 'MinuteCounter',
    countdown: true,
    callbacks: {
      stop: function() {
        setTimeout(function() {
          $('.message').html('The clock has stopped!');
          $('#start-first').trigger( "click" );
          clock.setTime(countdown);
          clock.start();
          // widget.play();
        }, 2000);
      }
    }
  });
});
