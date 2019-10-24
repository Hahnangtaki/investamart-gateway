import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProvince } from 'app/shared/model/province.model';
import { getEntities as getProvinces } from 'app/entities/province/province.reducer';
import { getEntity, updateEntity, createEntity, reset } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICityUpdateState {
  isNew: boolean;
  provinceId: string;
}

export class CityUpdate extends React.Component<ICityUpdateProps, ICityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      provinceId: '0',
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

    this.props.getProvinces();
  }

  saveEntity = (event, errors, values) => {
    values.createDate = convertDateTimeToServer(values.createDate);
    values.lastModificationDate = convertDateTimeToServer(values.lastModificationDate);

    if (errors.length === 0) {
      const { cityEntity } = this.props;
      const entity = {
        ...cityEntity,
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
    this.props.history.push('/entity/city');
  };

  render() {
    const { cityEntity, provinces, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="investamartApp.city.home.createOrEditLabel">
              <Translate contentKey="investamartApp.city.home.createOrEditLabel">Create or edit a City</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="city-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="city-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="cityCodeLabel" for="city-cityCode">
                    <Translate contentKey="investamartApp.city.cityCode">City Code</Translate>
                  </Label>
                  <AvField
                    id="city-cityCode"
                    type="text"
                    name="cityCode"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cityNameLabel" for="city-cityName">
                    <Translate contentKey="investamartApp.city.cityName">City Name</Translate>
                  </Label>
                  <AvField
                    id="city-cityName"
                    type="text"
                    name="cityName"
                    validate={{
                      maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="city-createSystemDate">
                    <Translate contentKey="investamartApp.city.createSystemDate">Create System Date</Translate>
                  </Label>
                  <AvField id="city-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="city-createDate">
                    <Translate contentKey="investamartApp.city.createDate">Create Date</Translate>
                  </Label>
                  <AvInput
                    id="city-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.cityEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="city-createUserId">
                    <Translate contentKey="investamartApp.city.createUserId">Create User Id</Translate>
                  </Label>
                  <AvField id="city-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="city-lastModificationSystemDate">
                    <Translate contentKey="investamartApp.city.lastModificationSystemDate">Last Modification System Date</Translate>
                  </Label>
                  <AvField id="city-lastModificationSystemDate" type="date" className="form-control" name="lastModificationSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="city-lastModificationDate">
                    <Translate contentKey="investamartApp.city.lastModificationDate">Last Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="city-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.cityEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="city-lastModificationUserId">
                    <Translate contentKey="investamartApp.city.lastModificationUserId">Last Modification User Id</Translate>
                  </Label>
                  <AvField id="city-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <AvGroup>
                  <Label for="city-province">
                    <Translate contentKey="investamartApp.city.province">Province</Translate>
                  </Label>
                  <AvInput id="city-province" type="select" className="form-control" name="provinceId">
                    <option value="" key="0" />
                    {provinces
                      ? provinces.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/city" replace color="info">
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
  provinces: storeState.province.entities,
  cityEntity: storeState.city.entity,
  loading: storeState.city.loading,
  updating: storeState.city.updating,
  updateSuccess: storeState.city.updateSuccess
});

const mapDispatchToProps = {
  getProvinces,
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
)(CityUpdate);
