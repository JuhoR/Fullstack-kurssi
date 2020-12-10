import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test ('The handler is called with the correct information', () => {
    const createBlog = jest.fn()

    const component = render(<NewBlogForm createBlog={createBlog} />)

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    // Fill the form with some values
    fireEvent.change(author, {
        target: { value: 'author' }
    })
    fireEvent.change(title, {
        target: { value: 'title' }
    })
    fireEvent.change(url, {
        target: { value: 'url' }
    })
    // submit the form by using fireEvent
    fireEvent.submit(form)

    // Check that createBlog was called once
    expect(createBlog.mock.calls).toHaveLength(1)

    // Check that the createBlog received the correct information
    // In my implementation, I don't wrap the values in an object when passing
    // them to createBlog function
    expect(createBlog.mock.calls[0][0]).toBe('title')
    expect(createBlog.mock.calls[0][1]).toBe('author')
    expect(createBlog.mock.calls[0][2]).toBe('url')
})
