var express = require('express')
var next = require('next')
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

const dev = process.env.NODE_ENV !== 'production'
const app = ({dev})
app
	.prepare()
	.then(()=>{
		const server = express()
		server.use('graphql', graphqlHTTP({
			schema: schema,
			rootValue: root,
			graphiql: true,
		}));
		server.get('/', (req, res)=>{
			app.render(req, res, '/myReact', {})
		})
		server.listen(4000, ()=>console.log('server listen at port 4000'))
	})

/*
var app = express()
app.use('/graphql',graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));
app.listen(4000, ()=>consoLE.LOG('sERVER Listen at port 4000'))
*/
