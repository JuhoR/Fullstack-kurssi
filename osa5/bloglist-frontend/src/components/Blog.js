import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, modifier, remover }) => {
    const [view, setView] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggle = (event) => {
        event.preventDefault()
        setView( !view )
    }

    const addLike = (event) => {
        event.preventDefault()
        blog.likes = blog.likes + 1
        console.log(modifier)
        modifier(blog)
    }

    const removeBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'`)){
            remover(blog)
        }
    }

    if ( view ) {
        return (
            <div style={blogStyle} className='blog'>
                <div>
                    <div>{blog.title} {blog.author} <button id='blog-hide-button' onClick={toggle}>hide</button></div>
                    <div>{blog.url}</div>
                    <div id='blog-like-container'>likes {blog.likes} <button id='like-button' onClick={addLike}>like</button></div>
                    <div>{blog.user.name}</div>
                    <div><button id='delete-button' onClick={removeBlog}>remove</button></div>
                </div>
            </div>
        )
    }
    return (
        <div style={blogStyle} className='blog'>
            <div>
                {blog.title} {blog.author} <button id='blog-view-button' onClick={toggle}>view</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    modifier: PropTypes.func.isRequired,
    remover: PropTypes.func.isRequired
}

export default Blog
