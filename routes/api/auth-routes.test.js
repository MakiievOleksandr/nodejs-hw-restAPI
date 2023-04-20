const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const { DB_HOST_TEST, PORT } = process.env;

describe('test /api/users/login route', () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test('test login with correct data', async () => {
    const loginData = {
      email: 'test@mail.com',
      password: '123qwe',
    };

    const res = await request(app).post('/api/users/login').send(loginData);
    const {
      token,
      user: { email, subscription },
    } = res.body;
    expect(res.statusCode).toBe(200);
    expect(token != null).toBe(!null);
    expect(true).toBe(typeof email === 'string');
    expect(true).toBe(typeof subscription === 'string');
  });
});
