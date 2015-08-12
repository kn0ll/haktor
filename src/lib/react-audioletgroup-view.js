import React from 'react';

class AudioletGroupView extends React.Component {

  // this is how to handle views who display static parameters
  // todo: this probably will break if two view components try to
  //       display the same parameter. because the last one instantiated
  //       will be the last to override setValue. an event listener would
  //       solve this, but Audiolet parameters do not emit events on change.
  //       (currently this seems to invoke some sort of error)
  // todo: cleanup on unmount
  componentDidMount() {
    var self = this,
      params = this.getRenderedParameters? this.getRenderedParameters(): [],
      hasDynamicParam = params.filter((param) => !param.setValue || param.isDynamic()).length;

    // if we have just a plain int/string or dynamic param
    // unfortunately we have no method for listening to changes
    if (hasDynamicParam) {
      var tick = () => {
        requestAnimationFrame(tick);
        self.forceUpdate();
      }
      tick();

    // if all the params are static we do not need to register
    // with requestAnimationFrame
    } else {
      for (var i = 0; i < params.length; i++) {
        (function(param, set) {
          param.setValue = (val) => {
            set.call(param, val);
            self.forceUpdate();
          }
        })(params[i], params[i].setValue);
      }
    }


  }

}

export default AudioletGroupView;
