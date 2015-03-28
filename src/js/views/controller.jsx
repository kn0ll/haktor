define([
  'React',
  'views/mixer'
], (
  React,
  MixerView
) => {

  return class ControllerView extends React.Component {

    render() {
      return (
        <MixerView mixer={this.props.controller.mixer} />
      );
    }

  }

});
