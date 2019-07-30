import { Request, Response } from "express";
import { QuotesService } from './quotes.service';

class QuotesController {
    private quotesService = new QuotesService();

    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    async getAll(request: Request, response: Response) {
        const page = +request.query.page;
        const quotesPerPage = +request.query.quotesPerPage;
        
        if(!this.isInputValid(request.query.sources, page, quotesPerPage)){
            response.status(400).send('one of the query parameters was not provided or was provided incorrectly');
            return;
        }

        const sources = request.query.sources.split(',');


        const [err, quotes] = await this.quotesService.getQuotesBySource(sources, page, quotesPerPage);
        if (err) {
            response.status(500).send(err.message);
            return;

        }
        response.json(quotes);
    }

    private isInputValid(sources: string[], page: number, quotesPerPage: number) {
        
        if (!sources || isNaN(page) || isNaN(quotesPerPage)){
            return false;
        }

        return true;
    }
}

export const quotesController = new QuotesController();