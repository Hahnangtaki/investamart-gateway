import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './currency.reducer';
import { ICurrency } from 'app/shared/model/currency.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICurrencyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICurrencyUpdateState {
  isNew: boolean;
}

export class CurrencyUpdate extends React.Component<ICurrencyUpdateProps, ICurrencyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.createDate = convertDateTimeToServer(values.createDate);
    values.lastModificationDate = convertDateTimeToServer(values.lastModificationDate);

    if (errors.length === 0) {
      const { currencyEntity } = this.props;
      const entity = {
        ...currencyEntity,
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
    this.props.history.push('/entity/currency');
  };

  render() {
    const { currencyEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="investamartApp.currency.home.createOrEditLabel">
              <Translate contentKey="investamartApp.currency.home.createOrEditLabel">Create or edit a Currency</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : currencyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="currency-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="currency-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="currencyCodeLabel" for="currency-currencyCode">
                    <Translate contentKey="investamartApp.currency.currencyCode">Currency Code</Translate>
                  </Label>
                  <AvField
                    id="currency-currencyCode"
                    type="text"
                    name="currencyCode"
                    validate={{
                      maxLength: { value: 5, errorMessage: translate('entity.validation.maxlength', { max: 5 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="currencyNameLabel" for="currency-currencyName">
                    <Translate contentKey="investamartApp.currency.currencyName">Currency Name</Translate>
                  </Label>
                  <AvField
                    id="currency-currencyName"
                    type="text"
                    name="currencyName"
                    validate={{
                      maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="currencySymbolLabel" for="currency-currencySymbol">
                    <Translate contentKey="investamartApp.currency.currencySymbol">Currency Symbol</Translate>
                  </Label>
                  <AvField
                    id="currency-currencySymbol"
                    type="text"
                    name="currencySymbol"
                    validate={{
                      maxLength: { value: 5, errorMessage: translate('entity.validation.maxlength', { max: 5 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="currency-createSystemDate">
                    <Translate contentKey="investamartApp.currency.createSystemDate">Create System Date</Translate>
                  </Label>
                  <AvField id="currency-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="currency-createDate">
                    <Translate contentKey="investamartApp.currency.createDate">Create Date</Translate>
                  </Label>
                  <AvInput
                    id="currency-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.currencyEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="currency-createUserId">
                    <Translate contentKey="investamartApp.currency.createUserId">Create User Id</Translate>
                  </Label>
                  <AvField id="currency-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="currency-lastModificationSystemDate">
                    <Translate contentKey="investamartApp.currency.lastModificationSystemDate">Last Modification System Date</Translate>
                  </Label>
                  <AvField
                    id="currency-lastModificationSystemDate"
                    type="date"
                    className="form-control"
                    name="lastModificationSystemDate"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="currency-lastModificationDate">
                    <Translate contentKey="investamartApp.currency.lastModificationDate">Last Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="currency-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.currencyEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="currency-lastModificationUserId">
                    <Translate contentKey="investamartApp.currency.lastModificationUserId">Last Modification User Id</Translate>
                  </Label>
                  <AvField id="currency-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/currency" replace color="info">
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
  currencyEntity: storeState.currency.entity,
  loading: storeState.currency.loading,
  updating: storeState.currency.updating,
  updateSuccess: storeState.currency.updateSuccess
});

const mapDispatchToProps = {
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
)(CurrencyUpdate);
