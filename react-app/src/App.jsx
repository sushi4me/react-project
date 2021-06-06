import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ListMenu from './components/list-menu/list-menu';
import Sidebar from './components/sidebar/sidebar';

import './themes/themes.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Sidebar>
          <ListMenu />
        </Sidebar>

        <Switch>
          <Route path='/'></Route>
          <Route path='/app'></Route>
          <Route path='/settings'></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
