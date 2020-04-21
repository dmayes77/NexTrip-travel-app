const request = require('supertest');
const express = require('express');

const app = express();

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    request(app)
      .get('/travel')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
