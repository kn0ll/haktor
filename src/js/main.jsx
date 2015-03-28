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

  React.render(
    <ControllerView controller={controller} />,
    document.body
  );

});
