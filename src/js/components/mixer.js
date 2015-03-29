define([
  'Audiolet'
], (
  Audiolet
) => {

  return class Mixer extends AudioletGroup {

    constructor(audiolet) {
      super(audiolet, 2, 1);
      var masterGain = this.masterGain = new Gain(audiolet, 0.1),
        output = this.outputs[0];

      this.inputs[0].connect(masterGain);
      this.inputs[1].connect(masterGain);
      masterGain.connect(output);
    }

  }

});
