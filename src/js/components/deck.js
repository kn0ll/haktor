define([
  'Audiolet'
], (
  Audiolet
) => {

  return class Deck extends AudioletGroup {

    constructor(audiolet, freq) {
      super(audiolet, 0, 1);
      var buffer = new AudioletBuffer(2, 0),
        bufferPlayer = this.bufferPlayer = new BufferPlayer(audiolet, buffer, 1, 0, 1),
        output = this.outputs[0];

      bufferPlayer.playing = false;
      bufferPlayer.connect(output);
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
