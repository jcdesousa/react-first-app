import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './css/style.css';
// #TODO - Import App component 

import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        { /* #TODO - Create Match pattern for "/store/:storeId" and show component "App" */ }
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

render(<Root />, document.querySelector('#main'));
