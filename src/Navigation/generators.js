/* React */
import React from 'react';

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
    const { type, text, key } = header;

    if (!text) return null;
    switch (type) {
      case 'clause':
        return (
          <SC.HeaderClause
              key={key}
              onClick={() => navigateHeader(key, type)}
              className={'navHeaderClause'}
          >
              {text}
          </ SC.HeaderClause>
        );
      case 'heading_one':
        return (
          <SC.HeaderOne
              key={key}
              onClick={() => navigateHeader(key, type)}
              className={'navHeaderH1'}
          >
              {text}
          </ SC.HeaderOne>
        );
      case 'heading_two':
        return (
          <SC.HeaderTwo
              key={key}
              onClick={() => navigateHeader(key, type)}
              className={'navHeaderH2'}
          >
              {text}
          </ SC.HeaderTwo>
        );
      case 'heading_three':
        return (
          <SC.HeaderThree
              key={key}
              onClick={() => navigateHeader(key, type)}
              className={'navHeaderH3'}
          >
              {text}
          </ SC.HeaderThree>
        );
      default:
        return 'Error!';
    }
  });
};
