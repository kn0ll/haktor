requirejs.config({

  deps: ['main'],

  paths: {
    Audiolet: 'lib/audiolet',
    AudioletGroupView: 'lib/audiolet-group-view',
    React: 'lib/react.0.13.1'
  },

  shim: {
    Audiolet: {
      exports: 'Audiolet'
    }
  }

});
