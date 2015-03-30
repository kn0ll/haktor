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
        this.props.mixer.gain.value
      ];
    }

    handleSetgain(e) {
      var val = e.target.value;
      this.props.mixer.gain.value.setValue(val / 100);
    }

    render() {
      return (
        <ul className="mixer">
          <li>
            <input
              type="range"
              min="0"
              max="100"
              value={this.props.mixer.gain.value.getValue() * 100}
              onChange={this.handleSetgain.bind(this)} />
          </li>
        </ul>
      );
    }

  };

});
