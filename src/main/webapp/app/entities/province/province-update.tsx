import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { getEntity, updateEntity, createEntity, reset } from './province.reducer';
import { IProvince } from 'app/shared/model/province.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProvinceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProvinceUpdateState {
  isNew: boolean;
  countryId: string;
}

export class ProvinceUpdate extends React.Component<IProvinceUpdateProps, IProvinceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      countryId: '0',
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

    this.props.getCountries();
  }

  saveEntity = (event, errors, values) => {
    values.createDate = convertDateTimeToServer(values.createDate);
    values.lastModificationDate = convertDateTimeToServer(values.lastModificationDate);

    if (errors.length === 0) {
      const { provinceEntity } = this.props;
      const entity = {
        ...provinceEntity,
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
    this.props.history.push('/entity/province');
  };

  render() {
    const { provinceEntity, countries, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="investamartApp.province.home.createOrEditLabel">
              <Translate contentKey="investamartApp.province.home.createOrEditLabel">Create or edit a Province</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : provinceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="province-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="province-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="provinceCodeLabel" for="province-provinceCode">
                    <Translate contentKey="investamartApp.province.provinceCode">Province Code</Translate>
                  </Label>
                  <AvField
                    id="province-provinceCode"
                    type="text"
                    name="provinceCode"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="provinceNameLabel" for="province-provinceName">
                    <Translate contentKey="investamartApp.province.provinceName">Province Name</Translate>
                  </Label>
                  <AvField
                    id="province-provinceName"
                    type="text"
                    name="provinceName"
                    validate={{
                      maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="province-createSystemDate">
                    <Translate contentKey="investamartApp.province.createSystemDate">Create System Date</Translate>
                  </Label>
                  <AvField id="province-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="province-createDate">
                    <Translate contentKey="investamartApp.province.createDate">Create Date</Translate>
                  </Label>
                  <AvInput
                    id="province-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.provinceEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="province-createUserId">
                    <Translate contentKey="investamartApp.province.createUserId">Create User Id</Translate>
                  </Label>
                  <AvField id="province-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="province-lastModificationSystemDate">
                    <Translate contentKey="investamartApp.province.lastModificationSystemDate">Last Modification System Date</Translate>
                  </Label>
                  <AvField
                    id="province-lastModificationSystemDate"
                    type="date"
                    className="form-control"
                    name="lastModificationSystemDate"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="province-lastModificationDate">
                    <Translate contentKey="investamartApp.province.lastModificationDate">Last Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="province-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.provinceEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="province-lastModificationUserId">
                    <Translate contentKey="investamartApp.province.lastModificationUserId">Last Modification User Id</Translate>
                  </Label>
                  <AvField id="province-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <AvGroup>
                  <Label for="province-country">
                    <Translate contentKey="investamartApp.province.country">Country</Translate>
                  </Label>
                  <AvInput id="province-country" type="select" className="form-control" name="countryId">
                    <option value="" key="0" />
                    {countries
                      ? countries.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/province" replace color="info">
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
  countries: storeState.country.entities,
  provinceEntity: storeState.province.entity,
  loading: storeState.province.loading,
  updating: storeState.province.updating,
  updateSuccess: storeState.province.updateSuccess
});

const mapDispatchToProps = {
  getCountries,
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
)(ProvinceUpdate);
