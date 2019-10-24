import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './currency.reducer';
import { ICurrency } from 'app/shared/model/currency.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICurrencyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CurrencyDetail extends React.Component<ICurrencyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { currencyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.currency.detail.title">Currency</Translate> [<b>{currencyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="currencyCode">
                <Translate contentKey="investamartApp.currency.currencyCode">Currency Code</Translate>
              </span>
            </dt>
            <dd>{currencyEntity.currencyCode}</dd>
            <dt>
              <span id="currencyName">
                <Translate contentKey="investamartApp.currency.currencyName">Currency Name</Translate>
              </span>
            </dt>
            <dd>{currencyEntity.currencyName}</dd>
            <dt>
              <span id="currencySymbol">
                <Translate contentKey="investamartApp.currency.currencySymbol">Currency Symbol</Translate>
              </span>
            </dt>
            <dd>{currencyEntity.currencySymbol}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.currency.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={currencyEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.currency.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={currencyEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.currency.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{currencyEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.currency.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={currencyEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.currency.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={currencyEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.currency.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{currencyEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/currency" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/currency/${currencyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ currency }: IRootState) => ({
  currencyEntity: currency.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDetail);
