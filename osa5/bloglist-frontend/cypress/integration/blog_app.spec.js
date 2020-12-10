describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            name: 'Juho',
            username: 'juho',
            password: 'perkele'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to the application')
        cy.contains('username')
        cy.contains('password')
    })
    describe('Login', function() {
        it('Login success', function() {
            cy.get('#username').type('juho')
            cy.get('#password').type('perkele')
            cy.get('#login-button').click()

            cy.contains('Juho logged in')
        })

        it('Login fails with wrong credentials', function(){
            cy.get('#username').type('testi')
            cy.get('#password').type('testi')
            cy.get('#login-button').click()

            cy.get('.error').contains('wrong username or password')
            cy.get('html').should('not.contain', 'Juho logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'juho', password: 'perkele' })
        })

        it('A blog can be created', function() {
            cy.get('#view-button').click()
            cy.get('#title').type('testi otsikko')
            cy.get('#author').type('testi author')
            cy.get('#url').type('testi url')
            cy.get('#create-new-button').click()

            cy.get('.success').contains('a new blog \'testi otsikko\' by \'testi author\' added')
            cy.get('#blog-container').contains('testi otsikko testi author')
        })

        describe('Created blog', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'aaa',
                    author: 'bbb',
                    url: 'bbb.com/aaa'
                })
            })
            it('A blog can be liked', function() {
                cy.get('#blog-view-button').click()
                //check that there are no likes in the beginning
                cy.get('#blog-like-container').contains('likes 0')
                cy.get('#like-button').click()
                cy.get('#blog-like-container').contains('likes 1')
            })

            it('A blog can be deleted', function() {
                cy.get('#blog-view-button').click()
                cy.get('#delete-button').click()

                cy.get('.success').contains('Blog \'aaa\' removed')
                cy.get('#blog-container').should('not.contain', 'aaa bbb')
            })

            it('Check that blogs are sorted by the amount of likes', function() {
                cy.createBlog({
                    title: 'ccc',
                    author: 'ddd',
                    url: 'ddd.com/ccc'
                })

                // Check that at first aaa is the first blog
                cy.get('.blog').then(blogs => {
                    cy.wrap(blogs[0]).contains('aaa bbb')
                })

                cy.contains('ccc ddd').contains('view').click()
                cy.get('#like-button').click()
                cy.get('#blog-hide-button').click()

                cy.get('.blog').then(blogs => {
                    cy.wrap(blogs[0]).contains('ccc ddd')
                })
            })
        })

    })

})
