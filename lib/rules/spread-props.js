/**
 * @fileoverview Use spread attributes when identifier for prop's name and value are the same.
 * @author janitor
 */
"use strict";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Use spread attributes when identifier for prop's name and value are the same.",
      category: "Best Practice",
      recommended: false
    },
    fixable: "code", // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    const ERR_MSG_NOT_SPREAD = `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`;
    // variables should be defined here

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      JSXOpeningElement(node) {
        var jsxSpreadAttribute = node.attributes.find(function(attr) {
          return attr.type === "JSXSpreadAttribute";
        });
        var badAttrs = node.attributes.filter((attr) =>
          attr.type === "JSXAttribute" &&
          attr.name.type === "JSXIdentifier" &&
          attr.value.type === "JSXExpressionContainer" &&
          attr.value.expression.type === "Identifier" &&
          attr.name.name === attr.value.expression.name
        );
        if (badAttrs.length > 0) {
          var spreadAttrNames = badAttrs.map(function(badAttr) {
            return badAttr.name.name;
          }).sort();
          context.report({
            node: node,
            message: ERR_MSG_NOT_SPREAD,
            fix: function(fixer) {
              var fixing = [];
              badAttrs.forEach(function(badAttr) {
                fixing.push(fixer.removeRange([badAttr.start - 1, badAttr.end]));
              });
              if (jsxSpreadAttribute === undefined) {
                fixing.push(fixer.insertTextAfter(node.attributes[node.attributes.length - 1], " {...{ " + spreadAttrNames.join(", ") + " }}"));
              } else {
                fixing.push(fixer.insertTextAfter(jsxSpreadAttribute.argument.properties[0], ", " + spreadAttrNames.join(", ")));
              }
              return fixing;
            }
          });
        }
      }
    };
  }
};
