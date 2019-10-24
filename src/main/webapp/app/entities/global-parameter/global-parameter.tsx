import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './global-parameter.reducer';
import { IGlobalParameter } from 'app/shared/model/global-parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGlobalParameterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class GlobalParameter extends React.Component<IGlobalParameterProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { globalParameterList, match } = this.props;
    return (
      <div>
        <h2 id="global-parameter-heading">
          <Translate contentKey="investamartApp.globalParameter.home.title">Global Parameters</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="investamartApp.globalParameter.home.createLabel">Create a new Global Parameter</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {globalParameterList && globalParameterList.length > 0 ? (
            <Table responsive aria-describedby="global-parameter-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.paramCode">Param Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.paramName">Param Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.paramType">Param Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.intValue">Int Value</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.floatValue">Float Value</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.stringValue">String Value</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.dateValue">Date Value</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.show">Show</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.edit">Edit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.createSystemDate">Create System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.createDate">Create Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.createUserId">Create User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.lastModificationSystemDate">
                      Last Modification System Date
                    </Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.lastModificationDate">Last Modification Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.globalParameter.lastModificationUserId">Last Modification User Id</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {globalParameterList.map((globalParameter, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${globalParameter.id}`} color="link" size="sm">
                        {globalParameter.id}
                      </Button>
                    </td>
                    <td>{globalParameter.paramCode}</td>
                    <td>{globalParameter.paramName}</td>
                    <td>{globalParameter.paramType}</td>
                    <td>{globalParameter.intValue}</td>
                    <td>{globalParameter.floatValue}</td>
                    <td>{globalParameter.stringValue}</td>
                    <td>
                      <TextFormat type="date" value={globalParameter.dateValue} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{globalParameter.show ? 'true' : 'false'}</td>
                    <td>{globalParameter.edit ? 'true' : 'false'}</td>
                    <td>
                      <TextFormat type="date" value={globalParameter.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={globalParameter.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{globalParameter.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={globalParameter.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={globalParameter.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{globalParameter.lastModificationUserId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="investamartApp.globalParameter.home.notFound">No Global Parameters found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ globalParameter }: IRootState) => ({
  globalParameterList: globalParameter.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalParameter);
