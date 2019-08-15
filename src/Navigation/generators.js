/* React */
import React from 'react';

/* Actions */
import * as ACT from './actions';

/* Styling */
import * as SC from './styles';

/**
 * Represents the mapping of each header by type
 * Truncates the header name by type
 * @param {*} props
 */
export const headerGenerator = (props) => {
  const { navigateHeader } = props;
  const headers = props.headers || [];

  return headers.map((header) => {
    const { type, key } = header;
    if (ACT.isClause(type)) {
      return (
          <SC.HeaderClause
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {ACT.truncateHeader(header)}
          </ SC.HeaderClause>
      );
    }
    if (ACT.isHeadingOne(type)) {
      return (
          <SC.HeaderOne
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {ACT.truncateHeader(header)}
          </ SC.HeaderOne>
      );
    }
    if (ACT.isHeadingTwo(type)) {
      return (
          <SC.HeaderTwo
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {ACT.truncateHeader(header)}
          </ SC.HeaderTwo>
      );
    }
    if (ACT.isHeadingThree(type)) {
      return (
          <SC.HeaderThree
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {ACT.truncateHeader(header)}
          </ SC.HeaderThree>
      );
    }
    return 'Error!';
  });
};
