import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../src/apolloServer.js";
import { readOpenBidOrders, getOpenBidOrdersForSymbolAndUser } from "../db_functions/OpenBidOrder.js";

const OpenBidOrderModule = createModule({
	id: 'open-bid-order',
	typeDefs: gql`
		type OpenBidOrder {
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
			getOpenBidOrdersForSymbol(symbol: String!): [OpenBidOrder!]
			getOpenBidOrdersForSymbolAndUser(symbol: String!, owner: ID): [OpenBidOrder!]
		}

	`,
	resolvers: {
		Query: {
			getOpenBidOrdersForSymbol: (p, a, c) => readOpenBidOrders(a),
			getOpenBidOrdersForSymbolAndUser: (p, a, c) => getOpenBidOrdersForSymbolAndUser(a)
		}
	}
})

export default OpenBidOrderModule