import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { readWalletAsset, updateWalletAsset } from "../db_functions/WalletAsset.js";

const WalletAssetModule = createModule({
	id: 'wallet-asset',
	typeDefs: gql`
		type WalletAsset {
			walletid: ID!
			symbol: String!
			amount: Float!
		},
		type Query {
			getAllWalletAssets: [WalletAsset!]
			getWalletAsset(walletid: ID!, symbol: String!): WalletAsset
		},
		type Mutation {
			addWalletAsset(walletid: ID!, symbol: String!, amount: Float!): HTTPResponse
		}
	`,
	resolvers: {
		Query: {
			getAllWalletAssets: (p, a, c) => readWalletAsset(false, {}),
			getWalletAsset: (p, a, c) => readWalletAsset(true, a)
		},
		Mutation: {
			addWalletAsset: (p, a, c) => updateWalletAsset(a)
		}
	}
})

export default WalletAssetModule