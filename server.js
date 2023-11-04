import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static('./dist'));

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}: http://localhost:${PORT}`);
});
