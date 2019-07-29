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
* json `https://dimkinv.github.io/node-workshop/json-source.json`
* xml `https://dimkinv.github.io/node-workshop/xml-source.xml`
* image `https://dimkinv.github.io/node-workshop/image-source.json`

## Addition workshop info
### Recommended libraries
* axios - `npm i axios` HTTP client library to pull data form sources
* xml2js - `npm i xml2js` XML parsing library to parse data form xml to json

### Parsing images to text OCR
To parse images source you will need to use Google OCR service. Essentially the requirments is to send a POST request to `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAGmuBXtzlggW-k8tFx57GdaYhE4KIfqJI` with the following format in the body:
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