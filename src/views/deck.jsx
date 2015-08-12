import React from 'react';
import {WAVDecoder} from '../lib/audiolet';
import AudioletGroupView from '../lib/react-audioletgroup-view';
import Styles from '../styles/deck';
import graphSamples from '../lib/graph-samples';

class ScrubberView extends AudioletGroupView {

  getRenderedParameters() {
    return [
      this.props.bufferPlayer.position
    ];
  }

  constructor() {
    super();
    this.state = {
      startX: 0,
      startPosition: 0,
      startPlaying: false,
      mousemoveListener: false,
      mouseupListener: false
    };
  }

  handleStartScrub(e) {
    var bufferPlayer = this.props.bufferPlayer,
      $scrubberImg = this.refs.scrubberImg.getDOMNode(),
      mousemoveListener = this.handleScrub.bind(this),
      mouseupListener = this.handleStopScrub.bind(this);

    this.setState({
      startX: e.clientX,
      startPosition: bufferPlayer.position,
      startPlaying: bufferPlayer.playing,
      mousemoveListener: mousemoveListener,
      mouseupListener: mouseupListener
    });

    bufferPlayer.playing = false;
    document.addEventListener('mousemove', mousemoveListener);
    document.addEventListener('mouseup', mouseupListener);
    e.preventDefault();
  }

  handleScrub(e) {
    var bufferPlayer = this.props.bufferPlayer,
      startPosition = this.state.startPosition,
      startX = this.state.startX,
      endX = e.clientX,
      moveX = endX - startX,
      moveCoefficient = 500;

    bufferPlayer.position = startPosition + (moveX * moveCoefficient);
    e.preventDefault();
  }

  handleStopScrub(e) {
    var bufferPlayer = this.props.bufferPlayer,
      startPlaying = this.state.startPlaying,
      $scrubberImg = this.refs.scrubberImg.getDOMNode();

    bufferPlayer.playing = startPlaying;
    document.removeEventListener('mousemove', this.state.mousemoveListener);
    document.removeEventListener('mouseup', this.state.mouseupListener);
    e.preventDefault();
  }

  render() {
    var width = 1000,
      height = 76,
      bufferPlayer = this.props.bufferPlayer,
      buffer = bufferPlayer.buffer,
      png = graphSamples(1000, 76, buffer.channels[0]),
      bufferLength = buffer.length,
      bufferPosition = bufferPlayer.position,
      positionPercent = bufferPosition / bufferLength,
      relativeX = width * positionPercent,
      scrubberImgLeft = { left: -relativeX };

    return (
      <div
        styles={[Styles.scrubber, {height: height}]}>
        <div
          styles={[Styles.scrubberCenterMarker]} />
        <img
          ref="scrubberImg"
          src={'data:image/png;base64,' + png.getBase64()}
          styles={[Styles.scrubberImg, scrubberImgLeft]}
          onMouseDown={this.handleStartScrub.bind(this)} />
      </div>
    );
  }

}

class DeckView extends AudioletGroupView {

  getRenderedParameters() {
    return [
      this.props.deck.bufferPlayer.playbackRate
    ];
  }

  handleSetSource(e) {
    var self = this,
      reader = new FileReader();

    reader.onload = (e) => {
      var decoder = new WAVDecoder(),
        wav = decoder.decode(e.target.result);

      self.props.deck.loadWav(wav);
      this.forceUpdate();
    }
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

  handleSetTempo(e) {
    var val = e.target.value;
    this.props.deck.bufferPlayer.playbackRate.setValue(val / 100)
  }

  render() {
    return (
      <div styles={[Styles.deck, this.props.styles]}>
        <input
          styles={[Styles.setSourceButton]}
          type="file"
          onChange={this.handleSetSource.bind(this)} />
        <ScrubberView
          bufferPlayer={this.props.deck.bufferPlayer} />
        <div
          styles={[Styles.deckButtonGroup]}>
          <input
            styles={[Styles.deckButton]}
            type="button"
            value={this.props.deck.bufferPlayer.playing? 'Pause': 'Play'}
            onClick={this.handlePlayPause.bind(this)} />
          <input
            styles={[Styles.deckButton]}
            type="button"
            value="Stop"
            onClick={this.handleStop.bind(this)} />
        </div>
        <div
          styles={[Styles.deckButtonGroup]}>
          <input
            styles={[Styles.deckButton]}
            type="button"
            value="1"
            onClick={this.handleCuePoint.bind(this)} />
          <input
            styles={[Styles.deckButton]}
            type="button"
            value="2"
            onClick={this.handleCuePoint.bind(this)} />
          <input
            styles={[Styles.deckButton]}
            type="button"
            value="3"
            onClick={this.handleCuePoint.bind(this)} />
          <input
            styles={[Styles.deckButton]}
            type="button"
            value="4"
            onClick={this.handleCuePoint.bind(this)} />
        </div>
        <input
          styles={[Styles.deckTempoControl]}
          type="range"
          min="75"
          max="125"
          value={this.props.deck.bufferPlayer.playbackRate.getValue() * 100}
          onChange={this.handleSetTempo.bind(this)} />
      </div>
    );
  }

}

export default DeckView;
