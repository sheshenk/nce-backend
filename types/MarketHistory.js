import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { withFilter } from "graphql-subscriptions";
import { readMarketHistory, updateMarketHistory } from "../db_functions/MarketHistory.js";
import { pubsub } from "../src/apolloServer.js";

const MarketHistoryModule = createModule({
	id: 'market-history',
	typeDefs: gql`
		type MarketHistory {
			time: String!
			symbol: String!
			open: Float!
			close: Float!
			high: Float!
			low: Float!
			volume: Float!
		}

		type Query {
			getMarketHistoryForSymbol(symbol: String!): [MarketHistory!]
		}

		type Mutation {
			updateMarketHistory(symbol: String!, price: Float!, volume: Float!): HTTPResponse
		}

		type Subscription {
			marketHistoryUpdated(symbol: String!): MarketHistory
		}

	`,
	resolvers: {
		Query: {
			getMarketHistoryForSymbol: (p, a, c) => readMarketHistory(false, a)
		},
		Mutation: {
			updateMarketHistory: (p, a, c) => updateMarketHistory(a)
		},
		Subscription: {
			marketHistoryUpdated: {
				subscribe: withFilter(
					() => pubsub.asyncIterator(['MH_UPDATED']),
					(payload, variables) => {
						return payload.symbol === variables.symbol || variables.symbol === ''
					}
				)
			}
		}
	}
})

export default MarketHistoryModule