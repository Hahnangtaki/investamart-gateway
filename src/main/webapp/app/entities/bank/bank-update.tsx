import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './bank.reducer';
import { IBank } from 'app/shared/model/bank.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBankUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBankUpdateState {
  isNew: boolean;
}

export class BankUpdate extends React.Component<IBankUpdateProps, IBankUpdateState> {
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
      const { bankEntity } = this.props;
      const entity = {
        ...bankEntity,
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
    this.props.history.push('/entity/bank');
  };

  render() {
    const { bankEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="investamartApp.bank.home.createOrEditLabel">
              <Translate contentKey="investamartApp.bank.home.createOrEditLabel">Create or edit a Bank</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : bankEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="bank-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="bank-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="bankCodeLabel" for="bank-bankCode">
                    <Translate contentKey="investamartApp.bank.bankCode">Bank Code</Translate>
                  </Label>
                  <AvField
                    id="bank-bankCode"
                    type="text"
                    name="bankCode"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="bankNameLabel" for="bank-bankName">
                    <Translate contentKey="investamartApp.bank.bankName">Bank Name</Translate>
                  </Label>
                  <AvField
                    id="bank-bankName"
                    type="text"
                    name="bankName"
                    validate={{
                      maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="initialNameLabel" for="bank-initialName">
                    <Translate contentKey="investamartApp.bank.initialName">Initial Name</Translate>
                  </Label>
                  <AvField
                    id="bank-initialName"
                    type="text"
                    name="initialName"
                    validate={{
                      maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="biCodeLabel" for="bank-biCode">
                    <Translate contentKey="investamartApp.bank.biCode">Bi Code</Translate>
                  </Label>
                  <AvField
                    id="bank-biCode"
                    type="text"
                    name="biCode"
                    validate={{
                      maxLength: { value: 3, errorMessage: translate('entity.validation.maxlength', { max: 3 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="swiftCodeLabel" for="bank-swiftCode">
                    <Translate contentKey="investamartApp.bank.swiftCode">Swift Code</Translate>
                  </Label>
                  <AvField
                    id="bank-swiftCode"
                    type="text"
                    name="swiftCode"
                    validate={{
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="bank-createSystemDate">
                    <Translate contentKey="investamartApp.bank.createSystemDate">Create System Date</Translate>
                  </Label>
                  <AvField id="bank-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="bank-createDate">
                    <Translate contentKey="investamartApp.bank.createDate">Create Date</Translate>
                  </Label>
                  <AvInput
                    id="bank-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.bankEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="bank-createUserId">
                    <Translate contentKey="investamartApp.bank.createUserId">Create User Id</Translate>
                  </Label>
                  <AvField id="bank-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="bank-lastModificationSystemDate">
                    <Translate contentKey="investamartApp.bank.lastModificationSystemDate">Last Modification System Date</Translate>
                  </Label>
                  <AvField id="bank-lastModificationSystemDate" type="date" className="form-control" name="lastModificationSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="bank-lastModificationDate">
                    <Translate contentKey="investamartApp.bank.lastModificationDate">Last Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="bank-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.bankEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="bank-lastModificationUserId">
                    <Translate contentKey="investamartApp.bank.lastModificationUserId">Last Modification User Id</Translate>
                  </Label>
                  <AvField id="bank-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/bank" replace color="info">
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
  bankEntity: storeState.bank.entity,
  loading: storeState.bank.loading,
  updating: storeState.bank.updating,
  updateSuccess: storeState.bank.updateSuccess
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
)(BankUpdate);
