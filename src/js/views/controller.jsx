define([
  'React',
  'views/mixer',
  'views/deck'
], (
  React,
  MixerView,
  DeckView
) => {

  return class ControllerView extends React.Component {

    render() {
      return (
        <div className="controller">
          <DeckView deck={this.props.controller.deckA} />
          <DeckView deck={this.props.controller.deckB} />
          <MixerView mixer={this.props.controller.mixer} />
        </div>
      );
    }

  };

});
