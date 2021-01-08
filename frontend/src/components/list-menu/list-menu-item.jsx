import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { v5 as uuidv5 } from 'uuid';

import { ThemeContext } from '../../theme-context';

import './list-menu-item.css';

const ListMenuItem = props => {
  const { checkNode, depth, item: itemArg, listIndex, toggleNode } = props;
  const [isHover, setHover] = useState(false);

  // Since prop-types are only shallow merges we do this to default theme colors
  const { theme } = useContext(ThemeContext);
  const item = {
    background: theme.accent,
    color: theme.text,
    ...itemArg,
  };

  // For checking with the menu reducer
  const itemKey = uuidv5(
    `menu-item-${depth}-${listIndex}-${item.label}`,
    uuidv5.URL,
  );
  const isOpen = checkNode(itemKey);

  return (
    <>
      <div
        className="list-menu-item-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor: isHover ? item.background : 'transparent',
        }}
      >
        <li className="list-menu-item">
          <Row>
            <Col
              className="list-menu-item-icon"
              md={2}
              style={{ paddingLeft: `${(depth + 1) * 1}rem` }}
            >
              <FontAwesomeIcon color={item.color} icon={item.icon} />
            </Col>

            <Col className="ml-1 list-menu-item-label">
              <p
                className="list-menu-item-label-text"
                style={{ color: item.color }}
              >
                {item.label}
              </p>
            </Col>

            {item.children && (
              <Col className="pr-1" md={3}>
                <Button
                  className="px-1 list-menu-item-icon"
                  onClick={() => toggleNode(itemKey, !isOpen)}
                >
                  <FontAwesomeIcon
                    className={`${
                      isOpen
                        ? 'list-menu-item-icon-open'
                        : 'list-menu-item-icon-closed'
                    }`}
                    color={item.color}
                    icon="chevron-circle-left"
                  />
                </Button>
              </Col>
            )}
          </Row>
        </li>
      </div>

      {item.children && (
        <div
          className={`${
            isOpen
              ? 'expanded list-menu-item-subnav-open'
              : 'closed list-menu-item-subnav-closed'
          }`}
        >
          {item.children.map((subItem, index) => {
            return (
              <ListMenuItem
                checkNode={checkNode}
                depth={depth + 1}
                item={subItem}
                key={`list-menu-item-${subItem.label}`}
                listIndex={index}
                toggleNode={toggleNode}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

ListMenuItem.propTypes = {
  checkNode: propTypes.func.isRequired,
  depth: propTypes.number,
  item: propTypes.shape({
    background: propTypes.string,
    children: propTypes.arrayOf(propTypes.shape({})),
    color: propTypes.string,
    icon: propTypes.string,
    label: propTypes.string,
    link: propTypes.string,
  }).isRequired,
  listIndex: propTypes.bool.isRequired,
  toggleNode: propTypes.func.isRequired,
};

ListMenuItem.defaultProps = {
  depth: 0,
};

export default ListMenuItem;
