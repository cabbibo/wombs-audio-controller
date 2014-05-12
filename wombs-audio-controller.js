
  /*
   
     Singleton controller of audio

     TODO: make sure updating of frequency bin count updates
     the texture properly

  */

  var Component = require( 'wombs-audio-component' );
  var _ = require( 'underscore' );

  var mutation = {};

  mutation.detect = function(){

    try{
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
    }catch(e){
      this.onError( 'No Web Audio API' ); 
    }

  }

  mutation.onError = function( string ){
    console.log( string );
  }

  AudioController.prototype = _.extend(
    Component.prototype,
    mutation 
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

    this.createAnalyser( 1024 );
    this.createTexture( this.analyser );
  
  }

  var ac = new AudioController();

  module.exports = ac;
