import { Router } from 'express';
import { quotesController } from './quotes.controller';

export const quotesRouter = Router();

quotesRouter.get('/', quotesController.getAll);