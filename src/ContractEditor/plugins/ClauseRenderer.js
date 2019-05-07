import React from 'react';

import ClauseComponent from '../components/ClauseComponent.js';
import HeaderComponent from '../components/HeaderComponent.js';
import ParagraphComponent from '../components/ParagraphComponent.js';
import ErrorMark from '../marks/ErrorMark.js';

/**
* Handles rendering a clause.
*/
export default function ClauseRenderer() {
  return {
    renderMark(props, editor, next) {
      switch (props.mark.type) {
        case 'error':
          return <ErrorMark {...props} />;
        default:
          console.log(`No mark renderer for ${props.mark.type}`);
          return next();
      }
    },
    renderNode(props, editor, next) {
      const { node, children } = props;

      switch (node.type) {
        case 'clause': return (
          <ClauseComponent {...props}>{children}</ClauseComponent>
        );
        case 'heading': return (
          <HeaderComponent {...props}>{children}</HeaderComponent>
        );
        case 'paragraph': return (
          <ParagraphComponent {...props}>{children}</ParagraphComponent>
        );
        default:
          console.log(`No renderer for ${node.type}`);
          return next();
      }
    },
  };
}
