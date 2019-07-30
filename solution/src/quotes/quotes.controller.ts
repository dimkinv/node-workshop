import { Request, Response } from "express";
import { QuotesService } from './quotes.service';
import { JSONHandler } from "../sources-handlers/json.handler";
import { XMLHandler } from "../sources-handlers/xml.handler";
import { ImageHandler } from "../sources-handlers/image.handler";

class QuotesController {
    private quotesService = new QuotesService();

    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    async getAll(request: Request, response: Response) {
        if(!request.query.sources){
            response.status(400).send('no "sources" query parameter was provided');
            return;
        }

        const sources = request.query.sources.split(',');

        const [err, quotes] = await this.quotesService.getQuotesBySource(sources);
        if(err){
            response.status(500).send(err.message);
            return;

        }
        response.json(quotes);
    }
}

export const quotesController = new QuotesController();