import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { addOrder, cancelOrder, modifyOrder } from "../src/rabbitmq.js";


const OrderModule = createModule({
    id: 'order',
    typeDefs: gql`
        type Order {
            symbol:String!
            type:String!
            side:String!
            quantity:Float!
            price:Float!
            ownerId:Int!
            walletId:Int!
        }

		type Mutation {
			createOrder(symbol: String!, type: String!, side: String!, quantity: Float!, price: Float!, ownerId: Int!, walletId: Int!): HTTPResponse
            cancelOrder(symbol: String!, side: String!, price: Float!, orderId: String!): HTTPResponse,
            modifyOrder(symbol: String!, side: String!, orderId: String!, prevQuantity: Float!, prevPrice: Float!, newQuantity: Float!, newPrice: Float!): HTTPResponse
		}

	`,
    resolvers: {
        Mutation: {
            createOrder: async (p, a, c) => {
                return await addOrder(a);
            },
            cancelOrder: async (p, a, c) => {
                return await cancelOrder(a);
            },
            modifyOrder: async (p, a, c) => {
                return await modifyOrder(a);
            }
        }
    }
})

export default OrderModule