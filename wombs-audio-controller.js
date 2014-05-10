
  /*
   
     Singleton controller of audio

     TODO: make sure updating of frequency bin count updates
     the texture properly

  */

  var Component = require( 'wombs-component' );
  var Texture   = require( 'wombs-audio-texture' );



  AudioController.prototype = new Component();

  function AudioController(){

    this._init();
    
    
    this.detect();


    this.ctx = new AudioContext();


    this.gain     = this.ctx.createGain();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.array = new Uint8Array();
    this.input    = this.ctx.createGain();

    this.input.connect( this.analyser );
    this.analyser.connect( this.gain );
    this.gain.connect( this.ctx.destination );

    this.texture = new Texture( this.analyser );
    this.addComponent( this.texture );

    this.setFrequencyBinCount( 1024 );
  
    this.addToUpdateArray( updateAnalyser ); 
  
  }


  var updateAnalyser = function(){

    this.analyser.getByteFrequencyData( this.analyser.array );


  }

  AudioController.prototype.mute = function(){

    this.gain.gain.value = 0;
  }

  AudioController.prototype.unmute = function(){

    this.gain.gain.value = 1;

  }


  AudioController.prototype.detect = function(){

    try {
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
    }catch(e) {
      this.onError( 'No Web Audio API' ); 
    }

  }

  AudioController.prototype.onError = function( string ){

    console.log( string );

  }


  AudioController.prototype.setFrequencyBinCount = function( fbc ){

 
    this.analyser.frequencyBinCount = fbc;
    this.analyser.array = new Uint8Array( fbc );
    
    if( this.texture ){
      this.texture.reset();
    }


  }

  var ac = new AudioController();

  module.exports = ac;
