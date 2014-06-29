var dogBarkingBuffer = null;
var context;

window.addEventListener( 'load', init, false );

function init() {
  try {
    window.AudioContext =
      window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    loadDogSound( 'music.local/media/song.wav' );
  }
  catch( e ) {
    alert( 'Web Audio API is not supported in this browser' );
  }
}

function loadDogSound( url ) {
  var request = new XMLHttpRequest();
  request.open( 'GET', url, true );
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData( request.response, function( buffer ) {
  alert('got here');
      dogBarkingBuffer = buffer;
      playSound( buffer );


    }, onError );
  }
  request.send();
}

function playSound( buffer ) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect( context.destination );
  source.start(0);
}


playSound( '../media/song.wav' );
