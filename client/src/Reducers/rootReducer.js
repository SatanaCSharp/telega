import { combineReducers } from 'redux';
import channels from '../Reducers/channels';
import users from '../Reducers/users';

export default combineReducers({
    channels,
    users
});