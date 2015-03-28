define([
  'Audiolet',
  'components/deck',
  'components/mixer'
], (
  Audiolet,
  Deck,
  Mixer
) => {

  return class Controller extends AudioletGroup {

    constructor(audiolet) {
      super(audiolet, 0, 1);
      var deckA = this.deckA = new Deck(audiolet, 330),
        deckB = this.deckB = new Deck(audiolet, 320),
        mixer = this.mixer = new Mixer(audiolet),
        output = this.outputs[0];

      deckA.connect(mixer.inputs[0]);
      deckB.connect(mixer.inputs[1]);
      mixer.connect(output);
    }

  }

});
