define([
  'Audiolet'
], (
  Audiolet
) => {

  return class Controller extends AudioletGroup {

    constructor(audiolet) {
      super(audiolet, 0, 1);
      var sine = new Sine(audiolet, 440),
        output = this.outputs[0];

      sine.connect(output);
    }

  }

});
