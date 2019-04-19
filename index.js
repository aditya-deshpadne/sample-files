import exampleRoute from './server/routes/example';
import searchRoute from './server/routes/search_test';
import updateRoute from './server/routes/update_test';


export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'hello_world',
    uiExports: {
      app: {
        title: 'Hello World',
        description: 'test plugin',
        main: 'plugins/hello_world/app',
      },
      hacks: [
        'plugins/hello_world/hack'
      ],
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss'),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
	  searchRoute(server);
	  updateRoute(server);
    }
  });
}
