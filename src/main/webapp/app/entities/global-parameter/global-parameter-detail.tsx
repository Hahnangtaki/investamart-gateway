import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './global-parameter.reducer';
import { IGlobalParameter } from 'app/shared/model/global-parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGlobalParameterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class GlobalParameterDetail extends React.Component<IGlobalParameterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { globalParameterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.globalParameter.detail.title">GlobalParameter</Translate> [
            <b>{globalParameterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="paramCode">
                <Translate contentKey="investamartApp.globalParameter.paramCode">Param Code</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.paramCode}</dd>
            <dt>
              <span id="paramName">
                <Translate contentKey="investamartApp.globalParameter.paramName">Param Name</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.paramName}</dd>
            <dt>
              <span id="paramType">
                <Translate contentKey="investamartApp.globalParameter.paramType">Param Type</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.paramType}</dd>
            <dt>
              <span id="intValue">
                <Translate contentKey="investamartApp.globalParameter.intValue">Int Value</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.intValue}</dd>
            <dt>
              <span id="floatValue">
                <Translate contentKey="investamartApp.globalParameter.floatValue">Float Value</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.floatValue}</dd>
            <dt>
              <span id="stringValue">
                <Translate contentKey="investamartApp.globalParameter.stringValue">String Value</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.stringValue}</dd>
            <dt>
              <span id="dateValue">
                <Translate contentKey="investamartApp.globalParameter.dateValue">Date Value</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.dateValue} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="show">
                <Translate contentKey="investamartApp.globalParameter.show">Show</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.show ? 'true' : 'false'}</dd>
            <dt>
              <span id="edit">
                <Translate contentKey="investamartApp.globalParameter.edit">Edit</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.edit ? 'true' : 'false'}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.globalParameter.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.globalParameter.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.globalParameter.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.globalParameter.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.globalParameter.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.globalParameter.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/global-parameter" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/global-parameter/${globalParameterEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ globalParameter }: IRootState) => ({
  globalParameterEntity: globalParameter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalParameterDetail);
