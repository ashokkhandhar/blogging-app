import express from 'express';
import indexRoute from './routes/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database connected"))
.catch((error) => console.error(`DB Connection Error: ${error}`));

app.use(cors({
    // origin: 'http://localhost:3001',
    origin: 'https://blogging-web-app.vercel.app',
    credentials: true
}));

app.use('/api', indexRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => {
    console.log(`Server running at port: 3000`);
});

export default app;