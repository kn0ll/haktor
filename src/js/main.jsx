import React from 'react';
import {Audiolet} from './lib/audiolet';
import Controller from './components/controller';
import ControllerView from './views/controller';

var audiolet = new Audiolet(),
  controller = new Controller(audiolet);

controller.connect(audiolet.output);

React.render(
  <ControllerView controller={controller} />,
  document.body
);
