const time = require('../util/test-time');
const sinon = require('sinon');
sinon.stub(time, 'setTimeout');

require('dotenv').config();
const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/users-routes');
const mongoose = require('mongoose');

const app = express();

app.use('/api/users', userRoutes);

describe('users-routes', () => {

  beforeAll((done) => {
    mongoose.connect(process.env.MONGODB_STR)
      .then(() => {
        console.log('Connection started...');
        done();
      })
      .catch(console.error);
  });

  afterAll((done) => {
    mongoose.connection
      .close()
      .then(() => {
        console.log('Connection ended...');
        done();
      })
      .catch(console.error);
  })

  it('GET /api/users - success', async () => {
    const { body } = await request(app).get('/api/users');
    expect(body).toEqual({ users: [] });
  });
});