const Post = require("../models/post");
const Author = require("../models/author");

module.exports = {
	posts: async () => {
		return Post.find().populate("author").populate("comments");
	},
	post: async ({ id }) => {
		return Post.findById(id).populate("author").populate("comments");
	},
	createPost: async ({ authorId, title, content }) => {
		const post = new Post({ author: authorId, title, content });
		await post.save();
		const author = await Author.findById(authorId);
		author.posts.push(post);
		await author.save();
		return post.populate("author");
	},
};
