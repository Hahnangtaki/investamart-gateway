import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bank.reducer';
import { IBank } from 'app/shared/model/bank.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BankDetail extends React.Component<IBankDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bankEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.bank.detail.title">Bank</Translate> [<b>{bankEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="bankCode">
                <Translate contentKey="investamartApp.bank.bankCode">Bank Code</Translate>
              </span>
            </dt>
            <dd>{bankEntity.bankCode}</dd>
            <dt>
              <span id="bankName">
                <Translate contentKey="investamartApp.bank.bankName">Bank Name</Translate>
              </span>
            </dt>
            <dd>{bankEntity.bankName}</dd>
            <dt>
              <span id="initialName">
                <Translate contentKey="investamartApp.bank.initialName">Initial Name</Translate>
              </span>
            </dt>
            <dd>{bankEntity.initialName}</dd>
            <dt>
              <span id="biCode">
                <Translate contentKey="investamartApp.bank.biCode">Bi Code</Translate>
              </span>
            </dt>
            <dd>{bankEntity.biCode}</dd>
            <dt>
              <span id="swiftCode">
                <Translate contentKey="investamartApp.bank.swiftCode">Swift Code</Translate>
              </span>
            </dt>
            <dd>{bankEntity.swiftCode}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.bank.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.bank.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.bank.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{bankEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.bank.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.bank.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.bank.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{bankEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/bank" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/bank/${bankEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ bank }: IRootState) => ({
  bankEntity: bank.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankDetail);
