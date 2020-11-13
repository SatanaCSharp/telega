import { GET_CHANNELS } from '../Constants/Channels';


export const getChannels = (channels) => ({
    type: GET_CHANNELS,
    payload: channels
})