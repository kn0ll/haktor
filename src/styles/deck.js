import StyleSheet from 'react-style';

var Styles = StyleSheet.create({

  deck: {
    backgroundColor: '#E9E9E9',
    listStyle: 'none',
    margin: 0,
    padding: 5,
    boxSizing: 'border-box',
    position: 'relative',
    paddingRight: 40,
    border: '1px solid #4C5A68'
  },

  setSourceButton: {
    marginBottom: 5
  },

  deckButtonGroup: {
    marginTop: 5
  },

  deckButton: {
    WebkitAppearance: 'none',
    border: 'none',
    background: '#4C5A68',
    color: '#F4F7FF',
    padding: 6,
    marginRight: 5
  },

  scrubber: {
    backgroundColor: '#000',
    overflow: 'hidden',
    position: 'relative'
  },

  scrubberCenterMarker: {
    width: 1,
    background: '#FF0000',
    height: '100%',
    position: 'absolute',
    left: '50%'
  },

  scrubberImg: {
    position: 'relative',
    marginLeft: '50%'
  },

  deckTempoControl: {
    position: 'absolute',
    right: -47,
    top: 68,
    WebkitTransform: 'rotate(-90deg)'
  }

});

export default Styles;
