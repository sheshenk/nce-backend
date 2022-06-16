import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../src/apolloServer.js";
import { readOpenAskOrders, getOpenAskOrdersForSymbolAndUser } from "../db_functions/OpenAskOrder.js";

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
            openquantity: Float!
            fillcost: Float!
            createdat: String!
            updatedat: String!
		}

		type Query {
			getOpenAskOrdersForSymbol(symbol: String!): [OpenAskOrder!]
			getOpenAskOrdersForSymbolAndUser(symbol: String!, owner: ID): [OpenAskOrder!]
		}

	`,
	resolvers: {
		Query: {
			getOpenAskOrdersForSymbol: (p, a, c) => readOpenAskOrders(a),
			getOpenAskOrdersForSymbolAndUser: (p, a, c) => getOpenAskOrdersForSymbolAndUser(a)
		}
	}
})

export default OpenAskOrderModule