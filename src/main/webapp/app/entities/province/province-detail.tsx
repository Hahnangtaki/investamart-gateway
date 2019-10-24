import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './province.reducer';
import { IProvince } from 'app/shared/model/province.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProvinceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProvinceDetail extends React.Component<IProvinceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { provinceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.province.detail.title">Province</Translate> [<b>{provinceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="provinceCode">
                <Translate contentKey="investamartApp.province.provinceCode">Province Code</Translate>
              </span>
            </dt>
            <dd>{provinceEntity.provinceCode}</dd>
            <dt>
              <span id="provinceName">
                <Translate contentKey="investamartApp.province.provinceName">Province Name</Translate>
              </span>
            </dt>
            <dd>{provinceEntity.provinceName}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.province.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={provinceEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.province.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={provinceEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.province.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{provinceEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.province.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={provinceEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.province.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={provinceEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.province.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{provinceEntity.lastModificationUserId}</dd>
            <dt>
              <Translate contentKey="investamartApp.province.country">Country</Translate>
            </dt>
            <dd>{provinceEntity.countryId ? provinceEntity.countryId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/province" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/province/${provinceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ province }: IRootState) => ({
  provinceEntity: province.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProvinceDetail);
