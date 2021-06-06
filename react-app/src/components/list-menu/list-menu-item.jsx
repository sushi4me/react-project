import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { v5 as uuidv5 } from 'uuid';

import '../../themes/themes.scss';

const ConditionalWrapper = ({
  children,
  conditional,
  defaultComponent,
  wrapper,
}) => {
  console.log('conditional', conditional ? 'yes' : 'no');
  return conditional ? wrapper(children) : defaultComponent(children);
};

const ListMenuItem = ({ checkNode, depth, item, listIndex, toggleNode }) => {
  // For checking with the menu reducer
  const itemKey = uuidv5(
    `menu-item-${depth}-${listIndex}-${item.label}`,
    uuidv5.URL,
  );
  const isOpen = checkNode(itemKey);

  return (
    <>
      <ConditionalWrapper
        conditional={item.link}
        defaultComponent={children => (
          <Button
            className="list-menu-item-container"
            onClick={() => toggleNode(itemKey, !isOpen)}
          >
            {children}
          </Button>
        )}
        wrapper={children => (
          <div className="list-menu-item-container">{children}</div>
        )}
      >
        <Row className="list-menu-item">
          <ConditionalWrapper
            conditional={item.link}
            defaultComponent={children => <>{children}</>}
            wrapper={children => (
              <Col>
                <Link className="list-menu-item-link" to={item.link}>
                  {children}
                </Link>
              </Col>
            )}
          >
            <Col
              className="list-menu-item-icon"
              sm={1}
              style={{ paddingLeft: `${(depth + 1) * 1}rem` }}
            >
              <FontAwesomeIcon icon={item.icon} />
            </Col>

            <Col className="list-menu-item-label">
              <p
                className={`pl-2 ${
                  item.link
                    ? 'list-menu-item-label-link'
                    : 'list-menu-item-label-text'
                }`}
              >
                {item.label}
              </p>
            </Col>
          </ConditionalWrapper>

          {item.children && (
            <Col
              className="list-menu-item-icon"
              sm={1}
              onClick={() => item.link && toggleNode(itemKey, !isOpen)}
            >
              <FontAwesomeIcon
                className={`${
                  isOpen
                    ? 'list-menu-item-icon-open'
                    : 'list-menu-item-icon-closed'
                }`}
                icon="caret-left"
              />
            </Col>
          )}
        </Row>
      </ConditionalWrapper>

      {isOpen && item.children && (
        <div
          className={`${
            isOpen
              ? 'list-menu-item-subnav-open'
              : 'list-menu-item-subnav-closed'
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
  listIndex: propTypes.number.isRequired,
  toggleNode: propTypes.func.isRequired,
};

ListMenuItem.defaultProps = {
  depth: 0,
};

export default ListMenuItem;
