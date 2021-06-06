import { library } from '@fortawesome/fontawesome-svg-core';
import * as BrandsSVGIcons from '@fortawesome/free-brands-svg-icons';
import * as RegularSVGIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidSVGIcons from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import App from './App';
import store from './store';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const getSVG = svgs => {
  return Object.keys(svgs)
    .filter(key => key !== 'fas' && key !== 'prefix')
    .map(icon => svgs[icon]);
};

library.add(
  ...getSVG(SolidSVGIcons).concat(
    ...getSVG(RegularSVGIcons),
    ...getSVG(BrandsSVGIcons),
  ),
);

document.body.classList.add('night');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
