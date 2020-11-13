import { GET_CHANNELS } from '../Constants/Channels';

const initialState = [];

export default function channels (state = initialState, {type, payload}) {
    switch (type) {
        case 'GET_CHANNELS': {
            return [...payload]; 
            break;
        }
        default: {
            return state
        }
    }

}