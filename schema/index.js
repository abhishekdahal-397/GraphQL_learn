const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    authors: [Author]
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createAuthor(name: String!): Author
    createPost(authorId: ID!, title: String!, content: String!): Post
    addComment(postId: ID!, content: String!): Comment
  }

  type Author {
    id: ID
    name: String
    posts: [Post]
  }

  type Post {
    id: ID
    title: String
    content: String
    author: Author
    comments: [Comment]
  }

  type Comment {
    id: ID
    content: String
    post: Post
  }
`);

module.exports = schema;
