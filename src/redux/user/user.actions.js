export const userActionTypes = {
    setCurrentUser: 'SET_CURRENT_USER'
};

export const setCurrentUser = user => ({
    type: userActionTypes.setCurrentUser,
    payload: user
});