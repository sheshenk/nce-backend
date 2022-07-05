import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { addOrder, cancelOrder } from "../src/rabbitmq.js";


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
            cancelOrder(symbol: String!, side: String!, price: Float!, orderId: String!): HTTPResponse
		}

	`,
    resolvers: {
        Mutation: {
            createOrder: async (p, a, c) => {
                return await addOrder(a);
            },
            cancelOrder: async (p, a, c) => {
                return await cancelOrder(a);
            }
        }
    }
})

export default OrderModule