import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { ThemeContext } from '../../theme-context';

import './list-menu-header.css';

const ListMenuHeader = props => {
  const { item: itemArg } = props;

  // Since prop-types are only shallow merges we do this to default theme colors
  const { theme } = useContext(ThemeContext);
  const item = {
    color: theme.text,
    ...itemArg,
  };

  return (
    <div className="m-2 p-1 list-menu-header-container">
      <li>
        <Row>
          <Col className="list-menu-header-icon" xs={2}>
            <FontAwesomeIcon color={item.color} icon={item.icon} />
          </Col>

          <Col className="ml-2 list-menu-header-label">
            <h4 className="m-0" style={{ color: item.color }}>
              {item.header}
            </h4>
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
