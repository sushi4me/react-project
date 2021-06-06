import propTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import ListMenuHeader from './list-menu-header';
import ListMenuItem from './list-menu-item';

import {
  setLoading,
  setSidebar as _setSidebar,
} from '../../actions/sidebar-actions';
import '../../themes/themes.scss';

const mapStateToProps = state => ({
  nav: state.sidebar.nav,
});

const mapDispatchToProps = dispatch => ({
  setSidebar: payload => dispatch(_setSidebar(payload)),
});

const ListMenu = ({ children: customItem, nav: data, setSidebar }) => {
  // Initialize hook, default some nav for the sidebar
  useEffect(() => {
    const initialNavData = [
      {
        label: 'Applications',
        icon: 'lightbulb',
        children: [
          {
            label: 'Test',
            icon: 'cube',
            link: '/test',
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'cog',
        link: '/settings',
        children: [
          {
            label: 'User Settings',
            icon: 'user',
            link: '/user-settings',
          },
        ],
      },
    ];
    setSidebar(initialNavData);
  }, []);

  // Reducer for list-menu component
  const reducer = (state, action) => {
    switch (action.type) {
      case 'toggle-node': {
        if (state.openNodes.includes(action.key) && !action.expand) {
          return {
            ...state,
            openNodes: [
              ...state.openNodes.filter(key => !key.includes(action.key)),
            ],
          };
        }

        return {
          ...state,
          openNodes: Array.from(new Set(state.openNodes.concat(action.key))),
        };
      }
      case 'collapse-all':
        return { ...state, openNodes: [] };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, { openNodes: [] });
  const checkNode = key => state.openNodes.includes(key);
  const toggleNode = (key, expand) =>
    dispatch({ type: 'toggle-node', key, expand });

  return (
    <div className="list-menu-container">
      <ul className="m-0 p-0 list-menu">
        {customItem
          ? customItem({ checkNode, data, toggleNode })
          : data.map((item, index) => {
              if (item.header)
                return (
                  <ListMenuHeader
                    item={item}
                    key={`list-menu-header-${item.header}`}
                    listIndex={index}
                  />
                );
              return (
                <ListMenuItem
                  checkNode={checkNode}
                  item={item}
                  key={`list-menu-item-${item.label}`}
                  listIndex={index}
                  toggleNode={toggleNode}
                />
              );
            })}
      </ul>
    </div>
  );
};

ListMenu.propTypes = {
  children: propTypes.instanceOf(Object),
  nav: propTypes.arrayOf(propTypes.shape({})),
  setSidebar: propTypes.func.isRequired,
};

ListMenu.defaultProps = {
  children: null,
  nav: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu);
