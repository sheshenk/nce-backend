import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../src/apolloServer.js";
// import { readClosedOrders } from "../db_functions/ClosedOrder.js";

const ClosedOrderModule = createModule({
	id: 'closed-order',
	typeDefs: gql`
		type ClosedOrder {
			orderid: ID!
            walletid: ID!
            owner: String!
            buySide: String!
            quantity: Float!
            symbol: String!
            price: Float!
            fillCost: Float!
            fillPrice: Float!
            createdAt: String!
            filledAt: String!
		}

		type Query {
			getClosedOrdersForSymbol(symbol: String!): [ClosedOrder!]
		}

	`,
	resolvers: {
		Query: {
			getClosedOrdersForSymbol: (p, a, c) => readClosedOrders(a)
		}
	}
})

export default ClosedOrderModule

