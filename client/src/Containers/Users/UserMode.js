import { connect } from 'react-redux';
import UserMode from '../../Components/Common/UserMode';

const mapStateToProps = (state) => ({
    user: state.users
});

const mapDispatchToProps = (dispatch) => ({
    switchMode: (mode) => {
        return dispatch({type: 'SWITCH_MODE', payload: { mode }});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMode);