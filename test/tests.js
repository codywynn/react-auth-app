  
const test = require('tape')
const request = require('supertest')
const express = require('express')

const User = require('../models/User')
const app = require('../server')

// Wait to trigger index.js indicating that server has started
before(done => {
    app.on('APP_STARTED', () => {
      done()
    })
})

describe('API Tests', () => {
    it('Logs in an existing user', done => {
        test('/api/users/login', assert => {
            
            const testUser = {
                name: "test user",
                email: "test@test.com",
                password: "test123",
                password2: "test123"
            }

            User.create(testUser, function(err, obj) {
                if (err) throw err; 
                console.log("registered user")
            })

            request(app)
                .post('/api/users/login')
                .send(testUser)
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))

                    // Clean up
                    User.deleteOne(testUser, function(err, obj) {
                        if (err) throw err;
                        assert.pass('Logged in user successfully, test passed!')
                        assert.end()
                        console.log("deleted user")
                    })
                })
        })

        test('/api/users/register', assert => {
            
            const testUser = {
                name: "test user",
                email: "test123@test.com",
                password: "test123",
                password2: "test123"
            }

            request(app)
                .post('/api/users/register')
                .send(testUser)
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))

                    // Clean up
                    User.deleteOne({email: "test123@test.com"}, function(err, obj) {
                        if (err) throw err; 
                        assert.pass('Registered a new user successfully, test passed!')
                        assert.end()
                        done()
                    })            
                })   
        })
    })
})