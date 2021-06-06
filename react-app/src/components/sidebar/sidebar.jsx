import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import ListMenu from '../list-menu/list-menu';

import '../../themes/themes.scss';

const Sidebar = ({ children: contents, data, defaultClosed, shortcuts }) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultClosed);

  const renderContents = sidebarContents => {
    switch (typeof sidebarContents) {
      case 'function':
        return sidebarContents({ data });
      case 'object':
        return sidebarContents;
      default:
        throw new Error('Invalid Sidebar children prop');
    }
  };

  return (
    <div
      className={`sidebar-container
        ${
          isCollapsed
            ? 'sidebar-container-collapsed'
            : 'sidebar-container-expand'
        }`}
    >
      <div className="sidebar-contents">
        <div className="sidebar-header">
          <h4>Header</h4>
        </div>

        <div className="mx-1 sidebar-body">{renderContents(contents)}</div>

        <div className="sidebar-footer">
          <small>Footer</small>
        </div>
      </div>

      <div className="sidebar-collapse">
        <Button
          className="sidebar-collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FontAwesomeIcon
            className={`sidebar-collapse-button-icon ${
              isCollapsed && 'sidebar-collapse-button-icon-rot'
            }`}
            icon="caret-left"
          />
        </Button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  children: propTypes.instanceOf(Object),
  // eslint-disable-next-line react/forbid-prop-types
  data: propTypes.any,
  defaultClosed: propTypes.bool,
  shortcuts: propTypes.bool,
};

Sidebar.defaultProps = {
  children: <ListMenu />,
  data: null,
  defaultClosed: false,
  shortcuts: false,
};

export default Sidebar;
