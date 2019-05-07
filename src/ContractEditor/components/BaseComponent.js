import React, { Component } from 'react';

import CustomLoader from './CustomLoader';

class BaseComponent extends Component {
  constructor(props) {
    super(props);

    this.onError = this.onError.bind(this);
    this.state = {
      error: false,
      loading: false,
      loadingMessage: '',
      saving: false,
    };
  }

  onError(error) {
    if (error.response) {
      return error.response.then((err) => {
        this.setState({
          error: err.error.message,
          loading: false,
          loadingMessage: '',
          saving: false,
        });

        return err.error.message;
      });
    }
    this.setState({
      error,
      loading: false,
      loadingMessage: '',
      saving: false,
    });

    return Promise.resolve();
  }

  get defaultState() {
    return {
      error: false,
      loading: false,
      loadingMessage: '',
      saving: false,
    };
  }

  get loader() {
    return (
      <CustomLoader active={this.state.loading} loadingMessage={this.state.loadingMessage} />
    );
  }

  initState(state) {
    this.state = this.mergeState(state);
  }

  loaded() {
    this.setState({
      loading: false,
      loadingMessage: '',
    });
  }

  loading(msg = '') {
    this.setState({
      error: false,
      loading: true,
      loadingMessage: msg,
    });
  }

  reset() {
    this.setState(this.defaultState);
  }

  saving(msg = '') {
    this.setState({
      error: false,
      loading: true,
      loadingMessage: msg,
      saving: true,
    });
  }

  mergeState(state) {
    return Object.assign({}, this.defaultState, state);
  }
}

export default BaseComponent;
