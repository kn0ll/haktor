import {AudioletGroup, Gain} from '../lib/audiolet';

class Mixer extends AudioletGroup {

  constructor(audiolet) {
    super(audiolet, 2, 1);
    var gain = this.gain = new Gain(audiolet, 0.1),
      output = this.outputs[0];

    this.inputs[0].connect(gain);
    this.inputs[1].connect(gain);
    gain.connect(output);
  }

}

export default Mixer;
