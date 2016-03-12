participants = [
  'Ola',
  'Kari',
  'Odin',
  'Tor',
  'Frøya'];

actions = [
  'holde en tale om',
  'parodiere',
  'rævkroke med',
  'tommelkrige med',
  'se',
  'holde foredraget',
  'fremføre sangen',
  'lese diktet'];

speechTopics = [
  'sin kjærlighet til sopp',
  'mamma',
  'bananer',
  'måker',
  'været',
  'trær'];

titles = [
  '«Erna - våt, vill og vakker»',
  '«E du min i kveld, Jens?»',
  "«E du inni mæ no?»",
  "«Hei, svamp!»",
  '«Kondomet - pros & cons»',
  '«Baking og bolling»',
  '«Tørst som faen»',
  '«Blåbærrotte»',
  '«Det blir godt i munnen når..»',
  '«Agurken»',
  '«Til kuken»',
  '«Øl. Nam.»'];

famousPeople = [
  'Kongen',
  'Eivind Hellstrøm',
  'Oslolosen',
  'Asbjørn Brekke',
  'Narvestad',
  'Siv Jensen'];

var autoStopInterval = [1000, 7000];
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

function getRemainingParticipants(firstParticipant) {
  var remainingParticipants = participants.slice();
  index = remainingParticipants.indexOf(firstParticipant);
  remainingParticipants.splice(index, 1);
  return remainingParticipants;
}

$(document).ready(function() {
  $( '#settings-icon' ).click( function() {
    $( '#settings-list').slideToggle();
  });

  $( '#play-music' ).click( function() {
    $( '#soundcloud-widget').slideToggle();
  });

  // $( '#add-participant' ).keypress(function (e) {
  //   var key = e.which;
  //   var name = $( this ).val();
  //   console.log(key)
  //   console.log(name)
  //   if (key === 13) {
  //     console.log( "adding " +name )
  //     participants.push( name );
  //     return true;
  //   }
  // });

  // Populate "show what's possible" lists
  populateList( '#participants', participants )
  populateList( '#actions', actions )
  populateList( '#speech-topics', speechTopics )
  populateList( '#titles', titles )
  populateList( '#famous-people', famousPeople )

  // Populate first list with participants
  populateList( '#first', participants )
  populateList( '#second', actions )

  $( '#first' ).bandit({
    speed: speedInterval,
    delay: delay,
    accel: accel,
    decel: decel,
    autoStop: autoStopInterval,
    spinButton: '#start-first',
    stopButton: '#stop',
    spinOnLoad: false,
    done: function(text) {
      $( '#start-second' ).trigger( 'click' );
      $( '#action-info' ).slideUp();
    }
  });

  $( '#second' ).bandit({
    speed: speedInterval,
    delay: delay,
    accel: accel,
    decel: decel,
    autoStop: autoStopInterval,
    spinButton: '#start-second',
    stopButton: '#stop',
    spinOnLoad: false,
    done: function(text) {
      $( '#third' ).empty();

      var remainingParticipants;
      var firstParticipant = $( '#first :first-child' ).text()

      switch (text) {
        case 'se':
          remainingParticipants = getRemainingParticipants(firstParticipant);
          populateList( '#third', remainingParticipants );
          $( '#action-info > *' ).html('dypt inn i øynene og gi et ektefølt kompliment :)');
          break;
        case 'rævkroke med':
          remainingParticipants = getRemainingParticipants(firstParticipant);
          populateList( '#third', remainingParticipants );
          $( '#action-info > *' ).html('vinneren får no greier');
          break;
        case 'tommelkrige med':
          remainingParticipants = getRemainingParticipants(firstParticipant);
          populateList( '#third', remainingParticipants );
          $( '#action-info > *' ).html('vinneren får no greier');
          break;
        case 'holde en tale om':
          populateList( '#third', speechTopics );
          $( '#action-info > *' ).html('pling, pling, pling..');
          break;
        case 'lese diktet':
          populateList( '#third', titles );
          $( '#action-info > *' ).html('«og det er forfattararen sjalv som las»');
          break;
        case 'holde foredraget':
          populateList( '#third', titles );
          $( '#action-info > *' ).html('keep it short, stupid!');
          break;
        case 'fremføre sangen':
          populateList( '#third', titles );
          $( '#action-info > *' ).html('1, 2 og 1, 2, 3, 4!');
          break;
        case 'parodiere':
          populateList( '#third', famousPeople );
          $( '#action-info > *' ).html('lykke til!');
          break;
      }

      $( '#start-third' ).trigger( 'click' );
    }
  });

  $( '#third' ).bandit({
    speed: speedInterval,
    delay: delay,
    accel: accel,
    decel: decel,
    autoStop: autoStopInterval,
    spinButton: '#start-third',
    stopButton: '#stop',
    spinOnLoad: false,
    done: function(text) {
      $( '#action-info' ).slideDown();
    }
  });
});
