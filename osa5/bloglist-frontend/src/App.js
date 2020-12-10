import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        updateBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON){
            const user_login = JSON.parse(loggedUserJSON)
            setUser(user_login)
            blogService.setToken(user_login.token)
        }
    }, [])

    const modifyBlog = async ( blog ) => {
        try {
            await blogService.modify(blog)
            updateBlogs()
        }catch (exception) {
            console.log(exception)
        }
    }

    const removeBlog = async ( blog ) => {
        try {
            await blogService.remove(blog)
            updateBlogs()
            setNotification({ message: `Blog '${blog.title}' removed`, type: 'success' })
            setTimeout(() => setNotification(null), 5000)
        }catch (exception) {
            console.log(exception)
            setNotification({ message: 'Error: removing blog failed', type: 'error' })
            setTimeout(() => setNotification(null), 5000)
        }
    }

    const createBlog = async (title, author, url) => {
        try {
            //ToDo: send a post request to /api/blogs in blogs service
            const newBlog = { title: title, author: author, url: url, likes: 0 }
            await blogService.createNew(newBlog)
            updateBlogs()
            setNotification({ message: `a new blog '${title}' by '${author}' added`,
                type: 'success' })
            setTimeout(() => setNotification(null), 5000)
            blogFormRef.current()
        }catch (exception) {
            console.log(exception)
            setNotification({ message: 'Error: Adding the blog failed', type: 'error' })
            setTimeout(() => setNotification(null), 5000)
        }
    }

    const updateBlogs = () => {
        blogService.getAll().then(blogs => setBlogs( blogs ))
    }

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({
                username, password,
            })
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            setUser(user)
        } catch (exception) {
            setNotification({ message: 'wrong username or password', type:'error' })
            setTimeout(() => setNotification(null), 5000)
            console.log(exception)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
    }

    if (user === null) {
        return (
            <div>
                <Notification notification={notification}/>
                <LoginForm loginHandler={handleLogin} />
            </div>
        )
    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification}/>
            <div>
                {user.name} logged in <button onClick={handleLogout} >logout</button>
            </div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <NewBlogForm
                    createBlog={createBlog}
                />
            </Togglable>
            <div id='blog-container'>
                {blogs.sort((a, b) => -(a.likes-b.likes)).map(blog =>
                    <Blog key={blog.id} blog={blog} modifier={modifyBlog} remover={removeBlog}/>
                )}
            </div>
        </div>
    )
}

export default App
