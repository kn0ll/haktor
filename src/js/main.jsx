require([
  'Audiolet',
  'React',
  'components/controller',
  'views/controller'
], (
  Audiolet,
  React,
  Controller,
  ControllerView
) => {

  var audiolet = new Audiolet(),
    controller = new Controller(audiolet);

  controller.connect(audiolet.output);

  React.render(
    <ControllerView controller={controller} />,
    document.body
  );

});
