import { gql } from "apollo-server-core";
import { createModule } from "graphql-modules";
import { getAllContests, getUsersByContest } from "../db_functions/Contest.js";

const ContestModule = createModule({
    id: "contest",
    typeDefs: gql`
    	type Participant {
			userid: ID!
			name: String!
			return: Float!
			maxdrawdown: Float!
		}
        type Contest {
            id: ID!
            name: String!
            symbol: String!
            startat: String!
            endat: String
        }
        type Query {
			getParticipants(contestid: ID!): [Participant]
            getContests:[Contest]
		}
    `,
    resolvers: {
        Query: {
            getParticipants: (p, a, c) => getUsersByContest(a),
            getContests: (p, a, c) => getAllContests()
        }
    }
})

export default ContestModule