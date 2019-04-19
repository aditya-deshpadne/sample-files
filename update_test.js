export default function (server) {

  server.route({
    path: '/api/HelloWorld/update_test',
    method: 'POST',
    handler(req, reply) {
	const query_param =  req.payload.searchterm;	
	const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');
	let document = {
    index: 'inspections',
	type: '_doc',
	id : 'Z2sHi2cBb0MURfQpN2eS',
    body: {
      fieldA: 'something awsome'
    }
  };
	callWithRequest(req, 'index', document).then(response => {
		console.log(response.status);
		console.log(
		{response});
		console.log(response);
		})
  
	}
	

	  });

}
