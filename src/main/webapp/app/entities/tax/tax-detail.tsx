import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tax.reducer';
import { ITax } from 'app/shared/model/tax.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaxDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TaxDetail extends React.Component<ITaxDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { taxEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="investamartApp.tax.detail.title">Tax</Translate> [<b>{taxEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="taxCode">
                <Translate contentKey="investamartApp.tax.taxCode">Tax Code</Translate>
              </span>
            </dt>
            <dd>{taxEntity.taxCode}</dd>
            <dt>
              <span id="shortDesc">
                <Translate contentKey="investamartApp.tax.shortDesc">Short Desc</Translate>
              </span>
            </dt>
            <dd>{taxEntity.shortDesc}</dd>
            <dt>
              <span id="longDesc">
                <Translate contentKey="investamartApp.tax.longDesc">Long Desc</Translate>
              </span>
            </dt>
            <dd>{taxEntity.longDesc}</dd>
            <dt>
              <span id="createSystemDate">
                <Translate contentKey="investamartApp.tax.createSystemDate">Create System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">
                <Translate contentKey="investamartApp.tax.createDate">Create Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">
                <Translate contentKey="investamartApp.tax.createUserId">Create User Id</Translate>
              </span>
            </dt>
            <dd>{taxEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">
                <Translate contentKey="investamartApp.tax.lastModificationSystemDate">Last Modification System Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">
                <Translate contentKey="investamartApp.tax.lastModificationDate">Last Modification Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">
                <Translate contentKey="investamartApp.tax.lastModificationUserId">Last Modification User Id</Translate>
              </span>
            </dt>
            <dd>{taxEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/tax" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tax/${taxEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tax }: IRootState) => ({
  taxEntity: tax.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxDetail);
