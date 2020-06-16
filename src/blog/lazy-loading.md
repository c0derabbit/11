---
layout: post.njk
title: Lazy loading images
date: 2018-08-14
---
In my post about loading speed, I promised to write about how I lazy load images. It is a useful technique for when you have large photos above the fold, that would take noticeable time to load. The solution is quite simple: we can make use of CSS’s `blur` filter, with the help of `opacity`. The basic sequence is:

1. load page with a tiny, blurred version of the image, and on top of it, a transparent, empty placeholder for the full size image
2. create an `Image` element with the full size `src` using JavaScript
3. when the full size asset is loaded, set it as the `src` of the full size placeholder
4. set the opacity of the full size image to 1.

This will look as if the same image becomes sharper, like this:

![photo of a goat lazy-loaded, with blur-up effect](/img/goat.gif)

Using a preload image means that in this specific case, my initial image size is just 7kB instead of around 500kB. The downside is that you have to know the exact width and height of the image you want to load.

## Let’s get to the code!

I will use React for this example. It’s very much simplified, I’m not passing classes, alt, support for any image extension etc., but you should do that in production.

Our element will accept a `src` and a `preloadSrc` for now. Please note that it should have a fixed width and height to work.

```jsx
<LazyImage src="goat.jpg" preloadSrc="goat_tiny.jpg" />
```

This is the component itself:

```jsx
export class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
    this.fullSizeImage = null;
  }

  componentDidMount() {
    const loaderImage = new Image();
    loaderImage.src = this.props.src;
    loaderImage.onload = () => {
      this.fullSizeImage.src = src;
      this.fullSizeImage.classList.add('loaded');
      this.setState({loaded: true});
    }
  }

  render() {
    return (
      <div className="lazy-image" style={this.props.style}>
        <img className="image-full" ref={id => this.fullSizeImage = id} />
        <img className="image-preload" src={this.props.preloadSrc} />
      </div>
    );
  }
}
```

Finally, the CSS needed to make it work:

```scss
.lazy-image {
  position: relative;
  overflow: hidden;

  .image-full,
  .image-preload {
    position: absolute;
    top: 0;
    left: 0;
  }

  .image-preload {
    filter: blur(4px);
  }

  .image-full {
    z-index: 2;
    opacity: 0;
    transiton: opacity .6s ease;

    &.loaded {
      opacity: 1;
    }
  }
}
```

That’s it, you’re as good at image loading as Medium now.
