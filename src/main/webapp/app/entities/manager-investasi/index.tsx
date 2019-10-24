import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ManagerInvestasi from './manager-investasi';
import ManagerInvestasiDetail from './manager-investasi-detail';
import ManagerInvestasiUpdate from './manager-investasi-update';
import ManagerInvestasiDeleteDialog from './manager-investasi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ManagerInvestasiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ManagerInvestasiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ManagerInvestasiDetail} />
      <ErrorBoundaryRoute path={match.url} component={ManagerInvestasi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ManagerInvestasiDeleteDialog} />
  </>
);

export default Routes;
