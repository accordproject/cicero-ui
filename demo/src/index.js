import React, { useCallback } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import TemplateLoadingClauseEditor from '../../src/TemplateLoadingClauseEditor';

const templateUrl = 'https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta';
const initialMarkdown = 'Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.';

/**
 * A demo component that uses TemplateLoadingClauseEditor
 * @param {*} props
 */
// eslint-disable-next-line require-jsdoc, no-unused-vars
function Demo(props) {
  /**
   * Called when the data in the editor has been modified
   */
  const onChange = useCallback((value, markdown) => {
    // console.log('new markdown');
  }, []);

  /**
   * Called when the data in the editor has been parsed
   */
  const onParse = useCallback((newParseResult) => {
    // console.log('onParse');
  }, []);

  return (
    <div>
      <TemplateLoadingClauseEditor
        lockText={true}
        markdown={initialMarkdown}
        templateUrl={templateUrl}
        onChange={onChange}
        onParse={onParse}
        />
    </div>
  );
}

render(<Demo/>, document.querySelector('#root'));
