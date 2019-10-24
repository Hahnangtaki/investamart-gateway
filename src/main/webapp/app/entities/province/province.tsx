import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './province.reducer';
import { IProvince } from 'app/shared/model/province.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProvinceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Province extends React.Component<IProvinceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { provinceList, match } = this.props;
    return (
      <div>
        <h2 id="province-heading">
          <Translate contentKey="investamartApp.province.home.title">Provinces</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="investamartApp.province.home.createLabel">Create a new Province</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {provinceList && provinceList.length > 0 ? (
            <Table responsive aria-describedby="province-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.provinceCode">Province Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.provinceName">Province Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.createSystemDate">Create System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.createDate">Create Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.createUserId">Create User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.lastModificationSystemDate">Last Modification System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.lastModificationDate">Last Modification Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.lastModificationUserId">Last Modification User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.province.country">Country</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {provinceList.map((province, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${province.id}`} color="link" size="sm">
                        {province.id}
                      </Button>
                    </td>
                    <td>{province.provinceCode}</td>
                    <td>{province.provinceName}</td>
                    <td>
                      <TextFormat type="date" value={province.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={province.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{province.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={province.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={province.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{province.lastModificationUserId}</td>
                    <td>{province.countryId ? <Link to={`country/${province.countryId}`}>{province.countryId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${province.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${province.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${province.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="investamartApp.province.home.notFound">No Provinces found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ province }: IRootState) => ({
  provinceList: province.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Province);
