var express = require('express')
var graphqlHTTP = require('express-graphql')
var {buildSchema} = require('graphql')
var schema = buildSchema(`
	type Author {
		id: Int!
		firstName: String
		lastName: String
	}
	type Query {
		hello: [Author]
		authors: [Author]
		author(id: Int!): Author!
	}
`);

const authors = [
	{id: 1, firstName: 'Derek', lastName: 'Ericsson'},
	{id: 2, firstName: 'Derek', lastName: 'Ericsson'},
	{id: 3, firstName: 'Derek', lastName: 'Ericsson'},
]

var root = { hello: ()=>authors.filter( au => au.id!=1 ), authors, author: ({id})=>{
	console.log(id)
	return authors.find(author => author.id===id)
	} }

var app = express()
app.use('/graphql',graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));
app.listen(4000, ()=>console.log('Server Listen at port 4000'))
