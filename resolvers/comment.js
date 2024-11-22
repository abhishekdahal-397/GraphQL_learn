const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports = {
	addComment: async ({ postId, content }) => {
		const comment = new Comment({ post: postId, content });
		await comment.save();
		const post = await Post.findById(postId);
		post.comments.push(comment);
		await post.save();
		return comment.populate("post");
	},
};
