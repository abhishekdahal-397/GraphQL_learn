const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/index");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import resolvers
const authorResolvers = require("./resolvers/author");
const postResolvers = require("./resolvers/post");
const commentResolvers = require("./resolvers/comment");

// Combine resolvers
const rootResolver = {
	...authorResolvers,
	...postResolvers,
	...commentResolvers,
};

const app = express();

// GraphQL Endpoint
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		rootValue: rootResolver,
		graphiql: true,
	})
);

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(4000, () =>
			console.log("Server running at http://localhost:4000/graphql")
		);
	})
	.catch((err) => console.log(err));
