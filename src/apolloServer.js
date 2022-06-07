import { ApolloServer, AuthenticationError } from "apollo-server";
import apolloApplication from "./apolloApplication.js";
import jwt from "jsonwebtoken"

const schema = apolloApplication.createSchemaForApollo()

const whitelisted = ['Login', 'CreateUser']

const getUser = token => {
	if (token) {
		try {
			return jwt.verify(token, "nuscrypex")
		} catch (err) {
			return null
		}
	}
}

const apolloServer = new ApolloServer({
	schema,
	csrfPrevention: true,
	context: ({ req }) => {
		console.log(req.body.operationName)
		if (whitelisted.includes(req.body.operationName)) return {}
		const token = req.headers.authorization || 'Bearer null'
		if (!token.includes('Bearer ')) throw new AuthenticationError("Token must use Bearer format.")
		const user = getUser(token.split(' ')[1])
		if (!user) throw new AuthenticationError("You must be logged in.")
		return user
	}
})

const listenToApollo = () => apolloServer.listen().then(({url}) => {
	console.log(`Apollo Server is running at ${url}`)
}).catch(e => console.log(e))

export default listenToApollo