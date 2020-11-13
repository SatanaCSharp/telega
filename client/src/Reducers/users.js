const initialState = {
    mode: 'true'
};

export default function users (state = initialState, { type, payload }) {
    switch ( type ) {
        case 'SWITCH_MODE' : {
            return {...payload}
            break;
        }
        default: {
            return state
        }
    }
}

