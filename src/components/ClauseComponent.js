import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment } from 'semantic-ui-react';

/**
 * Component to render a clause
 *
 * @param {*} props
 */
function ClauseComponent(props) {
  const errorsComponent = props.errors
    ? <Segment contenteditable={false} attached raised>{props.errors}</Segment>
    : null;

  return (
    <div>
    <Header contenteditable={false} color='grey' size='tiny' as='h2' attached='top'>
      {props.templateUri} : {props.clauseId}
    </Header>
    <Segment attached raised>{props.children}</Segment>
    {errorsComponent}
  </div>
  );
}

ClauseComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  templateUri: PropTypes.string.isRequired,
  clauseId: PropTypes.string,
  errors: PropTypes.object,
};

export default ClauseComponent;
