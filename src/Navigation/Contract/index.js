/* React */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* Actions */
import * as ACT from '../actions';

/* Styling */
// import * as SC from '../styles';

export const ContractHeaders = styled.div`
    overflow-y: scroll !important;
    overflow-x: hidden;
    padding-top: 10px;

    display: grid;
    grid-area: body;
`;

export const HeaderOne = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    height: 24px;
    width: 185px;
    color: ${props => props.headerColor || '#B9BCC4'};
    font-family: "IBM Plex Sans";
    font-size: 16px;
    letter-spacing: -0.5px;
    line-height: 24px;
    &:hover {
        cursor: pointer;
        color: ${props => props.headerHover || '#19C6C7'};
    }
`;

export const HeaderTwo = styled(HeaderOne)`
    margin-left: 20px;
`;

export const HeaderThree = styled(HeaderOne)`
    margin-left: 40px;
`;

export const HeaderClause = styled(HeaderOne)`
    color: ${props => props.clauseColor || '#FFFFFF'} !important;
    font-weight: bold;
    
    &:hover {
        color: ${props => props.clauseHover || '#19C6C7'} !important;
    }
`;

const isClause = input => input === 'clause';
const isHeadingOne = input => input === 'heading_one';
const isHeadingTwo = input => input === 'heading_two';
const isHeadingThree = input => input === 'heading_three';

const headerGenerator = (props) => {
  const { navigateHeader } = props;
  const headers = props.headers || [];
  //   console.log('headerGenerator: ', props);
  return headers.map((header) => {
    if (isClause(header.type)) {
      return (
        <HeaderClause key={header.key} onClick={() => navigateHeader(header.key)} {...props.styleProps}>
            {ACT.truncateHeader(header)}
        </ HeaderClause>
      );
    }
    if (isHeadingOne(header.type)) {
      return (
        <HeaderOne key={header.key} {...props.styleProps}>
            {ACT.truncateHeader(header)}
        </ HeaderOne>
      );
    }
    if (isHeadingTwo(header.type)) {
      return (
        <HeaderTwo key={header.key} {...props.styleProps} >
            {ACT.truncateHeader(header)}
        </ HeaderTwo>
      );
    }
    if (isHeadingThree(header.type)) {
      return (
        <HeaderThree key={header.key} {...props.styleProps} >
            {ACT.truncateHeader(header)}
        </ HeaderThree>
      );
    }
    return 'Error!';
  });
};

/**
 * Represents all headers currently in a contract
 * @param {*} props
 */
const ContractNavigation = (props) => {
  const variable2 = 2;
  //   console.log('variable: ', variable2);
  //   console.log('ContractNavigation: ', props);
  return (
      <ContractHeaders>
          {headerGenerator(props)}
      </ContractHeaders>
  );
};

ContractNavigation.propTypes = {
  headers: PropTypes.array,
  navigateHeader: PropTypes.func,
  styleProps: PropTypes.shape({
    headerColor: PropTypes.string,
    headerHover: PropTypes.string,
    clauseColor: PropTypes.string,
    clauseHover: PropTypes.string,
    clauseHeaderColor: PropTypes.string,
    clauseHeaderHover: PropTypes.string,
  }),
};

export default ContractNavigation;
