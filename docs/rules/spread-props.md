# Use spread attributes when identifier for prop's name and value are the same. (spread-props)

Use ES6's spread attributes when assigning props with identifier for the prop's name and the value are the same.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

<div foo={foo}></div>

```

Examples of **correct** code for this rule:

```js

<div {...{ foo }}></div>
<div foo="foo"></div>
<div foo={()=>{}}></div>

```

### Options

No other options.

## When Not To Use It

When you don't like it.

## Further Reading

https://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html
