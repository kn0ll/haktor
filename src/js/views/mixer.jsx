define([
  'React'
], (
  React
) => {

  return class MixerView extends React.Component {

    render() {
      return (
        <ul>
          <li>masterGain: {this.props.mixer.masterGain.value.getValue()}</li>
        </ul>
      );
    }

  }

});
