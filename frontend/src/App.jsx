import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Sidebar from './components/sidebar/sidebar';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Sidebar />
    </div>
  );
};

export default App;
