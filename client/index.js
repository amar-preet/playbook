import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

var Promise = require('es6-promise');

ReactDom.render(<Router history={browserHistory} routes={routes} />, document.querySelector('#app'));

/*

This gets injected into index.html
 _ _ _ _ _ _ _ _ _ _ _
| HEADER CONTAINER    |
| -> STATIC CONTENT   |
|_____________________|
| MAIN/EDIT CONTAINER |
| -> DYNAMIC CONTENT  |
|                     |
|                     |
|_____________________|
| FOOTER CONTAINER    |
| -> STATIC CONTENT   |
|_____________________|


- Get the various containers organized
- Get the routes integrated
- Do more research on history + a store (redux)

*/
