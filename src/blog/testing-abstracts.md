---
layout: post.njk
title:  "Unit testing abstract classes in React"
date:   2018-11-06
---

In unit testing with Jest and Enzyme, a shallow render is a good way to test whether a component works like it should. But with abstract classes[^1] that don’t have a `render()` method (like one I’m trying to test right now), this fails. So how can we test abstracts?

## A simple abstract class

Our abstract may look something like this calculator. For the sake of simplicity, it can only do one operation (but that, it can do very well!)

```jsx
abstract class AbstractCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: 0};
    this.addOne = this.addOne.bind(this);
  }

  addOne() {
    const result = this.state.result + num;
    this.setState({result});
  }
}
```

This class could be used as follows:

```jsx
class Calculator extends AbstractCalculator {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <strong>{this.state.result}</strong>
        <button onClick={this.props.addOne}> +1 </button>
      </div>
    );
  }
}
```

## The fun part: testing!

Normally, a test for a React class using Jest and Enzyme would look something like this:

```jsx
describe('Calculator', () => {
  const props = {/* add some props here */};
  const calc = shallow(<Calculator {...props} />);

  it('works', () => {
    expect(calc).toBeTruthy();
  });
});
```

**This will not work for abstracts.**

If we try to use any of Enzyme’s renderers, e.g. `shallow(<AbstractComponent {...props} />)`, we will get an error like this: `TypeError: this._instance.render is not a function`. Indeed, it is not. But we should still be able to test the rest of `AbstractComponent`’s methods.

We could test the class `Calculator` that implements `AbstractCalculator`, but that would not allow for isolated testing of our abstract.

So let’s approach this as testing a class, rather than a React component. Instead of shallow rendering, we just create a new instance and test its methods on this instance.[^2] As for the props, they are, in essence, the parameters of the constructor function for the class, so we will just pass them as params when creating the test instance.

```jsx
import AbstractCalculator from 'path/to/AbstractCalculator';

describe('AbstractCalculator', () => {
  const props = {/* some test props */};
  const calculator = new AbstractCalculator(props);

  it('works', () => {
    expect(calculator).toBeTruthy();  
  });
});
```

Voilà! It works.

As for state changes, we will have to mock the abstract’s `setState` method, otherwise we get `Warning: Can’t call setState on a component that is not yet mounted.`

```jsx
it('adds correctly', () => {
  calculator.setState = jest.fn();
  calculator.state.result = 7;

  calculator.addOne();

  expect(calculator.setState).toBeCalledWith({result: 8});  
});
```

Thatʼs all — to be honest, the solution was simpler and more straightforward than I had imagined. In essence, an abstract class is just a class that can be reused easily, so it behaves just like a class in TypeScript. In our oversimplified example, that is. :)

---

#### References

[^1]: See the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/classes.html) for more explanation of abstract classes (youʼll have to scroll down a little.)

[^2]: Note that creating an instance with `new` from an abstract class should not be done anywhere else, as abstract classes are there for other classes to implement.
