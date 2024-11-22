const Author = require("../models/author");
const Post = require("../models/post");

module.exports = {
	authors: async () => {
		return Author.find().populate("posts");
	},
	createAuthor: async ({ name }) => {
		const author = new Author({ name });
		return author.save();
	},
};
