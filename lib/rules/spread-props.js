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
        var badAttrs = [];
        node.attributes.forEach(function(e) {
          if (e.type === "JSXAttribute" && e.name.type === "JSXIdentifier" && e.value.type === "JSXExpressionContainer" && e.value.expression.type === "Identifier") {
            if (e.name.name === e.value.expression.name) {
              badAttrs.push(e);
              // context.report({
              //   node: e,
              //   message: ERR_MSG_NOT_SPREAD,
              //   fix: function(fixer) {
              //     var fixing = [];
              //     if (jsxSpreadAttribute !== undefined) {
              //       fixing.push(fixer.insertTextAfter(jsxSpreadAttribute.argument.properties[0], ", " + e.name.name));
              //     } else {
              //       fixing.push(fixer.insertTextAfter(e, "{...{ " + e.name.name + " }}"));
              //     }
              //     // var start = e.start;
              //     // var end = e.end;
              //     // if (attributesCount > 1) {
              //     //   if (previousNode === null) {
              //     //     // <div foo={foo} {...{bar}}></div>
              //     //     // <div foo={foo} bar={bar}></div>
              //     //     end = end + 1;
              //     //   } else {
              //     //     // <div {...{bar}} foo={bar}></div>
              //     //     start = start - 1;
              //     //   }
              //     // }
              //     // fixing.push(fixer.removeRange([start, end]));
              //     fixing.push(fixer.remove(e));
              //     return fixing;
              //   }
              // });
            }
          }
          // previousNode = e;
        });
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
