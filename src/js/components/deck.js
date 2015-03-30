import {AudioletGroup, AudioletBuffer, BufferPlayer, Gain, WAVDecoder} from '../lib/audiolet';

class Mixer extends AudioletGroup {

  constructor(audiolet) {
    super(audiolet, 1, 1);
    var gain = this.gain = new Gain(audiolet, 0.5),
      output = this.outputs[0];

    this.inputs[0].connect(gain);
    gain.connect(output);
  }

}

class Deck extends AudioletGroup {

  constructor(audiolet, freq) {
    super(audiolet, 0, 1);
    var buffer = new AudioletBuffer(2, 0),
      bufferPlayer = this.bufferPlayer = new BufferPlayer(audiolet, buffer),
      cuePoints = this.cuePoints = new Array(4),
      mixer = this.mixer = new Mixer(audiolet),
      output = this.outputs[0];

    bufferPlayer.playing = false;
    bufferPlayer.connect(mixer);
    mixer.connect(output);
  }

  loadWav(binaryString) {
    var decoder = new WAVDecoder(),
      decoded = decoder.decode(binaryString),
      bufferPlayer = this.bufferPlayer,
      buffer = new AudioletBuffer(decoded.channels.length, decoded.length);

    buffer.length = decoded.length;
    buffer.numberOfChannels = decoded.channels.length;
    buffer.unslicedChannels = decoded.channels;
    buffer.channels = decoded.channels;
    buffer.channelOffset = 0;

    bufferPlayer.buffer = buffer;
    bufferPlayer.position = 0;
  }

  play() {
    this.bufferPlayer.playing = true;
  }

  pause() {
    this.bufferPlayer.playing = false;
  }

  stop() {
    this.bufferPlayer.playing = false;
    this.bufferPlayer.position = 0;
  }

  setCuePoint(index, time) {
    this.cuePoints[index] = time;
  }

  getCuePoint(index) {
    return this.cuePoints[index];
  }

  jumpToCuePoint(index) {
    var time = this.getCuePoint(index);
    this.bufferPlayer.position = time;
  }

}

export default Deck;
