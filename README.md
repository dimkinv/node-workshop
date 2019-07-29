# Node.js Workshop
In this workshop you need to create a webserver using node.js technologies. 
This web server should pull quotes form different sources and provide a single api endpoint with filtering avilities and should also support paging.

3 sources are available
* json source
* xml source
* images source _(image source is effectively a json source but with base64 encoded images instead of text)_

## API specification
Api endpoint should of the following specs:
```
http://[host]:[port]/api/v1/quotes?sources=<json,xml,image>&page=<number>&quotesPerPage=<number>
```

* sources should be a comma separates values and should return only the quotes from the requested sources. 
* any number of `quotesPerPage` should be valid as an input _(except negative and zero values)_

## Quotes sources
* [json](https://dimkinv.github.io/node-workshop/json-source.json) `https://dimkinv.github.io/node-workshop/json-source.json`
* [xml](https://dimkinv.github.io/node-workshop/xml-source.xml) `https://dimkinv.github.io/node-workshop/xml-source.xml`
* [image](https://dimkinv.github.io/node-workshop/image-source.json) `https://dimkinv.github.io/node-workshop/image-source.json`

## Addition workshop info
### Recommended libraries
* axios - `npm i axios` HTTP client library to pull data form sources
* xml2js - `npm i xml2js` XML parsing library to parse data form xml to json

### Parsing images to text OCR
To parse images source you will need to use Google OCR service. Essentially the requirments is to send a POST request to `https://vision.googleapis.com/v1/images:annotate?key=<KEY_THAT_WILL_BE_PROVIDED_AT_WORKSHOP>` with the following format in the body:
```
{
  'requests': [
    {
      'image': {
        'content': '<YOUR IMAGE BASE64 ECODING GOES HERE>'
      },
      'features': [
        {
          'type': 'TEXT_DETECTION'
        }
      ]
    }
  ]
}
```

You will also need to send the following headers:
* `Content-Type: application/json`

## Limitations and Assumptions
* no cache layer is needed, it is assumed that APIs are fast and there is no need for cache layer
* please try to request OCR as low as possible as it has limited request per day.

## package.json
To make matters simple you can take this base package.json file and put it in your solution folder. This will provide you with base starting packages and scripts.

After placing package.json in the folder and running `npm i` you will be able to run the following scripts
1. `npm start` - will compile and start the app
1. `npm run start:dev` - will compile and start the app and also will watch for any changes in the *.ts files and restart the server on change
1. `npm run start:debug` - will do all from bullet 2 but in addition will open debugging port. _(you will still need configure your IDE to connect for the debugger)_

```
{
  "name": "solution",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node src/app.ts",
    "start:dev": "nodemon --ext ts --exec npm run start -w src/**/*.ts",
    "start:debug": "nodemon -w src/**/*.ts --ext ts --exec \"node -r ts-node/register --inspect-brk src/app.ts\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
  },
  "devDependencies": {
    "nodemon": "^1.19.1",
    "ts-node": "^8.3.0",
    "typescript": "^3.5.3"
  }
}
```

## Recommended stack
Following is the recommended stack for the project, you can however use any libraries, but, using the below will help you to be aligned with the solution provided in case you will want to look inside _(more on the solution below)_

* expressjs
* axios
* jest (for tests)
* xml2js

_if you feel like you know nest.js, go ahead and write the solution with nest!_

# Solution
Inside the `solution` folder you are provided with fully working solution of the project. You are welcome to look inside to see and take parts of the code if you'd want. There is only one rule:

**NEVER copy/paste! Instead look, understand, and then write the code with your own hands. There is no learning in ctrl+c/ctrl+v**