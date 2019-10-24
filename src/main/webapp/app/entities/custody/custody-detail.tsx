import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './custody.reducer';
import { ICustody } from 'app/shared/model/custody.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustodyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustodyDetail extends React.Component<ICustodyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { custodyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.custody.detail.title">Custody</Translate> [<b>{custodyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="custodyCode">
                <Translate contentKey="investamartApp.custody.custodyCode">Custody Code</Translate>
              </span>
            </dt>
            <dd>{custodyEntity.custodyCode}</dd>
            <dt>
              <span id="custodiName">
                <Translate contentKey="investamartApp.custody.custodiName">Custodi Name</Translate>
              </span>
            </dt>
            <dd>{custodyEntity.custodiName}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.custody.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={custodyEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.custody.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={custodyEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.custody.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{custodyEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.custody.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={custodyEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.custody.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={custodyEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.custody.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{custodyEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/custody" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/custody/${custodyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ custody }: IRootState) => ({
  custodyEntity: custody.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustodyDetail);
