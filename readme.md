# Brest Validator

## About

Validator wrapper around [REST API library](https://www.npmjs.org/package/brest).

## How do I use it?

### 1. Install from package manager

```bash
$ npm install brest-validator --save
```

### 2 Setup
#### 2.1 Application file

In your application file, once you've created Brest instance

```javascript
	// Require brest library
	const Brest = require('brest');
	const BrestValidator = require('brest-validator');
	//...
		
	const brest = new Brest(require('./settings'), [BrestValidator]);
	brest.on('ready', function(){
		brest.use([]); //Required in Brest 0.4.7^
	});
```

#### 2.2 API script file structure

API scripts are expected to export object files with the following structure:

```javascript
const resource = {
    version: 1,
    description: "Resource description", //Description for the Docker
    endpoints: [
        //Here come the endpoint objects
    ]
}
```

Add validator (or validate) method to the API description. Use express-validator notation.

```javascript
const endpoint = {
    /**
     * Validation method. It is supposed to use express-validator (assertion part of it), but it can be
     * also used as a custom validator. Any data returned by this method will be considered as an error message
     */    
    validator: function(req){
        req.assert('fooId').notEmpty().isNumeric();
    }
//...

}
```

##Changes

### 0.4.0

Updated to work with Brest 0.4.x branch

## MIT License

Copyright © 2013 Maxim Tovstashev <max.kitsch@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
