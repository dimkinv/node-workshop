import { HandlerInterface } from './handler.interface';
import { Quote } from '../models/quote.model';
import axios from 'axios';

export class JSONHandler implements HandlerInterface {
    async getSources(): Promise<[Error | null, Quote[] | null]> {
        const jsonSourceResponse = await axios.get<Quote[]>('https://dimkinv.github.io/node-workshop/json-source.json');
        if (jsonSourceResponse.status !== 200) {
            return [new Error(`could not fetch json source status: ${jsonSourceResponse.status}, message: ${jsonSourceResponse.statusText}`), null];
        }

        return [null, jsonSourceResponse.data];
    }

}