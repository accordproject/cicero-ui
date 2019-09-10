/* React */
import React from 'react';

/* Actions */
import { truncateHeader } from './actions';

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
    switch (type) {
      case 'clause':
        return (
          <SC.HeaderClause
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {truncateHeader(header)}
          </ SC.HeaderClause>
        );
      case 'heading_one':
        return (
          <SC.HeaderOne
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {truncateHeader(header)}
          </ SC.HeaderOne>
        );
      case 'heading_two':
        return (
          <SC.HeaderTwo
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {truncateHeader(header)}
          </ SC.HeaderTwo>
        );
      case 'heading_three':
        return (
          <SC.HeaderThree
              key={key}
              onClick={() => navigateHeader(key, type)}
              {...props.styleProps}
          >
              {truncateHeader(header)}
          </ SC.HeaderThree>
        );
      default:
        return 'Error!';
    }
  });
};
