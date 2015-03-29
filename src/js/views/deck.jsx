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

    handleSetSource(e) {
      var self = this,
        reader = new FileReader();

      reader.onload = (e) => self.props.deck.loadWav(e.target.result);
      reader.readAsBinaryString(e.target.files[0]);
    }

    handleSetPlay(e) {
      this.props.deck.play();
    }

    render() {
      return (
        <ul className="deck">
          <li>
            <label htmlFor="source">source</label><br />
            <input
              name="source"
              type="file"
              onChange={this.handleSetSource.bind(this)} />
          </li>
          <li>
            <input
              type="button"
              value="Play"
              onClick={this.handleSetPlay.bind(this)} />
          </li>
        </ul>
      );
    }

  };

});
