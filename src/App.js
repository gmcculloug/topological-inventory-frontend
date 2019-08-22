import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import './App.scss';

class App extends Component {

  componentDidMount () {
    insights.chrome.init();
  }

  render () {
    return (
      <Main>
        <Routes childProps={ this.props } />
      </Main>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};
export default withRouter(App);
