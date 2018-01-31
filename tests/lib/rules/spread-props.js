/**
 * @fileoverview Use spread attributes when identifier for prop's name and value are the same.
 * @author janitor
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require("../../../lib/rules/spread-props");
var RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
});

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("spread-props", rule, {
  valid: [
    {
      code: "<div {...{ foo }}></div>"
    },
    {
      code: "<div {...{ foo, bar }}></div>"
    },
    {
      code: "<div foo='foo'></div>"
    },
    {
      code: "<div foo={()=>{}}></div>"
    },
    {
      code: "<div foo={this.foo}></div>"
    },
    {
      code: "<div foo={foo()}></div>"
    },
    {
      code: "<img {...{ foo }} />"
    },
    {
      code: "<img {...{ foo, bar }} />"
    },
    {
      code: "<img foo='foo' />"
    },
    {
      code: "<img foo={()=>{}} />"
    },
    {
      code: "<img foo={this.foo} />"
    },
    {
      code: "<img foo={foo()} />"
    }
  ],

  invalid: [
    {
      code: "<div foo={foo}></div>",
      output: "<div {...{ foo }}></div>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<div foo={foo} bar={bar}></div>",
      output: "<div {...{ bar, foo }}></div>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<div foo={foo} {...{ bar }}></div>",
      output: "<div {...{ bar, foo }}></div>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<div {...{ bar }} foo={foo}></div>",
      output: "<div {...{ bar, foo }}></div>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<div foo={foo} {...{ bar }} baz={baz}></div>",
      output: "<div {...{ bar, baz, foo }}></div>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<div foobar={foobar} foo={foo} {...{ bar }} baz={baz} barbaz={barbaz}></div>",
      output: "<div {...{ bar, barbaz, baz, foo, foobar }}></div>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<img foo={foo}/>",
      output: "<img {...{ foo }}/>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<img foo={foo} />",
      output: "<img {...{ foo }} />",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<img foo={foo} bar={bar}/>",
      output: "<img {...{ bar, foo }}/>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<img foo={foo} {...{ bar }}/>",
      output: "<img {...{ bar, foo }}/>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    },
    {
      code: "<img foobar={foobar} foo={foo} {...{ bar }} baz={baz} barbaz={barbaz}/>",
      output: "<img {...{ bar, barbaz, baz, foo, foobar }}/>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXOpeningElement"
      }]
    }
  ]
});
