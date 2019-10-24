import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class City extends React.Component<ICityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cityList, match } = this.props;
    return (
      <div>
        <h2 id="city-heading">
          <Translate contentKey="investamartApp.city.home.title">Cities</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="investamartApp.city.home.createLabel">Create a new City</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {cityList && cityList.length > 0 ? (
            <Table responsive aria-describedby="city-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.cityCode">City Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.cityName">City Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.createSystemDate">Create System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.createDate">Create Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.createUserId">Create User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.lastModificationSystemDate">Last Modification System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.lastModificationDate">Last Modification Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.lastModificationUserId">Last Modification User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.city.province">Province</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cityList.map((city, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${city.id}`} color="link" size="sm">
                        {city.id}
                      </Button>
                    </td>
                    <td>{city.cityCode}</td>
                    <td>{city.cityName}</td>
                    <td>
                      <TextFormat type="date" value={city.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={city.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{city.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={city.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={city.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{city.lastModificationUserId}</td>
                    <td>{city.provinceId ? <Link to={`province/${city.provinceId}`}>{city.provinceId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${city.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${city.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${city.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="investamartApp.city.home.notFound">No Cities found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ city }: IRootState) => ({
  cityList: city.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
