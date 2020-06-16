---
layout: post.njk
title:  "Building an API proxy with Serverless — Part 1"
date:   2018-12-16
---

I’m back to building a weather app, this time not in Flask, but React. I wanted to skip the server part, but DarkSky is strict about CORS[^1], so I had to build a proxy. Not really a front-end topic, but good to know if you work daily with backend engineers (which I do).

## Enter serverless

Constantly running a server just to proxy a single API call would be an overkill — [Serverless](https://serverless.com/) on [AWS Lambda](https://aws.amazon.com/lambda/) is just the perfect way to solve this[^2]. Of course, serverless is only as serverless as the cloud is not physical. It still runs on a server, but it’s someone else’s (in this case, AWS).

First, we’ll have to install serverless:
```shell
yarn global add serverless
```

Then create our service:
```shell
sls create --template aws-nodejs --path weather-service
cd weather-service
```

By the way, `sls` is a shorthand for `serverless`. Wherever you see `serverless` in the docs, you can use `sls` instead.
The [quick start guide](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) suggests to deploy now, but we can skip this until we are ready, and test our proxy locally. Let’s see what we have so far:
```shell
sls invoke local -f hello
```

If we’ve done everything right (not much to break so far), the output should be:
```json
{
  "statusCode": 200,
  "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":\"\"}"
}
```

Later, we can test the deployed function by calling `sls invoke -f hello` (without `local`), but that will count against our AWS Lambda usage.

## Let’s turn this into a DarkSky API gateway

First, I’d like to call my function something more meaningful, maybe `getWeather`. For this, let’s change the function name in `serverless.yml`:
```yaml
functions:
  getWeather:
    handler: handler.getWeather
```

And in `handler.js`, `module.exports.hello` should become:
```js
module.exports.getWeather = () => { … }
```

Now if we try `sls local invoke -f hello`, it will fail, because there is no `hello` function. However, `sls local invoke -f getWeather` will work like charm!

## Ok, on to the weather!

I will use the [request](https://github.com/request/request#readme) library for handling requests, for no particular reason, other than it’s simple and works well with serverless. There’s no magic here, just calling [Dark Sky API](https://darksky.net/dev/docs) with my secret key and some hard-coded coordinates (for now). Getting the API key from `process.env` is also a temporary solution optimised for local invokes, this may change in part 2.
```js
'use strict';
const request = require('request');

module.exports.getWeather = (event, context, callback) => {
  const headers = {'Access-Control-Allow-Origin': '*'};

  request.get(
    { url: `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/44,32` },
    (err, res, body) => {
      if (err) {
        const response = { statusCode: 404, headers, body: err };
        callback(null, response);
      } else {
        const response = { statusCode: res.statusCode, headers, body };
        callback(null, response);
      }
    }
  );
};
```

Now, `sls invoke` will return the current weather for those coordinates. You can check out the [full source on github](https://github.com/c0derabbit/weather/tree/master/server).

In my next post, I will show how to deploy the function to AWS Lambda, how to handle requests, and how to create API endpoints.
Until then, and [happy holidays](https://adventofcode.com/)!

---

#### References
[^1]: [Dark Sky API:  Frequently Asked Questions](https://darksky.net/dev/docs/faq#cross-origin): “If you were to make API calls from client-facing code, anyone could extract and use your API key, which would result in a bill that you'd have to pay. We disable CORS to help keep your API secret key a secret.” Fair enough.

[^2]: Plus, AWS Free Tier includes 1 million monthly invokes.
