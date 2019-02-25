import React from 'react';
import { browserHistory, Route, IndexRoute } from 'react-router';
import Login from '../../login/login';

import Main from '../containers/Main';
import CreatePlaybookContainer from '../containers/CreatePlaybookContainer';
import EditPlaybookContainer from '../containers/EditPlaybookContainer';
import App from '../layout/App';

export default (
  <Route  path="/" component={App} >
    <IndexRoute component={Login} />
    <Route  path="/dashboard" component={Main} />
    <Route  path="/playbook" component={CreatePlaybookContainer} />
    <Route  path="/playbook/:playbookid" component={EditPlaybookContainer} />
  </Route>
)
