import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICurrency } from 'app/shared/model/currency.model';
import { getEntities as getCurrencies } from 'app/entities/currency/currency.reducer';
import { getEntity, updateEntity, createEntity, reset } from './instrument.reducer';
import { IInstrument } from 'app/shared/model/instrument.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInstrumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInstrumentUpdateState {
  isNew: boolean;
  currencyId: string;
}

export class InstrumentUpdate extends React.Component<IInstrumentUpdateProps, IInstrumentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      currencyId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCurrencies();
  }

  saveEntity = (event, errors, values) => {
    values.createDate = convertDateTimeToServer(values.createDate);
    values.lastModificationDate = convertDateTimeToServer(values.lastModificationDate);

    if (errors.length === 0) {
      const { instrumentEntity } = this.props;
      const entity = {
        ...instrumentEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/instrument');
  };

  render() {
    const { instrumentEntity, currencies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="investamartApp.instrument.home.createOrEditLabel">
              <Translate contentKey="investamartApp.instrument.home.createOrEditLabel">Create or edit a Instrument</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : instrumentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="instrument-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="instrument-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="instrumentCodeLabel" for="instrument-instrumentCode">
                    <Translate contentKey="investamartApp.instrument.instrumentCode">Instrument Code</Translate>
                  </Label>
                  <AvField
                    id="instrument-instrumentCode"
                    type="text"
                    name="instrumentCode"
                    validate={{
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="instrumentTypeLabel" for="instrument-instrumentType">
                    <Translate contentKey="investamartApp.instrument.instrumentType">Instrument Type</Translate>
                  </Label>
                  <AvField
                    id="instrument-instrumentType"
                    type="text"
                    name="instrumentType"
                    validate={{
                      maxLength: { value: 1, errorMessage: translate('entity.validation.maxlength', { max: 1 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="instrumentShortCodeLabel" for="instrument-instrumentShortCode">
                    <Translate contentKey="investamartApp.instrument.instrumentShortCode">Instrument Short Code</Translate>
                  </Label>
                  <AvField
                    id="instrument-instrumentShortCode"
                    type="text"
                    name="instrumentShortCode"
                    validate={{
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="instrumentNameLabel" for="instrument-instrumentName">
                    <Translate contentKey="investamartApp.instrument.instrumentName">Instrument Name</Translate>
                  </Label>
                  <AvField
                    id="instrument-instrumentName"
                    type="text"
                    name="instrumentName"
                    validate={{
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="instrument-price">
                    <Translate contentKey="investamartApp.instrument.price">Price</Translate>
                  </Label>
                  <AvField id="instrument-price" type="string" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceDateLabel" for="instrument-priceDate">
                    <Translate contentKey="investamartApp.instrument.priceDate">Price Date</Translate>
                  </Label>
                  <AvField id="instrument-priceDate" type="date" className="form-control" name="priceDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="haircutLabel" for="instrument-haircut">
                    <Translate contentKey="investamartApp.instrument.haircut">Haircut</Translate>
                  </Label>
                  <AvField id="instrument-haircut" type="string" className="form-control" name="haircut" />
                </AvGroup>
                <AvGroup>
                  <Label id="haricutDateLabel" for="instrument-haricutDate">
                    <Translate contentKey="investamartApp.instrument.haricutDate">Haricut Date</Translate>
                  </Label>
                  <AvField id="instrument-haricutDate" type="date" className="form-control" name="haricutDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="instrument-createSystemDate">
                    <Translate contentKey="investamartApp.instrument.createSystemDate">Create System Date</Translate>
                  </Label>
                  <AvField id="instrument-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="instrument-createDate">
                    <Translate contentKey="investamartApp.instrument.createDate">Create Date</Translate>
                  </Label>
                  <AvInput
                    id="instrument-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.instrumentEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="instrument-createUserId">
                    <Translate contentKey="investamartApp.instrument.createUserId">Create User Id</Translate>
                  </Label>
                  <AvField id="instrument-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="instrument-lastModificationSystemDate">
                    <Translate contentKey="investamartApp.instrument.lastModificationSystemDate">Last Modification System Date</Translate>
                  </Label>
                  <AvField
                    id="instrument-lastModificationSystemDate"
                    type="date"
                    className="form-control"
                    name="lastModificationSystemDate"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="instrument-lastModificationDate">
                    <Translate contentKey="investamartApp.instrument.lastModificationDate">Last Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="instrument-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.instrumentEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="instrument-lastModificationUserId">
                    <Translate contentKey="investamartApp.instrument.lastModificationUserId">Last Modification User Id</Translate>
                  </Label>
                  <AvField id="instrument-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <AvGroup>
                  <Label for="instrument-currency">
                    <Translate contentKey="investamartApp.instrument.currency">Currency</Translate>
                  </Label>
                  <AvInput id="instrument-currency" type="select" className="form-control" name="currencyId">
                    <option value="" key="0" />
                    {currencies
                      ? currencies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/instrument" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  currencies: storeState.currency.entities,
  instrumentEntity: storeState.instrument.entity,
  loading: storeState.instrument.loading,
  updating: storeState.instrument.updating,
  updateSuccess: storeState.instrument.updateSuccess
});

const mapDispatchToProps = {
  getCurrencies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentUpdate);
