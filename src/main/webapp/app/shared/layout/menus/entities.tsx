import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/global-parameter">
      <Translate contentKey="global.menu.entities.globalParameter" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/currency">
      <Translate contentKey="global.menu.entities.currency" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/instrument">
      <Translate contentKey="global.menu.entities.instrument" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/city">
      <Translate contentKey="global.menu.entities.city" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/province">
      <Translate contentKey="global.menu.entities.province" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/tax">
      <Translate contentKey="global.menu.entities.tax" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/bank">
      <Translate contentKey="global.menu.entities.bank" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/custody">
      <Translate contentKey="global.menu.entities.custody" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/manager-investasi">
      <Translate contentKey="global.menu.entities.managerInvestasi" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
