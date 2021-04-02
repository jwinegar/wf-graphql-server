const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const path = require('path');

const WorkfrontAPI = require('./datasources/workfront');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const API_KEY = process.env.WF_API_KEY;
const COMPANY_ID = process.env.WF_COMPANY_ID;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    workfrontAPI: new WorkfrontAPI(),
  }),
  context: () => {
    return {
      token: API_KEY,
      companyID: COMPANY_ID,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
