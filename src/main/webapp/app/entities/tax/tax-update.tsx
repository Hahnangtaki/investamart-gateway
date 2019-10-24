import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './tax.reducer';
import { ITax } from 'app/shared/model/tax.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaxUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITaxUpdateState {
  isNew: boolean;
}

export class TaxUpdate extends React.Component<ITaxUpdateProps, ITaxUpdateState> {
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
      const { taxEntity } = this.props;
      const entity = {
        ...taxEntity,
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
    this.props.history.push('/entity/tax');
  };

  render() {
    const { taxEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="investamartApp.tax.home.createOrEditLabel">
              <Translate contentKey="investamartApp.tax.home.createOrEditLabel">Create or edit a Tax</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : taxEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="tax-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tax-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="taxCodeLabel" for="tax-taxCode">
                    <Translate contentKey="investamartApp.tax.taxCode">Tax Code</Translate>
                  </Label>
                  <AvField
                    id="tax-taxCode"
                    type="text"
                    name="taxCode"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="shortDescLabel" for="tax-shortDesc">
                    <Translate contentKey="investamartApp.tax.shortDesc">Short Desc</Translate>
                  </Label>
                  <AvField
                    id="tax-shortDesc"
                    type="text"
                    name="shortDesc"
                    validate={{
                      maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="longDescLabel" for="tax-longDesc">
                    <Translate contentKey="investamartApp.tax.longDesc">Long Desc</Translate>
                  </Label>
                  <AvField
                    id="tax-longDesc"
                    type="text"
                    name="longDesc"
                    validate={{
                      maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="tax-createSystemDate">
                    <Translate contentKey="investamartApp.tax.createSystemDate">Create System Date</Translate>
                  </Label>
                  <AvField id="tax-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="tax-createDate">
                    <Translate contentKey="investamartApp.tax.createDate">Create Date</Translate>
                  </Label>
                  <AvInput
                    id="tax-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.taxEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="tax-createUserId">
                    <Translate contentKey="investamartApp.tax.createUserId">Create User Id</Translate>
                  </Label>
                  <AvField id="tax-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="tax-lastModificationSystemDate">
                    <Translate contentKey="investamartApp.tax.lastModificationSystemDate">Last Modification System Date</Translate>
                  </Label>
                  <AvField id="tax-lastModificationSystemDate" type="date" className="form-control" name="lastModificationSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="tax-lastModificationDate">
                    <Translate contentKey="investamartApp.tax.lastModificationDate">Last Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="tax-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.taxEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="tax-lastModificationUserId">
                    <Translate contentKey="investamartApp.tax.lastModificationUserId">Last Modification User Id</Translate>
                  </Label>
                  <AvField id="tax-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tax" replace color="info">
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
  taxEntity: storeState.tax.entity,
  loading: storeState.tax.loading,
  updating: storeState.tax.updating,
  updateSuccess: storeState.tax.updateSuccess
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
)(TaxUpdate);
