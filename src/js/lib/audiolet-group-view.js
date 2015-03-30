define([
  'React'
], (
  React
) => {

  return class AudioletGroupView extends React.Component {

    // this is how to handle views who display dynamic parameters
    // (or views who display static & dynamic parameters)
    /*
    componentDidMount() {
      var self = this;
      var tick = () => {
        requestAnimationFrame(tick);
        self.forceUpdate();
      }

      tick();
    }
    */

    // this is how to handle views who display static parameters
    // todo: this probably will break if two view components try to
    //       display the same parameter. because the last one instantiated
    //       will be the last to override setValue. an event listener would
    //       solve this, but Audiolet parameters do not emit events on change.
    //       (currently this seems to invoke some sort of error)
    // todo: 'gain' here should be dynamic based on properties of the class
    componentDidMount() {
      var self = this,
        params = this.getRenderedParameters? this.getRenderedParameters(): [];

      for (var i = 0; i < params.length; i++) {
        (function(param, set) {
          param.setValue = (val) => {
            set.call(param, val);
            self.forceUpdate();
          }
        })(params[i], params[i].setValue);
      };
    }

  };

});
