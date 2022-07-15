import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { readOpenBidOrders, getOpenBidOrdersForSymbolAndUser } from "../db_functions/OpenBidOrder.js";
import { pubsub } from "../src/apolloServer.js";

const OpenBidOrderModule = createModule({
	id: 'open-bid-order',
	typeDefs: gql`
		type OpenBidOrder {
            price: Float!
            openquantity: Float!
		}

		type Query {
			getOpenBidOrdersForSymbol(symbol: String!, number: Int): [OpenBidOrder!]
			getOpenBidOrdersForSymbolAndUser(symbol: String!, owner: ID): [OpenBidOrder!]
		}

		type Subscription {
			newBidOpenOrder(symbol:String!): [OpenBidOrder!]
		}

	`,
	resolvers: {
		Query: {
			getOpenBidOrdersForSymbol: (p, a, c) => readOpenBidOrders(a),
			getOpenBidOrdersForSymbolAndUser: (p, a, c) => getOpenBidOrdersForSymbolAndUser(a)
		},
		Subscription: {
			newBidOpenOrder: {
				subscribe: () => pubsub.asyncIterator(["UPDATE_BID_ORDER"])
			}
		}
	}
})

export default OpenBidOrderModule
