import React from 'react';
import AudioletGroupView from '../lib/react-audioletgroup-view';
import Styles from '../styles/mixer';

class MixerView extends AudioletGroupView {

  getRenderedParameters() {
    return [
      this.props.mixer.gain.value
    ];
  }

  handleSetgain(e) {
    var val = e.target.value;
    this.props.mixer.gain.value.setValue(val / 100);
  }

  render() {
    return (
      <ul styles={[Styles.mixer]}>
        <li styles={[Styles.parameter]}>
          <span
            styles={[Styles.parameterLabel]}>
            Master Gain
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={this.props.mixer.gain.value.getValue() * 100}
            onChange={this.handleSetgain.bind(this)}
          />
        </li>
      </ul>
    );
  }

}

export default MixerView;
