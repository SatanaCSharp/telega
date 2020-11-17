import { connect } from 'react-redux';
import ChannelsList from '../../../Components/Dashboard/ChannelsList/ChannelsList';
import getChannels from '../../../Helpers/Users/GetFullChannel';

const mapStateToProps = (state) => ({
    channels: state.channels
});

const mapDispatchToProps = (dispatch) => ({
    getAllChannels: () => {
        getChannels().then(channels => Promise.all(channels).then(channels => dispatch({type:'GET_CHANNELS', payload:channels})));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);