let graphQLParams = {
	"query": `query searchAuthor($id:Int! = 1){
		 hello {
			  id
			  firstName
			  lastName
			  }
		 authors {
			  id
			  firstName
			  }
		 
		 author(id:$id) {
			  id
			  firstName
			  }
		​
}
`,
	"variables": { "id": 33 },
	"operationName": "searchAuthor"
}

function fetchData() {

	fetch('http://localhost:4000/graphql?', {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(graphQLParams),
		credentials: 'include',
	}).then(function (response) {
		response.json().then(data => console.log(data))
	});
}
