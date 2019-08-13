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
    margin: 2px 0;
    height: 24px;
    width: 185px;
    color: #B9BCC4;
    font-family: "IBM Plex Sans";
    font-size: 16px;
    letter-spacing: -0.5px;
    line-height: 24px;
`;

export const HeaderTwo = styled.div`
    margin: 2px 0 2px 20px;
    height: 24px;
    width: 185px;
    color: #B9BCC4;
    font-family: "IBM Plex Sans";
    font-size: 16px;
    letter-spacing: -0.5px;
    line-height: 24px;
`;

export const HeaderThree = styled.div`
    margin: 2px 0 2px 40px;
    height: 24px;
    width: 185px;
    color: #B9BCC4;
    font-family: "IBM Plex Sans";
    font-size: 16px;
    letter-spacing: -0.5px;
    line-height: 24px;
`;
const isHeadingOne = input => input === 'heading_one';
const isHeadingTwo = input => input === 'heading_two';
const isHeadingThree = input => input === 'heading_three';

const headerGenerator = headers => headers.map((header) => {
  if (isHeadingOne(header.type)) {
    return <HeaderOne key={header.key} >{ACT.truncateHeader(header)}</ HeaderOne>;
  }
  if (isHeadingTwo(header.type)) {
    return <HeaderTwo key={header.key} >{ACT.truncateHeader(header)}</ HeaderTwo>;
  }
  if (isHeadingThree(header.type)) {
    return <HeaderThree key={header.key} >{ACT.truncateHeader(header)}</ HeaderThree>;
  }
  return 'Error!';
});

/**
 * Represents all headers currently in a contract
 * @param {*} props
 */
const ContractNavigation = (props) => {
  const variable2 = 2;
  return (
      <ContractHeaders>
          {headerGenerator(props.headers)}
      </ContractHeaders>
  );
};

ContractNavigation.propTypes = {
  headers: PropTypes.array
};

export default ContractNavigation;
