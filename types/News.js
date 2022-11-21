import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { getNews, newNews } from "../db_functions/News.js";
import { pubsub } from "../src/apolloServer.js";

const NewsModule = createModule({
	id: 'news',
	typeDefs: gql`

		type News {
            time: String!
			header: String!
			details: String!
            symbol: String!
		}

		type Query {
			getNews(symbol: String, number: Int): [News]
		}

		type Mutation {
			newNews(header: String!, details: String!, symbol: String!): HTTPResponse
		}
		type Subscription {
			newNews(symbol: String!): News!
		}
	`,
	resolvers: {
		Query: {
			getNews: (p, a, c) => getNews(a)
		},
		Mutation: {
			newNews: (p, a, c) => newNews(a)
		},
		Subscription: {
			newNews: {
				subscribe: (p, a, c) => pubsub.asyncIterator(["NEWS_" + a.symbol.toUpperCase()])
			}
		}
	}
})

export default NewsModule
