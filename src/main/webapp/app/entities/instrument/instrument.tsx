import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './instrument.reducer';
import { IInstrument } from 'app/shared/model/instrument.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInstrumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Instrument extends React.Component<IInstrumentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { instrumentList, match } = this.props;
    return (
      <div>
        <h2 id="instrument-heading">
          <Translate contentKey="investamartApp.instrument.home.title">Instruments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="investamartApp.instrument.home.createLabel">Create a new Instrument</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {instrumentList && instrumentList.length > 0 ? (
            <Table responsive aria-describedby="instrument-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.instrumentCode">Instrument Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.instrumentType">Instrument Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.instrumentShortCode">Instrument Short Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.instrumentName">Instrument Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.price">Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.priceDate">Price Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.haircut">Haircut</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.haricutDate">Haricut Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.createSystemDate">Create System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.createDate">Create Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.createUserId">Create User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.lastModificationSystemDate">Last Modification System Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.lastModificationDate">Last Modification Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.lastModificationUserId">Last Modification User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="investamartApp.instrument.currency">Currency</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {instrumentList.map((instrument, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${instrument.id}`} color="link" size="sm">
                        {instrument.id}
                      </Button>
                    </td>
                    <td>{instrument.instrumentCode}</td>
                    <td>{instrument.instrumentType}</td>
                    <td>{instrument.instrumentShortCode}</td>
                    <td>{instrument.instrumentName}</td>
                    <td>{instrument.price}</td>
                    <td>
                      <TextFormat type="date" value={instrument.priceDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{instrument.haircut}</td>
                    <td>
                      <TextFormat type="date" value={instrument.haricutDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={instrument.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={instrument.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{instrument.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={instrument.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={instrument.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{instrument.lastModificationUserId}</td>
                    <td>{instrument.currencyId ? <Link to={`currency/${instrument.currencyId}`}>{instrument.currencyId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${instrument.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${instrument.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${instrument.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="investamartApp.instrument.home.notFound">No Instruments found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ instrument }: IRootState) => ({
  instrumentList: instrument.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instrument);
