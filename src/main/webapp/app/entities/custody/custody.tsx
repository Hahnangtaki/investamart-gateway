import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './custody.reducer';
import { ICustody } from 'app/shared/model/custody.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustodyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Custody extends React.Component<ICustodyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { custodyList, match } = this.props;
    return (
      <div>
        <h2 id="custody-heading">
          <Translate contentKey="investamartApp.custody.home.title">Custodies</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="investamartApp.custody.home.createLabel">Create a new Custody</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {custodyList && custodyList.length > 0 ? (
            <Table responsive aria-describedby="custody-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.custodyCode">Custody Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.custodiName">Custodi Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.createSystemDate">Create System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.createDate">Create Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.createUserId">Create User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.lastModificationSystemDate">Last Modification System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.lastModificationDate">Last Modification Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.custody.lastModificationUserId">Last Modification User Id</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {custodyList.map((custody, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${custody.id}`} color="link" size="sm">
                        {custody.id}
                      </Button>
                    </td>
                    <td>{custody.custodyCode}</td>
                    <td>{custody.custodiName}</td>
                    <td>
                      <TextFormat type="date" value={custody.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={custody.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{custody.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={custody.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={custody.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{custody.lastModificationUserId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${custody.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${custody.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${custody.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="investamartApp.custody.home.notFound">No Custodies found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ custody }: IRootState) => ({
  custodyList: custody.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Custody);
