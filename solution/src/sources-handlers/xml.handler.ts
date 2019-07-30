import { HandlerInterface } from './handler.interface';
import { Quote } from '../models/quote.model';
import { parseString } from 'xml2js';
import axios from 'axios';

export class XMLHandler implements HandlerInterface {
    async getSources(): Promise<[Error | null, Quote[] | null]> {
        return new Promise(async (resolve) => {
            const xmlSourceResponse = await axios.get<string>('https://dimkinv.github.io/node-workshop/xml-source.xml');
            if (xmlSourceResponse.status !== 200) {
                resolve([new Error(`could not fetch xml source status: ${xmlSourceResponse.status}, message: ${xmlSourceResponse.statusText}`), null]);
            }

            parseString(xmlSourceResponse.data, (error, parsedData: XMLSourceResponse) => {
                if (error) {
                    resolve([error, null]);
                    return;
                }

                const quotes = parsedData.root.quote.map((q: any) => ({ content: q.content[0] }));
                resolve([null, quotes]);
            });
        });
    }
}

interface XMLSourceResponse {
    root: {
        quote: { content: string[] }[]
    }
}