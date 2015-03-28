define([
  'Audiolet'
], (
  Audiolet
) => {

  return class Deck extends AudioletGroup {

    constructor(audiolet, freq) {
      super(audiolet, 0, 1);
      var sine = this.sine = new Sine(audiolet, freq),
        output = this.outputs[0];

      sine.connect(output);
    }

  }

});
