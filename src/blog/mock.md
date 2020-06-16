---
layout: post.njk
title: Mocking React components with props
date: 2019-04-08
---

In many cases, particularly in [Gatsby](https://www.gatsbyjs.org/), pages are wrapped in a `<Layout>` component. Today, Iʼll describe a way to test these pages isolated from their wrapper.

A `<Layout>` component might look something like this simplified specimen:
```jsx
export default function Layout({ children }) {
  return (
    <div>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );  
}
```

As an example, letʼs write a simple 404 page.

```js
export default function NotFound() {
  return (
    <Layout>
      Sorry, this page does not exist. :(
    </Layout>
  );  
}
```

A test for our 404 page might look like the following, using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/kentcdodds/react-testing-library):

```js
describe('Not Found page', () => {
  it('shows a friendly message', () => {
    const { container } = render(<NotFound />);

    expect(container).toHaveTextContent('Sorry, this page does not exist');
  });
});
```

Letʼs imagine `Layout` does a lot more than in our example. If we run the 404 Not Found test right now, it will fail miserably, because thereʼs a lot more going on in `Layout` than just putting things in a `div`. But thatʼs all we need from it in our test, so letʼs do that!

## Mocking the wrapper component
Not much to change in our original test, we just have to mock `Layout` so it only returns a `div` with the `children` passed inside. This can be easily achieved like so:
```js
jest.mock('./path/to/layout', () => props => <div {...props} />);
```

Thatʼs it! This will “render” in our test as:
```jsx
<div>
  Sorry, this page does not exist. :(
</div>
```

As a result, our test will pass happily, because we are only testing the `NotFound` page itself, not caring about what happens in `Layout`.
