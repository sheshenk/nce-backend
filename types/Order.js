import { gql } from "apollo-server";
import { createModule } from "graphql-modules";
import { addOrder } from "../src/rabbitmq.js";


const OrderModule = createModule({
    id: 'order',
    typeDefs: gql`
        type Order {
            symbol:String!
            type:String!
            side:String!
            quantity:Float!
            price:Float!
            ownerID:Int!
            walletID:Int!
        }

		type Mutation {
			createOrder(symbol:String!, type:String!, side:String!, quantity:Float!, price:Float!, ownerID:Int!, walletID:Int!): HTTPResponse
		}

	`,
    resolvers: {
        Mutation: {
            createOrder: (p, a, c) => {
                console.log(a);
                addOrder(a);
            }
        }
    }
})

export default OrderModule