const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + (item['likes'] || 0)
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favouriteIndex = 0
  let maxLikes = 0

  blogs.forEach((blog, index) => {
    if(blog.likes > maxLikes){
      favouriteIndex = index
      maxLikes = blog.likes
    }
  });

  const {title, author, likes} = blogs[favouriteIndex]

  return {title, author, likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}