const {users, posts} = require('./data') //no need for .js

const getUserById = (id, cb) => {
  // simulate API call
  setTimeout(() => {
    const user = users.find(user => user.id === id)
    cb(user)
  }, 150)
}

const getPostsForUser = (userId, cb) => {
  // simulate API call
  window.setTimeout(() => {
    const user_posts = posts.filter(post => post.createdBy === userId)
    cb(user_posts)
  }, 150)
}

module.exports = {
  getUserById,
  getPostsForUser
}