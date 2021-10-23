const app = require('../index');
const request = require('supertest');

afterAll(done => {
  done();
})

describe('Testing home route', function () {

    test('responds to /sign-in', async () => {
      const res = await request(app).get('/users/sign-in')
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    test('responds to /sign-up', async () => {
      const res = await request(app).get('/users/sign-up'); 
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

    test('responds to /sign-Up', async () => {
      const res = await request(app).get('/users/signUp'); 
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(404);
    });

  });