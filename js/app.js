participants = [
  'Ingrid',
  'Ailo',
  'Nikolai',
  'Lars Michael',
  'Eirik',
  'Magnus',
  'Kari',
  'Einar',
  'Harald',
  'Gaute',
  'Per-Dimitri',
  'Hans Henrik',
  'Thomas'];

speechTopics = [
  'Gud',
  'Mamma',
  'Bananer',
  'Trær'];

titles = [
  "«E du inni mæ no?»",
  "«Hei, svamp!»",
  '«Kondomet - pros & cons»',
  '«Baking og bolling»',
  '«Øl. Nam.»'];

actions = [
  'holde en tale om',
  'holde foredraget',
  'beinkroke med',
  'bryter håndbakk med',
  'se',
  'fremføre sangen',
  'lese diktet'];

/* Actions suggestions:
 *  intervjue,
 *
 */

var autoStopInterval = [4000, 7000];
var speedInterval = [2, 4];
var delay = 0;
var accel = 11;
var decel = 0.5;

function populateList(listID, array) {
  content = '';
  
  $.each(array, function(k, v) {
    content += '<li>'+v+'</li>'
  });

  $( listID ).append( content )
}

$(document).ready(function() {
  // Populate "show what's possible" lists
  populateList( '#participants', participants )
  populateList( '#actions', actions )
  populateList( '#speech-topics', speechTopics )
  populateList( '#titles', titles )

  // Populate first list with participants
  populateList( '#first', participants )
  populateList( '#second', actions )

  $('#first').bandit({
    speed: speedInterval,
    delay: delay,
    accel: accel,
    decel: decel,
    autoStop: autoStopInterval,
    spinButton: '#start-first',
    stopButton: '#stop',
    spinOnLoad: false,
    done: function(text) {
      $( '#start-second' ).trigger( "click" );
      $('.special').slideUp();
    }
  });

  $('#second').bandit({
    speed: speedInterval,
    delay: delay,
    accel: accel,
    decel: decel,
    autoStop: autoStopInterval,
    spinButton: '#start-second',
    stopButton: '#stop',
    spinOnLoad: false,
    done: function(text) {
      $('#third').empty();

      if (text === 'beinkroke med' || text === 'intervjue') {
        populateList( '#third', participants );
      }
      else if (text === 'se') {
        populateList( '#third', participants );
        $( '#se-special' ).slideDown();
      }
      else if (text === 'holde en tale om') {
        populateList( '#third', speechTopics );
      }
      else if (text === 'holde foredraget' || text === 'fremføre sangen' || text === 'lese diktet') {
        populateList( '#third', titles );
      }
      
      $('#start-third').trigger( "click" );
    }
  });

  $('#third').bandit({
    speed: speedInterval,
    delay: delay,
    accel: accel,
    decel: decel,
    autoStop: autoStopInterval,
    spinButton: '#start-third',
    stopButton: '#stop',
    spinOnLoad: false,
    done: function(text) {
    }
  });
});
