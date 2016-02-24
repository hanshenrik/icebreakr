peopleList = [
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
  'Thomas'
];

speechList = [
  'Gud',
  'Mamma',
  'Bananer',
  'Trær'
];

presentationList = [
  '«Kondomet - pros & cons»',
  '«Baking og bolling»',
  '«Øl. Nam.»'
];

var autoStopInterval = [4000, 7000];
var speedInterval = [2, 4];
var delay = 0;
var accel = 11;
var decel = 0.5;

function populateList(listID, array) {
  people = '';
  
  $.each(array, function(k, v) {
    people += '<li>'+v+'</li>'
  });

  $( listID ).append( people )
}

$(document).ready(function() {
  // Populate first list with people
  populateList( '#first', peopleList )

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
      // $( '#result' ).html(text);
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
      if (text === 'beinkroker' || text === 'intervjuer') {
        populateList( '#third', peopleList );
      }
      else if (text === 'gir et ektefølt kompliment til') {
        populateList( '#third', peopleList );
        // TODO add 'dypt inn i øynene og forteller et ektefølt kompliment'
      }
      else if (text === 'holder en tale om') {
        populateList( '#third', speechList );
      }
      else if (text === 'holder foredraget') {
        populateList( '#third', presentationList );
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
