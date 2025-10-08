import express from 'express';
import cors from 'cors';
import {
  dataset,
  newsArticles,
  newsCategories,
  featuredModels,
  quickLinks,
  timelineEntries,
  restorationProjects,
  brands,
  encyclopediaModels,
  garageVehicles,
  dealerships,
} from './data';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/news', (req, res) => {
  const { category } = req.query;
  const filtered =
    typeof category === 'string' && category !== 'All'
      ? newsArticles.filter((article) => article.category === category)
      : newsArticles;

  res.json({
    data: filtered,
    availableCategories: newsCategories,
  });
});

app.get('/api/models', (_req, res) => {
  res.json({ featured: featuredModels, encyclopedia: encyclopediaModels });
});

app.get('/api/brands', (_req, res) => {
  res.json({ data: brands });
});

app.get('/api/projects', (_req, res) => {
  res.json({ data: restorationProjects, timeline: timelineEntries });
});

app.get('/api/garage', (_req, res) => {
  res.json({ vehicles: garageVehicles });
});

app.get('/api/dealerships', (_req, res) => {
  res.json({ data: dealerships });
});

app.get('/api/summary', (_req, res) => {
  res.json(dataset);
});

export default app;
