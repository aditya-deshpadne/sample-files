
export default function (server) {

  server.route({
    path: '/api/HelloWorld/search_test',
    method: 'POST',
    handler(req, reply) {
	const query_param =  req.payload.searchterm;	
	const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');
	const searchPayload = {
		index: 'inspections',
	body: {
		query: {
				match: {
					"name": query_param
				}
			}
		
		}
	}
	callWithRequest(req, 'search', searchPayload).then(response => {
		console.log(response.status);
		console.log({response});
		console.log(response);
		})
  
	}
	

	  });

}
