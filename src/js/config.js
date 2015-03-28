requirejs.config({

  deps: ['main'],

  paths: {
    Audiolet: 'lib/audiolet',
    React: 'lib/react.0.13.1',
    Reflux: 'lib/reflux.0.2.7'
  },

  shim: {
    Audiolet: {
      exports: 'Audiolet'
    }
  }

});
