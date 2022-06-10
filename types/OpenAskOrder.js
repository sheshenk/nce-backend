import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../src/apolloServer.js";
import { readOpenAskOrders } from "../db_functions/OpenAskOrder.js";

const OpenAskOrderModule = createModule({
	id: 'open-ask-order',
	typeDefs: gql`
		type OpenAskOrder {
			orderid: ID!
            walletid: ID!
            owner: String!
            quantity: Float!
            symbol: String!
            price: Float!
            openQuantity: Float!
            fillCost: Float!
            createdAt: String!
            updatedAt: String!
		}

		type Query {
			getOpenAskOrdersForSymbol(symbol: String!): [OpenAskOrder!]
		}

	`,
	resolvers: {
		Query: {
			getOpenAskOrdersForSymbol: (p, a, c) => readOpenAskOrders(a)
		}
	}
})

export default OpenAskOrderModule