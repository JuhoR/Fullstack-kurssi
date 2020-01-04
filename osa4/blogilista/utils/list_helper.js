const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((total, item) => total + item, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return (
      max.likes >= item.likes
        ? max
        : item
    )
}

  return (
    blogs.length === 0
      ? null
      : blogs.reduce(reducer, blogs[0])
  )
}

const findBlogsOfEachAuthor = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const uniqueAuthors = [... new Set(authors)]
  const blogsForAuthors = uniqueAuthors.map(author => {
     return ({
       author: author,
       blogs: blogs.filter(blog => blog.author===author)
     })
  })
  return blogsForAuthors
}

const mostBlogs = (blogs) => {
  const blogsOfAuthors = findBlogsOfEachAuthor(blogs)
  // Count the number of blogs
  const countedBlogs = blogsOfAuthors.map(b => {
    return ({
      author: b.author,
      blogs: b.blogs.length
    })
  })
  const reducer = (max, item) => max.blogs >= item.blogs ? max : item
  return (
    blogs.length === 0
      ? null
      : countedBlogs.reduce(reducer, countedBlogs[0])
  )
}

const mostLikes = (blogs) => {
  const blogsOfAuthors = findBlogsOfEachAuthor(blogs)
  const totalLikes = blogsOfAuthors.map(b => {
    const sumOfLikes = b.blogs.map(blog => blog.likes)
        .reduce((sum, item) => sum + item, 0)
    return ({
      author: b.author,
      likes: sumOfLikes
    })
  })
  const reducer = (max, item) => max.likes >= item.likes ? max : item
  return (
    blogs.length === 0
      ? null
      : totalLikes.reduce(reducer, totalLikes[0])
  )
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
