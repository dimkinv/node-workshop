import { Quote } from '../models/quote.model';

export interface HandlerInterface {
    getSources(): Promise<[Error | null, Quote[] | null]>;
}