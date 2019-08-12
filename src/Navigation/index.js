/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';

const NavWrapper = styled.div`
  padding-top: 10px;
`;

// const LeftSidebar = styled.div`
//   background-color: ${AP_THEME.DARK_BLUE};
//   height: inherit;
// `;

// const LeftNavWrapper = styled.div`
//     padding: 15px;
//     overflow-x: hidden;
//     background-color: ${AP_THEME.DARK_BLUE};
//   `;

// const Heading = styled.h2`
//   color: ${LEFT_NAV.HEADING};
//   font-size: 14px;
//   font-weight: 600;
//   line-height: 14px;
//   text-decoration: none;
//   text-align: left;
//   margin: 10px;
// `;


const someSortOfComponent = props => (
      <NavWrapper>
          {props.headers.map(header => <p key={header.key} >{header.key}</p>)}
      </NavWrapper>
);

someSortOfComponent.propTypes = {
  headers: PropTypes.array
};

export default someSortOfComponent;
