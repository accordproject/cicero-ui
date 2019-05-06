import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import BaseComponent from './BaseComponent';
import TextBlock from './TextBlock';

const ClauseWrapper = styled(TextBlock)`
  margin: 10px auto;
  padding: 0;
  border: 1px solid #95D0FF;
  background-color: #E3F6FF;
  box-shadow: 0 1px 9px 0 rgba(0,124,232,0.16);
`;

const ClauseErrorWrapper = styled(ClauseWrapper)`
  border: 1px solid #FF9595;
  background-color: #FFEAE3;
  box-shadow: 0 1px 9px 0 rgba(232,0,0,0.16);
`;

const ClauseMenu = styled.div`
  position: relative;
  margin: 0 0 10px;
  padding: 10px 20px 8px;
  border-bottom: 1px solid #95D0FF;
`;

const ContractActions = styled.div`
  float: right;
  padding-top: 2px;
`;

const ClauseAction = styled.a`
  color: #99D2FB;
  cursor: pointer;
`;

const MenuText = styled.p`
  margin-bottom: 2px;
  color: #2587DA;
  font-size: 12px;
  line-height: 15px;
`;

const ClauseName = styled(MenuText)`
  font-weight: bold;
`;

const ClauseText = styled.p`
  margin: 0;
  padding: 0 20px 10px;
`;

const ClauseError = styled.pre`
  position: relative;
  margin: 0;
  padding: 10px 20px 8px;
  border-top: 1px solid #95D0FF;
  overflow-x: auto;
`;

class ClauseComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  getClause() {
    return this.props.node.data.get('clause');
  }

  handleDelete() {
    this.props.editor.props.onClauseEvent(
      'handleDeleteClause',
      { id: this.props.node.data.get('clauseId') },
    );
  }

  handleEdit() {
    this.props.editor.props.onClauseEvent(
      'handleEditClause',
      { id: this.props.node.data.get('clauseId') },
    );
  }

  renderMenu() {
    const { node, editor } = this.props;
    const readOnly = editor.props.readOnly;
    return (
      <ClauseMenu contentEditable={false}>
        { readOnly ? null : (
          <ContractActions>
            <ClauseAction onClick={this.handleEdit}>
              <Icon name="pencil" size="large" />
            </ClauseAction>
            <ClauseAction onClick={this.handleDelete}>
              <Icon name="trash" size="large" />
            </ClauseAction>
          </ContractActions>
        )}
        <ClauseName className="templateName">
          {node.data.get('templateName')}
        </ClauseName>
        <MenuText>
          Only certain parts of the Smart Clause text can be edited
        </MenuText>
      </ClauseMenu>
    );
  }

  render() {
    const { node, children } = this.props;
    let Wrapper = ClauseWrapper;
    let err = null;
    if (!node.data.get('valid')) {
      Wrapper = ClauseErrorWrapper;
      err = node.data.get('error');
    }

    return (
      <Wrapper templateuri={node.data.get('templateUri')} {...this.props.attributes}>
        {this.renderMenu()}
        <ClauseText>
          {children}
        </ClauseText>
        { !err ? null : (
          <ClauseError contentEditable={false}>{err}</ClauseError>
        )}
      </Wrapper>
    );
  }
}

ClauseComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  editor: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
};

export default ClauseComponent;
