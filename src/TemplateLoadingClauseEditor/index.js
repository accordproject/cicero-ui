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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Message } from 'semantic-ui-react';
import { Template } from '@accordproject/cicero-core';
import ClauseEditor from '../ClauseEditor';
/**
 * TemplateLoader component - used to wrap a ClauseEditor component,
 * taking care of loading a template
 * @param {*} props the props for the component. See the declared PropTypes
 * for details.
 */
function TemplateLoadingClauseEditor(props) {
  /**
   * A flag that indicates we are currenty loading the template for this clause
   */
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  /**
   * The loaded template associated with this Clause. This defaults
   * to the template that was passed in props. If no template is specified
   * in props then the template is loaded from the props.templateUrl.
   */
  const [template, setTemplate] = useState(props.template);

  /**
   * The error loading the template
   */
  const [error, setError] = useState(null);

  /**
   * Loads the template set in props.templateUrl if
   * props.template is not set
   */
  useEffect(() => {
    if (!loadingTemplate && !template && !error) {
      setLoadingTemplate(true);
      Template.fromUrl(props.templateUrl)
        .then((template) => {
          setTemplate(template);
          setLoadingTemplate(false);
          console.log('setTemplate');
        })
        .catch((err) => {
          setError(err.message);
          console.log('setError');
        });
    }
  }, [error, loadingTemplate, props.templateUrl, template]);

  let message = null;

  if (error) {
    message = <Message negative attached='bottom'>
    <Icon name='warning sign'/>
    {error.toString()}
    </Message>;
  }

  if (!template) {
    message = <Message positive attached='bottom'>
    <Icon name='circle notched' loading />
    Loading {props.templateUrl}...
  </Message>;
  } else {
    message = <Message positive attached='bottom'>
    <Icon name='check square'/>
    Loaded {props.templateUrl}
  </Message>;
  }

  return (
    <div>
      <ClauseEditor
      lockText={props.lockText}
      markdown={props.markdown}
      template={template}
      onChange={props.onChange}
      onParse={props.onParse}
      />
      {message}
    </div>
  );
}

/**
 * The property types for this component
 */
TemplateLoadingClauseEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  onParse: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  lockText: PropTypes.bool.isRequired,
  templateUrl: PropTypes.string,
  template: PropTypes.object,
};

export default TemplateLoadingClauseEditor;
