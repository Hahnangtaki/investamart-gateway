import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CityDetail extends React.Component<ICityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.city.detail.title">City</Translate> [<b>{cityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="cityCode">
                <Translate contentKey="investamartApp.city.cityCode">City Code</Translate>
              </span>
            </dt>
            <dd>{cityEntity.cityCode}</dd>
            <dt>
              <span id="cityName">
                <Translate contentKey="investamartApp.city.cityName">City Name</Translate>
              </span>
            </dt>
            <dd>{cityEntity.cityName}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.city.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cityEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.city.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cityEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.city.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{cityEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.city.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cityEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.city.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cityEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.city.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{cityEntity.lastModificationUserId}</dd>
            <dt>
              <Translate contentKey="investamartApp.city.province">Province</Translate>
            </dt>
            <dd>{cityEntity.provinceId ? cityEntity.provinceId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/city" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/city/${cityEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ city }: IRootState) => ({
  cityEntity: city.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityDetail);
