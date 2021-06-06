import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import '../../themes/themes.scss';

const ListMenuHeader = ({ item }) => {
  return (
    <div className="my-2 pl-2 list-menu-header-container">
      <li>
        <Row>
          <Col className="list-menu-header-icon-container" xs={2}>
            <FontAwesomeIcon
              className="list-menu-header-icon"
              icon={item.icon}
            />
          </Col>

          <Col className="list-menu-header-label-container">
            <h4 className="m-0 ml-2 list-menu-header-label">{item.header}</h4>
          </Col>
        </Row>
      </li>
    </div>
  );
};

ListMenuHeader.propTypes = {
  item: propTypes.shape({
    color: propTypes.string,
    header: propTypes.string,
    icon: propTypes.string,
  }).isRequired,
};

export default ListMenuHeader;
