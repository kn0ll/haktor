define([
  'React',
  'AudioletGroupView'
], (
  React,
  AudioletGroupView
) => {

  return class DeckView extends AudioletGroupView {

    getRenderedParameters() {
      return [
        this.props.deck.sine.frequency
      ];
    }

    handleSetSine(e) {
      var val = e.target.value;
      this.props.deck.sine.frequency.setValue(val);
    }

    render() {
      return (
        <ul className="deck">
          <li>
            <label htmlFor="frequency">frequency</label><br />
            <input
              name="frequency"
              type="range"
              min="100"
              max="1000"
              value={this.props.deck.sine.frequency.getValue()}
              onChange={this.handleSetSine.bind(this)} />
          </li>
        </ul>
      );
    }

  };

});
