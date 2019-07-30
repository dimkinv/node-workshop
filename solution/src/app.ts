import express from 'express';
import { quotesRouter } from './quotes/quotes.router';
const app = express()
const port = 3000

app.use('/api/v1/quotes', quotesRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));