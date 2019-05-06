import ClauseHelpers from 'utilities/clauseHelpers';

import { templateMethods } from 'utilities/api';
import BadParse from '../commands/BadParse';
import GoodParse from '../commands/GoodParse';

/**
* Handles parsing a clause.
*/
export default function ClauseParser() {
  return {
    onChange(editor, next) {
      const node = editor.value.blocks.find(b => b.type === 'clause');
      if (!node) {
        return next();
      }

      if (node.text === this.pendingChange) {
        return next();
      }
      this.pendingChange = node.text;

      const templateUri = node.data.get('templateUri');
      let template = editor.props.templates[templateUri];

      if (template === 'loading') template = null;

      if (!template) {
        editor.props.actions.loadTemplate(templateUri);
        return next();
      }

      if (!template.ciceroTemplate) {
        // parse on the server
        templateMethods.parseTemplateText(node.text, templateUri)
          .then((parseResult) => {
            editor.command(GoodParse, node, parseResult);
          })
          .catch((err) => {
            err.response.then((response) => {
              editor.command(BadParse, node, response.error);
            });
          });
      } else {
        try {
          // parse client-side
          const parseResult = ClauseHelpers.parseClause(template, node.text, editor.props.contract);
          editor.command(GoodParse, node, parseResult);
        } catch (error) {
          editor.command(BadParse, node, error);
        }
      }
      return next();
    },
  };
}
