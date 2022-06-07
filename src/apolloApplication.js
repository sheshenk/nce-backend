import { createApplication } from "graphql-modules";
import HTTPResponseModule from "../types/HTTPResponse.js";
import MarketHistoryModule from "../types/MarketHistory.js";
import OrderFillingModule from "../types/OrderFilling.js";
import UserModule from '../types/User.js'
import WalletModule from "../types/Wallet.js";
import WalletAssetModule from "../types/WalletAsset.js";

const apolloApplication = createApplication({
	modules: [
		UserModule,
		HTTPResponseModule,
		WalletModule,
		WalletAssetModule,
		MarketHistoryModule,
		OrderFillingModule
	]
})

export default apolloApplication