/**
 * @fileoverview Use spread attributes when identifier for prop's name and value are the same.
 * @author janitor
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Use spread attributes when identifier for prop's name and value are the same.",
            category: "Best Practice",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
      const ERR_MSG_NOT_SPREAD = `
Use spread attributes when identifier for prop's name and value are the same.
Instead of <div foo={foo}></div>, do <div {...{ foo }}></div>
`


        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
          JSXOpeningElement(node) {
          		node.attributes.forEach((e) => {
          			if (e.type == "JSXAttribute"
                          && e.name.type == "JSXIdentifier"
                          && e.value.type == "JSXExpressionContainer"
                         	&& e.value.expression.type == "Identifier") {
                      	if (e.name.name == e.value.expression.name) {
                             context.report(e, ERR_MSG_NOT_SPREAD);
                          }
                      }
                  });
              }
        };
    }
};
