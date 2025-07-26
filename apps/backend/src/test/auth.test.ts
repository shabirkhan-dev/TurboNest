import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { app } from '@/app';

describe('Auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 for missing credentials', async () => {
      const response = await request(app).post('/api/auth/login').send({});

      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'invalid-email',
        password: 'password123',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/register', () => {
    it('should return 400 for missing required fields', async () => {
      const response = await request(app).post('/api/auth/register').send({});

      expect(response.status).toBe(400);
    });

    it('should return 400 for weak password', async () => {
      const response = await request(app).post('/api/auth/register').send({
        email: 'test@example.com',
        password: '123',
        name: 'Test User',
      });

      expect(response.status).toBe(400);
    });
  });
});
