import { combineReducers } from 'redux';
import sidebar from './reducers/sidebar-reducer';
import viewer from './reducers/viewer-reducer';

export default combineReducers({ sidebar, viewer });
