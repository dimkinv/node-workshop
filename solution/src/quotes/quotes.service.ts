import { handlersStrategies } from "../sources-handlers/handlers.strategy";
import { Quote } from "../models/quote.model";

export class QuotesService {
    async getQuotesBySource(sources: string[]): Promise<[Error | null, Quote[] | null]> {
        const handlerRequests: Promise<[Error | null, Quote[] | null]>[] = [];

        sources.forEach(source => {
            if (!handlersStrategies.has(source)) {
                return [new Error(`incorrect source found ${source}`), null];
            }

            handlerRequests.push(handlersStrategies.get(source)!.getSources());
        });

        const responses = await Promise.all<[Error | null, Quote[] | null]>(handlerRequests);
        const allQuotes = responses.reduce((acc: Quote[], [err, quotes]) => {
            if (!quotes) {
                return acc;
            }

            return [...acc, ...quotes];
        }, []);

        return [null, allQuotes];
    }
}