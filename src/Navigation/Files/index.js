/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';

const Heading = styled.h2`
  color: ${LEFT_NAV.HEADING};
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  text-decoration: none;
  text-align: left;
  margin: 10px;
`;

const TextButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: ${props => (props.fontSize ? props.fontSize : 'inherit')};
  color: ${props => (props.disabled ? '#B5BABE' : AP_THEME.GRAY)};
  display: ${props => (props.display ? props.display : 'inline-block')};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${AP_THEME.WHITE};
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    color: ${AP_THEME.WHITE};
    text-decoration: underline;
  }
  &:active {
    color: ${AP_THEME.WHITE};
    text-decoration: underline;
  }
`;

const SubHeadingBtn = styled(TextButton)`
  color: ${AP_THEME.GRAY};
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  text-align: left;
  margin: 6px;
  display: block;
  padding-left: 10px;
`;


const someSortOfComponent = (clauses, slateValue) => {
  const clauseNodes = slateValue.toJSON().document.nodes.filter(node => node.type === 'clause');

  return (
        <React.Fragment>
            <Heading>CONTRACT</Heading>
            <SubHeading onClick={() => setCurrentEditor(null, 'contract')}>Contract</SubHeading>
            <br />
            <Heading>CLAUSES</Heading>
            { Object.keys(clauses).length
              ? clauseNodes.map((clauseNode) => {
                // clauseid is the id of the clause instance
                const { clauseid, src } = clauseNode.data.attributes;
                if (!clauses[clauseid]) return null;
                // clauseTemplateRef is the id of the clause template which the clause is an instance of
                const { clauseTemplateRef } = clauses[clauseid];
                return (
                    <ClauseNav
                    key={clauseid}
                    showExpandedClause={showExpandedClause}
                    onClauseClick={onClauseClick}
                    clauseTemplateId={clauseTemplateRef}
                    src={src}
                    setCurrentEditor={setCurrentEditor}
                    />);
              }) : null
            }
            </React.Fragment>);
};

export default someSortOfComponent;
