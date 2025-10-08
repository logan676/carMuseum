import request from 'supertest';
import app from './app';

describe('AutoVerse API', () => {
  it('responds to health checks', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('lists news articles with categories', async () => {
    const response = await request(app).get('/api/news');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data[0]).toHaveProperty('title');
    expect(response.body.availableCategories).toContain('Industry');
  });

  it('filters news articles by category', async () => {
    const response = await request(app).get('/api/news').query({ category: 'Reviews' });
    expect(response.status).toBe(200);
    expect(response.body.data.every((article: { category: string }) => article.category === 'Reviews')).toBe(true);
  });

  it('provides featured models and encyclopedia collection', async () => {
    const response = await request(app).get('/api/models');
    expect(response.status).toBe(200);
    expect(response.body.featured.length).toBeGreaterThan(0);
    expect(response.body.encyclopedia.length).toBeGreaterThan(0);
  });

  it('returns a summary dataset snapshot', async () => {
    const response = await request(app).get('/api/summary');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('newsArticles');
    expect(response.body).toHaveProperty('dealerships');
  });
});
