define([
  'Audiolet'
], (
  Audiolet
) => {

  class DeckMixer extends AudioletGroup {

    constructor(audiolet) {
      super(audiolet, 1, 1);
      var gain = this.gain = new Gain(audiolet, 0.5),
        output = this.outputs[0];

      this.inputs[0].connect(gain);
      gain.connect(output);
    }

  }

  return class Deck extends AudioletGroup {

    constructor(audiolet, freq) {
      super(audiolet, 0, 1);
      var buffer = new AudioletBuffer(2, 0),
        bufferPlayer = this.bufferPlayer = new BufferPlayer(audiolet, buffer, 1, 0, 1),
        mixer = this.mixer = new DeckMixer(audiolet),
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
    }

    play() {
      this.bufferPlayer.position = 0;
      this.bufferPlayer.playing = true;
    }

  }

});
