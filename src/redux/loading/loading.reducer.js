import loadingActionTypes from './loading.types';

const initialState = {
    loading: false
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case loadingActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;