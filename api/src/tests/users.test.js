import http from 'http';
import express from 'express';
import { usersRouter } from '../routes/users.js';

function startServer() {
  return new Promise((resolve) => {
    const app = express();
    app.use('/api/users', usersRouter);
    const server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

async function getJson(url) {
  const res = await fetch(url);
  const body = await res.json();
  return { status: res.status, body };
}

describe('Users API', () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    ({ server, baseUrl } = await startServer());
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('GET /api/users returns all users', async () => {
    const { status, body } = await getJson(`${baseUrl}/api/users`);

    expect(status).toBe(200);
    expect(body.count).toBe(body.users.length);
    expect(body.users.length).toBeGreaterThan(0);
  });

  test('each user exposes referential fields', async () => {
    const { body } = await getJson(`${baseUrl}/api/users`);

    for (const user of body.users) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('fullName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('status');
      expect(user).toHaveProperty('createdAt');
    }
  });

  test('GET /api/users?q= filters the list (case-insensitive)', async () => {
    const { body } = await getJson(`${baseUrl}/api/users?q=JEAN`);

    expect(body.users.length).toBeGreaterThan(0);
    expect(
      body.users.every((u) =>
        `${u.firstName} ${u.lastName} ${u.email} ${u.role}`
          .toLowerCase()
          .includes('jean')
      )
    ).toBe(true);
  });

  test('GET /api/users?q= matches by email', async () => {
    const { body } = await getJson(`${baseUrl}/api/users?q=marie.martin`);

    expect(body.count).toBe(1);
    expect(body.users[0].email).toContain('marie.martin');
  });

  test('GET /api/users?q= with no match returns an empty list', async () => {
    const { status, body } = await getJson(
      `${baseUrl}/api/users?q=zzzz-no-such-user`
    );

    expect(status).toBe(200);
    expect(body.count).toBe(0);
    expect(body.users).toEqual([]);
  });
});