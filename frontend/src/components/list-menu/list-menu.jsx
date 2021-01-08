import propTypes from 'prop-types';
import React, { useReducer } from 'react';

import ListMenuHeader from './list-menu-header';
import ListMenuItem from './list-menu-item';

import './list-menu.css';

const ListMenu = props => {
  const { children: customItem, data } = props;

  // Returns all nodes which have a link and shortcut flag
  const getShortcuts = nodes => {
    const shortcutNodes = [];

    nodes.forEach(node => {
      if (node.link && node.shortcut) shortcutNodes.push(node);

      // eslint-disable-next-line no-unused-vars
      if (node.children) shortcutNodes.push(...getShortcuts(node.children));
    });

    return shortcutNodes;
  };

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
  const collapseAll = () => dispatch({ type: 'collapse-all' });

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
  data: propTypes.arrayOf(propTypes.shape({})),
};

ListMenu.defaultProps = {
  children: null,
  data: [
    { header: 'This is a label', icon: 'bars' },
    {
      icon: 'coffee',
      label: 'Label 01',
      link: '/link',
      children: [
        {
          icon: 'robot',
          label: 'I am a super long label!',
          link: '/child',
          children: [
            {
              icon: 'gift',
              label: 'Grandchild 01',
              link: '/grandchild',
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
            {
              icon: 'gift',
              label: 'Super long label that will surely get clamped',
              link: '/superlong',
              shortcut: true,
            },
          ],
        },
      ],
    },
    {
      icon: 'coffee',
      label: 'Label 02',
      link: '/link',
      children: [
        {
          icon: 'robot',
          label: 'Child 02',
          link: '/child',
          children: [
            {
              icon: 'gift',
              label: 'Grandchild 01',
              link: '/grandchild',
            },
          ],
        },
      ],
    },
  ],
};

export default ListMenu;
