---
layout: post.njk
title: Ways to improve loading speed
date: 2018-06-17
---
People hate to wait. More than that, they don’t wait, if your website doesn’t show anything nice or useful in a few seconds, they just close it. There’s plenty other websites out there that load *a little bit* faster. So before all the images are sharp, animations smooth, fonts reflecting the most recent trends, there’s one important thing to do: make sure it is real fast. Every millisecond counts.

## Why is my website slow?

Before we can speed up anything, we have to understand how websites are loaded in the browser.

1. `document` is requested (this is usually your `index.html` file)
2. any resources requested by given `document` are loaded in order of appearance, unless otherwise specified.

To better understand this process, open the dev toolbar’s network tab in Chrome (or your preferred browser), navigate to any website (github.com is a good example), and examine what happens there. The key part is the waterfall (those colourful bars on the right side). When you hover them, you can see every detail of each resource, and a [link to Google’s explanation](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#timing-explanation) of what this all means.

![screenshot of the network tab waterfall of resources in detail](/img/waterfall_detail.png)

A simplified explanation of what happens here: the first resource is **queued** at 0, which is when the first `GET` request is sent. It doesn’t spend much time in the queue or stalled, as this is the first request. It has to find the IP address to the resource (via a proxy if there is one). Once it gets to the server, the server prepares the response — this is the **waiting** stage. And finally, the response **content is downloaded**.

At this point, the browser doesn’t know what’s inside that `document`, so it can’t make any other requests until its content is downloaded.

Once the client has access to that content, it can start requesting all the resources in there (scripts, images, fonts, stylesheets etc.) The browser does this in order of appearance.

Let’s have a look at the bigger picture:

![screenshot of the network tab's waterfall of resources](/img/waterfall.png)

The bars corresponding to these resources have mostly four visible parts: white means they are queueing, grey means they are stalled, green means the response is being prepared by the server, and blue corresponds to the time it takes for the resource to be fully downloaded from the server.

The first notable thing is that the lower we go, the more time resources spend in the queue. This is because even though they were requested roughly the same time, `HTTP/1.x` limits the number of parallel requests. That’s 6 requests in most modern browsers, but usually less in mobile browsers (4 in iOS Safari, for instance).

This should no longer be an issue with the release of `HTTP/2`, but whether that’s supported depends on both the client and the server. Most browsers support `HTTP/2` [^1], but less than one third of the websites use it [^2], so queueing is something we should worry about, for now.

## How to solve queueing?

Well, we don’t really have to *solve* it, just handle it strategically.

### Decrease the number of assets requested

This will reduce the number of assets that each request has to wait for, thus the request can start earlier.

* bundle `js` files and stylesheets
* import dependencies through js before bundling, rather than loading scripts from the `html`
* use sprites for smaller assets (icons etc.), especially if there’s many of them
* consider loading small SVGs inline, instead of using them as the source of an `img`.

### Decrease asset sizes

* minify `js` and `css`
* use minified versions of vendor scripts, if you have to include them in the `html` rather than importing and bundling together with your javascript. These are the ones ending in `.min.js`.
* `gzip` HTML
* make sure images are a suitable format (simple shapes could be inline SVGs, but more complex stuff is more efficient in PNG, JPG or similar
* ask the designer for optimised images :)

### Use a CDN (content delivery network)

This means static content can be served from not one, but many, geographically distributed locations. The distance the request and response have to travel is smaller, therefore content is loaded faster.

### Time requests strategically

In React, I’m using a custom `Image` component that has a `delay` property, which, using a simple `setTimeout`, only loads after that delay has passed. Here’s the simplified version:

```jsx
export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: !props.delay};
  }

  componentDidMount() {
    this.timerID = setTimeout(() => {
      this.setState({loaded: true});
    }, this.props.delay);
  }

  render() {
    return <img src={this.state.loaded ? this.props.src : null} />;
  }
}
```

Which is used as follows:

```html
<Image src="/assets/fluffy_the_cat.png" delay={200} />
```

It works because in the `html`, this is rendered as an `img` with `src` set to `null` in the beginning (well, after the bundled script is loaded, of course), and only once those 200ms have passed, does it request the resource.

A vanilla js solution could look something like this:

```html
<img id="fluffy_the_cat" />
```

Where the source is loaded once the timeout is complete.

```js
window.setTimeout({
  const catImage = document.getElementById('fluffy_the_cat');
  catImage.src = '/assets/fluffy_the_cat.png';
}, 200);
```

You might say lazy loading images belongs here too, but that's more of a visual thing, so I will leave that for next time.

If you only do one thing to improve site performance, decrease the number of requests, that’s a real bottleneck. Asset size in 2018 is not the biggest issue.

- - -

### References

[^1]: [HTTP/2 support on caniuse.com](https://caniuse.com/#feat=http2) [^2]: [Usage Statistics of HTTP/2 for Websites, August 2018](https://w3techs.com/technologies/details/ce-http2/all/all)
