/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';

const NavWrapper = styled.div`
    overflow-y: scroll !important;
    padding-top: 10px;

    display: grid;
    grid-area: body;
`;

/**
 * Represents all headers currently in a contract
 * @param {*} props
 */
const ContractNavigation = props => (
      <NavWrapper>
          {props.headers
            .map(header => <p style={{ color: 'white' }} key={header.key} >{header.text}</p>)}
      </NavWrapper>
);

ContractNavigation.propTypes = {
  headers: PropTypes.array
};

export default ContractNavigation;
