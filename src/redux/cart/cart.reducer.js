import cartActionTypes from './cart.types';

const initialState = {
    headerDropdownHidden: true
};

const cartReducer = (state = initialState, action ) => {
    switch(action.type){
        case cartActionTypes.TOGGLE_HEADER_DROPDOWN_HIDDEN:
            return {
                ...state,
                headerDropdownHidden: !state.headerDropdownHidden
            }
        default:
            return state;
    }
}

export default cartReducer;