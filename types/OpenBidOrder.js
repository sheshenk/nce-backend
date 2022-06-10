import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../src/apolloServer.js";
import { readOpenBidOrders } from "../db_functions/OpenBidOrder.js";

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
            openQuantity: Float!
            fillCost: Float!
            createdAt: String!
            updatedAt: String!
		}

		type Query {
			getOpenBidOrdersForSymbol(symbol: String!): [OpenBidOrder!]
		}

	`,
	resolvers: {
		Query: {
			getOpenBidOrdersForSymbol: (p, a, c) => readOpenBidOrders(a)
		}
	}
})

export default OpenBidOrderModule