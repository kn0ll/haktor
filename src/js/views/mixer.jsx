define([
  'React',
  'AudioletGroupView'
], (
  React,
  AudioletGroupView
) => {

  return class MixerView extends AudioletGroupView {

    getRenderedParameters() {
      return [
        this.props.mixer.masterGain.value
      ];
    }

    handleSetMasterGain(e) {
      var val = e.target.value;
      this.props.mixer.masterGain.value.setValue(val / 100);
    }

    render() {
      return (
        <ul className="mixer">
          <li>
            <label htmlFor="masterGain">masterGain</label><br />
            <input
              name="masterGain"
              type="range"
              min="0"
              max="100"
              value={this.props.mixer.masterGain.value.getValue() * 100}
              onChange={this.handleSetMasterGain.bind(this)} />
          </li>
        </ul>
      );
    }

  };

});
