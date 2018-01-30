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
    }
  ],

  invalid: [
    {
      code: "<div foo={foo}></div>",
      errors: [{
        message: `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`,
        type: "JSXAttribute"
      }]
    }
  ]
});
