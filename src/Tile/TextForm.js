import React, { useState } from 'react';
import PropTypes from 'prop-types';

// The TextForm Pure component
export default React.memo( (props) => {

  propTypes = {
    label: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  const [setValue, value] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    props.handleSubmit(value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <b>{props.label}</b>
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );

})
