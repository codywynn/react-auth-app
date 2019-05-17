  
const test = require('tape')
const request = require('supertest')

const User = require('../models/User')
const app = require('../server')

// Wait to trigger index.js indicating that server has started
before(done => {
    app.on('APP_STARTED', () => {
        // Initialize database
        User.deleteOne({email: "test@test.com"}, function(err, obj) {
            if (err) throw err; 
            done()
        })     
    })
})

describe('API Tests', () => {
    it('Logs in an existing user', done => {
        test('/api/users/register', assert => {
            
            const testUser = {
                name: "test user",
                email: "test@test.com",
                password: "test123",
                password2: "test123"
            }

            request(app)
                .post('/api/users/register')
                .send(testUser)
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Registered a new user successfully, test passed!')
                    assert.end()
                })   
        })

        test('/api/users/login', assert => {
            
            const testUser = {
                email: "test@test.com",
                password: "test123"
            }

            request(app)
                .post('/api/users/login')
                .send(testUser)
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Logged in user successfully, test passed!')
                    assert.end()
                    done()
                })
        })
    })
})

after(done => {
    // Clean up
    User.deleteOne({email: "test@test.com"}, function(err, obj) {
        if (err) throw err; 
        done()
    })     
})