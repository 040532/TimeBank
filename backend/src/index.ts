import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import offerRoutes from './routes/offers';
import requestRoutes from './routes/requests';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/requests', requestRoutes);

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`TimeBank backend running on http://localhost:${port}`));
