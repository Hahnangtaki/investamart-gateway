import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Custody from './custody';
import CustodyDetail from './custody-detail';
import CustodyUpdate from './custody-update';
import CustodyDeleteDialog from './custody-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustodyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustodyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustodyDetail} />
      <ErrorBoundaryRoute path={match.url} component={Custody} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustodyDeleteDialog} />
  </>
);

export default Routes;
