import request from 'supertest';
import app from './app.js';

jest.mock('@supabase/supabase-js', () => {
  const data = {
    publicUrl: 'https://example.com/photo.png',
  };
  return {
    createClient: jest.fn().mockImplementation(() => ({
      storage: {
        from: jest.fn().mockReturnValue({
          upload: jest.fn().mockResolvedValue({
            error: null,
            data: {
              ...data,
            },
          }),
          getPublicUrl: jest.fn().mockReturnValue({
            error: null,
            data: {
              ...data,
            },
          }),
        }),
      },
    })),
  };
});

describe('Given an app', () => {
  test('When the server is deployed, the app should response with a message', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({ msg: 'My server is up' });
  });
});
