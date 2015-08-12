import {AudioletGroup, AudioletBuffer, BufferPlayer, WAVDecoder} from '../lib/audiolet';

class Deck extends AudioletGroup {

  constructor(audiolet, freq) {
    super(audiolet, 0, 1);
    var buffer = new AudioletBuffer(2, 0),
      bufferPlayer = this.bufferPlayer = new BufferPlayer(audiolet, buffer),
      cuePoints = this.cuePoints = new Array(4),
      output = this.outputs[0];

    bufferPlayer.playing = false;
    bufferPlayer.connect(output);
  }

  loadWav(wav) {
    var bufferPlayer = this.bufferPlayer,
      buffer = new AudioletBuffer(wav.channels.length, wav.length);

    buffer.length = wav.length;
    buffer.numberOfChannels = wav.channels.length;
    buffer.unslicedChannels = wav.channels;
    buffer.channels = wav.channels;
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
