---
layout: post.njk
title:  "Building an API proxy with Serverless — Part 2"
date:   2019-01-10
---

In the second part, I will turn a simple Lamda function into an API endpoint. If you havenʼt, now is a good time to [read Part 1](/serverless) first :)

## From function to API

First, let's prepare our serverless config so that it can handle HTTP requests, and will only allow those from my website. 

```yaml
functions:
  getWeather:
    ...
    events:
      - http:
          path: weather
          method: get
          cors:
            origins:
              - 'https://myweathersite.example.com'
```

## A side note about AWS credentials

I use AWS for work, so I already had some credentials configured — but I canʼt just deploy my lambda to the company AWS account, can I? So letʼs set up a new profile. This we can do by running  
`aws configure --profile notMyCompanyProfile`, and entering security credentials as usual. Then, we can set a default `profile` for serverless to use, in `serverless.yml`:

```yaml
provider:
  name: aws
  runtime: nodejs8.10
  stage: prod
  profile: notMyCompanyProfile
```

## Deploying the lambda

Now we can run `sls deploy --aws-profile notMyCompanyProfile`. Yay! If we run `sls invoke -f getWeather` (notice the absence of `local`), it will actually run on AWS this time. We can even `curl` the url `sls deploy` created for us. But when I do that now, I get `403 Forbidden`: I have to configure my DarkSky API key on AWS. Thatʼs simply done on the AWS Consoleʼs Lambda section, under my functionʼs *Environment variables*.

If I do a `curl` now, it will get the weather for me.

## Making the server a bit more flexible

Now a weather forecast is more useful if it can tell the weather for any location in the world, not just one it is hard coded to. In practice, this will mean for now that the client can pass coordinates for which it wants to get a weather forecast. Something like this:
```js
module.exports.getWeather = (event, context, callback) => {
  const { lat, lon, units } = event.queryStringParameters;
  const headers = { 'Access-Control-Allow-Origin': '*' };
  const baseUrl = 'https://api.darksky.net/forecast/';
  const queryParams = !!units ? `?units=${units}` : '';

  request.get(
    { url: `${apiUrl}${process.env.DARKSKY_API_KEY}/${lat},${lon}${queryParams}` },
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

Thatʼs it! Now, by sending a `GET` request to `https://my-api.url/weather/?lat=10&lon=20`, we have weather data for these coordinates. 

---

#### References
[^1]: Read more about configuring AWS profiles for Serverless [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/).
