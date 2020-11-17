import { connect } from 'react-redux';
import Channel from '../../../Components/Dashboard/ChannelsList/Channel';
import checkBot from '../../../Helpers/Channels/CheckBotPresence';

const getItem = (channels, id) => {
    return channels.find(item => item.id === id);
}

const mapStateToProps = (state, { id }, modal, setModalState) => ({
    item: getItem(state.channels, id), 
    modal: modal,
    setModalState: setModalState
});

const mapDispatchToProps = dispatch => ({
    checkBot: (channel) => {
        return checkBot(channel)
    }
})


export default connect (mapStateToProps, mapDispatchToProps)(Channel);