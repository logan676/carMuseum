import app from './app';

const PORT = Number(process.env.PORT ?? 4000);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`API ready on port ${PORT}`);
  });
}

export default app;
