import { HandlerInterface } from './handler.interface';
import { Quote } from '../models/quote.model';
import axios from 'axios';

export class ImageHandler implements HandlerInterface {
    async getSources(): Promise<[Error | null, Quote[] | null]> {
        return new Promise(async (resolve) => {
            const imageSourceResponse = await axios.get<Quote[]>('https://dimkinv.github.io/node-workshop/image-source.json');

            if (imageSourceResponse.status !== 200) {
                resolve([new Error(`could not fetch xml source status: ${imageSourceResponse.status}, message: ${imageSourceResponse.statusText}`), null]);
            }

            const ocrRequests = imageSourceResponse.data.map(quote => this.getOCRRequestInstance(quote.content));
            const ocrRequestsWrapper = this.getOCRRequestWrapper(ocrRequests);

            const ocrResponse = await axios.post<OCRREsponse>('https://vision.googleapis.com/v1/images:annotate?key=<PUT KEY HERE>', ocrRequestsWrapper);
            const quotes = ocrResponse.data.responses.map(response => ({ content: response.textAnnotations[0].description }));
            resolve([null, quotes]);
        });

    }

    private getOCRRequestInstance(base64String: string): OCRRequest {
        return {
            image: {
                content: base64String
            },
            features: [
                {
                    type: 'TEXT_DETECTION'
                }
            ]
        }
    }

    private getOCRRequestWrapper(ocrRequests: OCRRequest[]): OCRREsponseWrapper {
        return {
            requests: ocrRequests
        }
    }
}

interface OCRREsponseWrapper {
    requests: OCRRequest[]
}

interface OCRRequest {
    image: {
        content: string
    },
    features: [
        {
            type: string
        }
    ]
}

interface OCRREsponse {
    responses: {
        textAnnotations: {
            locale: string;
            description: string;
        }[]
    }[]
}