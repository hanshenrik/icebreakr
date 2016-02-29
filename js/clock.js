// Specify number of seconds to countdown
var countdown = 60*20;

$( document ).ready( function() {
  var soundcloudWidget = SC.Widget( document.querySelector( '#soundcloud-widget' ) );

  var clock = $( '.clock' ).FlipClock( countdown, {
    clockFace: 'MinuteCounter',
    countdown: true,
    callbacks: {
      stop: function() {
        setTimeout( function() {
          $( '#start-first' ).trigger( 'click' );
          clock.setTime( countdown );
          clock.start();
          if ( $( '#play-music' ).is( ':checked' ) ) {
            soundcloudWidget.play();
          }
        }, 2000 );
      }
    }
  });
});
