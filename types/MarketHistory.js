import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { readMarketHistory, updateMarketHistory, readMarketHistoryAPI } from "../db_functions/MarketHistory.js";

const MarketHistoryModule = createModule({
	id: 'market-history',
	typeDefs: gql`
		type MarketHistory {
			time: String!
			# symbol: String!
			open: Float!
			close: Float!
			high: Float!
			low: Float!
			volume: Float!
		}

		type Query {
			getMarketHistoryForSymbol(symbol: String!): [MarketHistory!]
			readMarketHistoryAPI(symbol: String!, number: Int): [MarketHistory!]
		}

		type Mutation {
			updateMarketHistory(symbol: String!, price: Float!, quantity: Float!): HTTPResponse
		}

	`,
	resolvers: {
		Query: {
			getMarketHistoryForSymbol: (p, a, c) => readMarketHistory(false, a),
			readMarketHistoryAPI: (p, a, c) => readMarketHistoryAPI(a)
		},
		Mutation: {
			updateMarketHistory: (p, a, c) => updateMarketHistory(a)
		}
	}
})

export default MarketHistoryModule
