import React from 'react';
import Styles from '../styles/controller';
import MixerView from './mixer';
import DeckView from './deck';

class ControllerView extends React.Component {

  render() {
    return (
      <div styles={[Styles.controller]}>
        <MixerView mixer={this.props.controller.mixer} />
        <div styles={[Styles.decks]}>
          <DeckView
            deck={this.props.controller.deckA}
            styles={[Styles.deck, Styles.deckA]} />
          <DeckView
            deck={this.props.controller.deckB}
            styles={[Styles.deck, Styles.deckB]} />
        </div>
      </div>
    );
  }

}

export default ControllerView;
