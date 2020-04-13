import { userActionTypes } from './user.actions';

const initialState = {
    currentUser: null
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case userActionTypes.setCurrentUser:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;