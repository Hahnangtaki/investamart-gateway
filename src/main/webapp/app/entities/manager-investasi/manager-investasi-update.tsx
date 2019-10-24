import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './manager-investasi.reducer';
import { IManagerInvestasi } from 'app/shared/model/manager-investasi.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IManagerInvestasiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IManagerInvestasiUpdateState {
  isNew: boolean;
}

export class ManagerInvestasiUpdate extends React.Component<IManagerInvestasiUpdateProps, IManagerInvestasiUpdateState> {
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
      const { managerInvestasiEntity } = this.props;
      const entity = {
        ...managerInvestasiEntity,
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
    this.props.history.push('/entity/manager-investasi');
  };

  render() {
    const { managerInvestasiEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="investamartApp.managerInvestasi.home.createOrEditLabel">
              <Translate contentKey="investamartApp.managerInvestasi.home.createOrEditLabel">Create or edit a ManagerInvestasi</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : managerInvestasiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="manager-investasi-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="manager-investasi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="miCodeLabel" for="manager-investasi-miCode">
                    <Translate contentKey="investamartApp.managerInvestasi.miCode">Mi Code</Translate>
                  </Label>
                  <AvField
                    id="manager-investasi-miCode"
                    type="text"
                    name="miCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="miNameLabel" for="manager-investasi-miName">
                    <Translate contentKey="investamartApp.managerInvestasi.miName">Mi Name</Translate>
                  </Label>
                  <AvField
                    id="manager-investasi-miName"
                    type="text"
                    name="miName"
                    validate={{
                      maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="manager-investasi-createSystemDate">
                    <Translate contentKey="investamartApp.managerInvestasi.createSystemDate">Create System Date</Translate>
                  </Label>
                  <AvField id="manager-investasi-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="manager-investasi-createDate">
                    <Translate contentKey="investamartApp.managerInvestasi.createDate">Create Date</Translate>
                  </Label>
                  <AvInput
                    id="manager-investasi-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.managerInvestasiEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="manager-investasi-createUserId">
                    <Translate contentKey="investamartApp.managerInvestasi.createUserId">Create User Id</Translate>
                  </Label>
                  <AvField id="manager-investasi-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="manager-investasi-lastModificationSystemDate">
                    <Translate contentKey="investamartApp.managerInvestasi.lastModificationSystemDate">
                      Last Modification System Date
                    </Translate>
                  </Label>
                  <AvField
                    id="manager-investasi-lastModificationSystemDate"
                    type="date"
                    className="form-control"
                    name="lastModificationSystemDate"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="manager-investasi-lastModificationDate">
                    <Translate contentKey="investamartApp.managerInvestasi.lastModificationDate">Last Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="manager-investasi-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.managerInvestasiEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="manager-investasi-lastModificationUserId">
                    <Translate contentKey="investamartApp.managerInvestasi.lastModificationUserId">Last Modification User Id</Translate>
                  </Label>
                  <AvField
                    id="manager-investasi-lastModificationUserId"
                    type="string"
                    className="form-control"
                    name="lastModificationUserId"
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/manager-investasi" replace color="info">
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
  managerInvestasiEntity: storeState.managerInvestasi.entity,
  loading: storeState.managerInvestasi.loading,
  updating: storeState.managerInvestasi.updating,
  updateSuccess: storeState.managerInvestasi.updateSuccess
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
)(ManagerInvestasiUpdate);
