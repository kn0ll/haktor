define([
  'React',
  'styles/controller',
  'views/mixer',
  'views/deck'
], (
  React,
  Styles,
  MixerView,
  DeckView
) => {

  return class ControllerView extends React.Component {

    render() {
      return (
        <div>
          <MixerView mixer={this.props.controller.mixer} />
          <div style={Styles.decks}>
            <DeckView deck={this.props.controller.deckA} style={Styles.deck} />
            <DeckView deck={this.props.controller.deckB} style={Styles.deck} />
          </div>
        </div>
      );
    }

  };

});
