const listHelper = require('../utils/list_helper')
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  const listWithOneBlog = [
    blogs[0]
  ]

  test('for one blog equals the likes of the blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('for empty list equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test(' for all the blogs equals 36', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('Favorite blog', () => {
  const oneBlog = [blogs[0]]

  test('is null for empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('for list with one blog is the blog itself', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(blogs[0])
  })

  test('for the full array to be the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('The author with most blogs', () => {
  const oneBlog = [blogs[0]]
  const authorOfOneBlog = {author: oneBlog[0].author, blogs: 1}
  test('is null for empty array', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('for list with one blog is the author of the blog', () => {
    const result = listHelper.mostBlogs(oneBlog)
    expect(result).toEqual(authorOfOneBlog)
  })

  const most = {author: 'Robert C. Martin', blogs: 3}
  test('for the full array is the author of most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(most)
  })
})

describe('The author with most likes', () => {
  const oneBlog = [blogs[0]]
  const authorOfOneBlog = {author: oneBlog[0].author, likes: oneBlog[0].likes}

  test('is null for empty array', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('for one blog is the author of that blog', () => {
    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual(authorOfOneBlog)
  })
  const most = {author: 'Edsger W. Dijkstra', likes: 17}
  test('for the full array is the author with most total likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(most)
  })
})
