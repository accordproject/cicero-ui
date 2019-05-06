/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownEditor } from '@accordproject/markdown-editor';
import List from '@accordproject/markdown-editor/dist/plugins/list';
import ClausePlugin from './plugins/clausePlugin';

/**
 * A rich text contract editor
 */
class ContractEditor extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.plugins.push(List(), ClausePlugin());
  }

  /**
   * Render this React component
   * @return {*} the react component
   */
  render() {
    return (<MarkdownEditor markdown={this.props.markdown}
      onChange={this.props.onChange}
      plugins={this.props.plugins}/>);
  }
}

/**
 * The property types for this component
 */
ContractEditor.propTypes = {
  markdown: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  plugins: PropTypes.arrayOf(PropTypes.shape({
    onEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    renderNode: PropTypes.func.isRequired,
    toMarkdown: PropTypes.func.isRequired,
    fromMarkdown: PropTypes.func.isRequired,
    fromHTML: PropTypes.func.isRequired,
    plugin: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    markdownTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    schema: PropTypes.object.isRequired,
  })),
};

export { ContractEditor };
