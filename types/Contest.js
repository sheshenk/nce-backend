import { gql } from "apollo-server-core";
import { createModule } from "graphql-modules";
import { getUsersByContest, getAllContests } from "../db_functions/Contest.js";

const ContestModule = createModule({
    id: "contest",
    typeDefs: gql`
    	type Participant {
			userid: ID!
			name: String!
			return: Float!
			maxdrawdown: Float!
            pltrend: [Float]
		}
        type Contest {
            id: ID!
            name: String!
            symbol: String!
            startat: String!
            endat: String
        }

        type Query {
			getParticipants(contestname: String!, userid: ID!): [Participant]
            getContests:[Contest]
		}
    `,
    // type PLResult {
    //     id: ID!
    //     pl: [Float]
    // }
    // getParticipantPL:[PLResult]
    resolvers: {
        Query: {
            getParticipants: (p, a, c) => getUsersByContest(a),
            getContests: (p, a, c) => getAllContests(),
            // getParticipantPL: (p, a, c) => getPLByContestNameAndUserid(a)
        }
    }
})

export default ContestModule