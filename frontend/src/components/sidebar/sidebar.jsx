import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React, { useContext, useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../../theme-context';

import ListMenu from '../list-menu/list-menu';

import './sidebar.css';

const Sidebar = props => {
  const { contents, defaultClosed, shortcuts } = props;
  const { theme } = useContext(ThemeContext);
  const [isCollapsed, setCollapsed] = useState(defaultClosed);

  console.log(theme);

  // Reducer for list-menu component
  const reducer = (state, action) => {
    switch (action.type) {
      case 'edit-shortcuts': {
        return {
          ...state,
          shortcuts: action.shortcuts,
        };
      }
      case 'remove-shortcuts': {
        return {
          ...state,
          shortcuts: [],
        };
      }
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, { shortcuts: [] });
  const addShortcuts = nodes =>
    dispatch({ type: 'edit-shortcuts', shortcuts: nodes });

  return (
    <div
      className={`sidebar-container
        ${
          isCollapsed
            ? 'sidebar-container-collapsed'
            : 'sidebar-container-expand'
        }`}
      style={{ background: theme.secondary }}
    >
      <div className="sidebar-contents">
        <div className="sidebar-header">
          <h4 style={{ color: theme.text }}>Hello there!</h4>
        </div>

        <div className="mx-1 sidebar-body">{contents}</div>

        <div className="sidebar-footer">
          <small style={{ color: theme.text }}>Footer</small>
        </div>
      </div>

      <div className="sidebar-collapse" style={{ background: theme.primary }}>
        {isCollapsed && shortcuts}

        <Button
          className="sidebar-collapse-button"
          onClick={() => setCollapsed(!isCollapsed)}
        >
          <FontAwesomeIcon
            className={`sidebar-collapse-button-icon ${
              isCollapsed && 'sidebar-collapse-button-icon-rot'
            }`}
            icon="arrow-circle-left"
          />
        </Button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  contents: propTypes.instanceOf(Object),
  defaultClosed: propTypes.bool,
  shortcuts: propTypes.bool,
};

Sidebar.defaultProps = {
  contents: <ListMenu />,
  defaultClosed: false,
  shortcuts: false,
};

export default Sidebar;
