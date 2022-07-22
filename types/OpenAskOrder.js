import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { readOpenAskOrders, getOpenAskOrdersForSymbolAndUser } from "../db_functions/OpenAskOrder.js";
import { pubsub } from "../src/apolloServer.js";

const OpenAskOrderModule = createModule({
	id: 'open-ask-order',
	typeDefs: gql`
		type OpenAskOrder {
            price: Float!
            openquantity: Float!
		}

		type UserAskOrder {
			orderid: String!
			quantity: Float!
			price: Float!
			openquantity: Float!
			fillcost: Float!
			createdat: String!
			updatedat: String!
		}

		type Query {
			getOpenAskOrdersForSymbol(symbol: String!, number: Int): [OpenAskOrder!]
			getOpenAskOrdersForSymbolAndUser(symbol: String!, owner: ID): [UserAskOrder!]
		}

		type Subscription {
			getOpenAskOrdersForSymbol(symbol:String!): [OpenAskOrder!]
		}
	`,
	resolvers: {
		Query: {
			getOpenAskOrdersForSymbol: (p, a, c) => readOpenAskOrders(a),
			getOpenAskOrdersForSymbolAndUser: (p, a, c) => getOpenAskOrdersForSymbolAndUser(a)
		},
		Subscription: {
			getOpenAskOrdersForSymbol: {
				subscribe: (p, a, c) => pubsub.asyncIterator(["UPDATE_ASK_ORDER_" + a.symbol.toUpperCase()])
			}
		}
	}
})

export default OpenAskOrderModule
