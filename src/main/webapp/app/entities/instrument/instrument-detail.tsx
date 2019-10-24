import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './instrument.reducer';
import { IInstrument } from 'app/shared/model/instrument.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInstrumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InstrumentDetail extends React.Component<IInstrumentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { instrumentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.instrument.detail.title">Instrument</Translate> [<b>{instrumentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="instrumentCode">
                <Translate contentKey="investamartApp.instrument.instrumentCode">Instrument Code</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.instrumentCode}</dd>
            <dt>
              <span id="instrumentType">
                <Translate contentKey="investamartApp.instrument.instrumentType">Instrument Type</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.instrumentType}</dd>
            <dt>
              <span id="instrumentShortCode">
                <Translate contentKey="investamartApp.instrument.instrumentShortCode">Instrument Short Code</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.instrumentShortCode}</dd>
            <dt>
              <span id="instrumentName">
                <Translate contentKey="investamartApp.instrument.instrumentName">Instrument Name</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.instrumentName}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="investamartApp.instrument.price">Price</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.price}</dd>
            <dt>
              <span id="priceDate">
                <Translate contentKey="investamartApp.instrument.priceDate">Price Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={instrumentEntity.priceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="haircut">
                <Translate contentKey="investamartApp.instrument.haircut">Haircut</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.haircut}</dd>
            <dt>
              <span id="haricutDate">
                <Translate contentKey="investamartApp.instrument.haricutDate">Haricut Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={instrumentEntity.haricutDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.instrument.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={instrumentEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.instrument.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={instrumentEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.instrument.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.instrument.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={instrumentEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.instrument.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={instrumentEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.instrument.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{instrumentEntity.lastModificationUserId}</dd>
            <dt>
              <Translate contentKey="investamartApp.instrument.currency">Currency</Translate>
            </dt>
            <dd>{instrumentEntity.currencyId ? instrumentEntity.currencyId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/instrument" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/instrument/${instrumentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ instrument }: IRootState) => ({
  instrumentEntity: instrument.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentDetail);
