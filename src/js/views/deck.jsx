define([
  'React',
  'Audiolet',
  'AudioletGroupView'
], (
  React,
  Audiolet,
  AudioletGroupView
) => {

  return class DeckView extends AudioletGroupView {

    getRenderedParameters() {
      return [
        this.props.deck.mixer.gain.value
      ];
    }

    handleSetSource(e) {
      var self = this,
        reader = new FileReader();

      reader.onload = (e) => self.props.deck.loadWav(e.target.result);
      reader.readAsBinaryString(e.target.files[0]);
    }

    handleSetPlay(e) {
      this.props.deck.play();
    }

    handleSetGain(e) {
      var val = e.target.value;
      this.props.deck.mixer.gain.value.setValue(val / 100);
    }

    render() {
      return (
        <ul className="deck">
          <li>
            <label>source</label><br />
            <input
              type="file"
              onChange={this.handleSetSource.bind(this)} />
          </li>
          <li>
            <input
              type="button"
              value="Play"
              onClick={this.handleSetPlay.bind(this)} />
          </li>
          <li>
            <label>gain</label><br />
            <input
              type="range"
              min="0"
              max="100"
              value={this.props.deck.mixer.gain.value.getValue() * 100}
              onChange={this.handleSetGain.bind(this)} />
          </li>
        </ul>
      );
    }

  };

});
