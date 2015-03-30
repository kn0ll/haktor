import React from 'react';
import AudioletGroupView from '../lib/react-audioletgroup-view';
import Styles from '../styles/deck';

class DeckView extends AudioletGroupView {

  getRenderedParameters() {
    return [
      this.props.deck.mixer.gain.value,
      this.props.deck.bufferPlayer.playbackRate
    ];
  }

  handleSetSource(e) {
    var self = this,
      reader = new FileReader();

    reader.onload = (e) => self.props.deck.loadWav(e.target.result);
    reader.readAsBinaryString(e.target.files[0]);
  }

  handlePlayPause(e) {
    var action = this.props.deck.bufferPlayer.playing? 'pause': 'play';
    this.props.deck[action]();
  }

  handleStop(e) {
    this.props.deck.stop();
  }

  handleCuePoint(e) {
    var index = e.target.value,
      deck = this.props.deck,
      time = deck.bufferPlayer.position,
      currentCuePoint = deck.getCuePoint(index);

    if (currentCuePoint) {
      deck.jumpToCuePoint(index);

    } else {
      deck.setCuePoint(index, time);
    }
  }

  handleSetGain(e) {
    var val = e.target.value;
    this.props.deck.mixer.gain.value.setValue(val / 100);
  }

  handleSetTempo(e) {
    var val = e.target.value;
    this.props.deck.bufferPlayer.playbackRate.setValue(val / 100)
  }

  render() {
    return (
      <ul styles={[this.props.styles, Styles.deck]}>
        <li>
          <input
            type="file"
            styles={[Styles.setSourceButton]}
            onChange={this.handleSetSource.bind(this)} />
        </li>
        <li>
          <input
            type="button"
            value={this.props.deck.bufferPlayer.playing? 'Pause': 'Play'}
            onClick={this.handlePlayPause.bind(this)} /><br />
          <input
            type="button"
            value="Stop"
            onClick={this.handleStop.bind(this)} />
        </li>
        <li>
          <input
            type="button"
            value="1"
            onClick={this.handleCuePoint.bind(this)} /><br />
          <input
            type="button"
            value="2"
            onClick={this.handleCuePoint.bind(this)} /><br />
          <input
            type="button"
            value="3"
            onClick={this.handleCuePoint.bind(this)} /><br />
          <input
            type="button"
            value="4"
            onClick={this.handleCuePoint.bind(this)} /><br />
        </li>
        <li>
          <input
            type="range"
            min="75"
            max="125"
            value={this.props.deck.bufferPlayer.playbackRate.getValue() * 100}
            onChange={this.handleSetTempo.bind(this)} />
        </li>
        <li>
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

}

export default DeckView;
