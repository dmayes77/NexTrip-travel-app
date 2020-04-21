import { postData } from '../src/client/js/app';

const url = 'http://localhost:8080';

let data = {
  city: 'Chattanooga',
};

describe('post data via url', () => {
  test('is posted', () => {
    expect(postData(`${url}/travel`, data)).toBeTruthy();
  });
});
