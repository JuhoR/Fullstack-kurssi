import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Test for blogs', () => {
    let component
    let blog
    let mockHandler
    beforeEach(() => {
        blog = {
            title: 'Testing the blog rendering',
            author: 'Someone',
            url: 'aaa.bbb/ccc',
            user: { name: 'Other' },
            likes: 10
        }
        mockHandler = jest.fn() // modifier and remover are required!
        component = render(<Blog blog={blog} modifier={mockHandler} remover={() => null}/>)
    })

    test ('renders the title and author name by default, but not url and likes', () => {
        expect(component.container).toHaveTextContent('Testing the blog rendering')
        expect(component.container).toHaveTextContent('Someone')
        expect(component.container).not.toHaveTextContent('aaa.bbb/ccc')
        expect(component.container).not.toHaveTextContent('10')
    })

    test ('renders the url and likes when the "view" button is pressed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        expect(component.container).toHaveTextContent('aaa.bbb/ccc')
        expect(component.container).toHaveTextContent('10')
    })

    test ('When the like button is pressed two times, the click handler is called twice ', () => {
        let button = component.getByText('view')
        fireEvent.click(button)
        button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
