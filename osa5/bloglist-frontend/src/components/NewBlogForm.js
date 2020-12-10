import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        createBlog(title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2> create new </h2>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        title:
                        <input
                            type="text"
                            value={title}
                            id="title"
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author:
                        <input
                            type="text"
                            value={author}
                            id="author"
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url:
                        <input
                            type="text"
                            value={url}
                            id="url"
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button id="create-new-button" type="submit">create</button>
                </form>
            </div>
        </div>
    )
}

NewBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}
export default NewBlogForm
