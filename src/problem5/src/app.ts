import express from 'express';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/phoneRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api', resourceRoutes);

export default app;
