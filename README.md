# assignment-2---final-project-repository-team1
assignment-2---final-project-repository-team1 created by GitHub Classroom

### Testing with Jest, Express, and Babel ###
* install  [Jest](https://jestjs.io)
* install [supertest](https://www.npmjs.com/package/supertest)
* install [babel](https://babeljs.io)

### Testing Routes and Endpoints

```javascript
describe('Testing home route', function () {

  test('responds to /sign-in', async () => {
    const res = await request(app).get('/sign-in');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /sign-up', async () => {
    const res = await request(app).get('/sign-up'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /create', async () => {
    const res = await request(app).get('/create'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

});
```

### Testing User Input
```javascript
//TODO

```
