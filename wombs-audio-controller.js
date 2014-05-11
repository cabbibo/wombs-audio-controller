
  /*
   
     Singleton controller of audio

     TODO: make sure updating of frequency bin count updates
     the texture properly

  */

  var _ = require( 'underscore' );
  
  var Component = require( 'wombs-audio-component' );
  var Texture   = require( 'wombs-audio-texture' );


  var mutate = {};

  mutate.detect = function(){

    try {
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
    }catch(e) {
      this.onError( 'No Web Audio API' ); 
    }

  }

  mutate.onError = function( string ){
    console.log( string );
  }


  AudioController.prototype = _.extend(
    Component.prototype,
    mutate
  );

  function AudioController( params ){

    this.detect();

    var ctx = new AudioContext();
    var input = ctx.createGainNode();
    input.connect( ctx.destination );

    var parentNode = {
      input: input,
      ctx: ctx
    }

    Component.call( this , parentNode );

    this.createAnalyser( 2048 );
    this.createTexture( this.analyser );

  
  }

  var ac = new AudioController();

  module.exports = ac;
