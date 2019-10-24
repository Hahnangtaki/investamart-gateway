import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './manager-investasi.reducer';
import { IManagerInvestasi } from 'app/shared/model/manager-investasi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IManagerInvestasiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ManagerInvestasiDetail extends React.Component<IManagerInvestasiDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { managerInvestasiEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.managerInvestasi.detail.title">ManagerInvestasi</Translate> [
            <b>{managerInvestasiEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="miCode">
                <Translate contentKey="investamartApp.managerInvestasi.miCode">Mi Code</Translate>
              </span>
            </dt>
            <dd>{managerInvestasiEntity.miCode}</dd>
            <dt>
              <span id="miName">
                <Translate contentKey="investamartApp.managerInvestasi.miName">Mi Name</Translate>
              </span>
            </dt>
            <dd>{managerInvestasiEntity.miName}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.managerInvestasi.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={managerInvestasiEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.managerInvestasi.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={managerInvestasiEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.managerInvestasi.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{managerInvestasiEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.managerInvestasi.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={managerInvestasiEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.managerInvestasi.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={managerInvestasiEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.managerInvestasi.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{managerInvestasiEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/manager-investasi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/manager-investasi/${managerInvestasiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ managerInvestasi }: IRootState) => ({
  managerInvestasiEntity: managerInvestasi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerInvestasiDetail);
