require([
  'React',
  'views/main'
], (
  React,
  MainView
) => {

  React.render(
    <MainView />,
    document.body
  );

});
