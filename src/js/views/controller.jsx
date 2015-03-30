import React from 'react';
import Styles from '../styles/controller';
import MixerView from './mixer';
import DeckView from './deck';

class ControllerView extends React.Component {

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

}

export default ControllerView;
