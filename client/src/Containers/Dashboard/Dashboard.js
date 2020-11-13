import { connect } from 'react-redux';
import Dashboard from '../../Components/Dashboard/Dashboard'


const mapStateToProps = (state) => ({
    userType: state.users.mode
})

const mapDispatchToProps = (dispatch) => ({

});

export default connect (mapStateToProps, mapDispatchToProps)(Dashboard);