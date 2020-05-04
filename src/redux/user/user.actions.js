import userActionTypes from './user.types';

export const requestUserUpdatesFromFirebase = () => ({
    type: userActionTypes.REQUEST_USER_UPDATES_FROM_FIREBASE
});

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const signIn = options => ({
    type: userActionTypes.SIGN_IN,
    payload: options
});

export const signOut = () => ({
    type: userActionTypes.SIGN_OUT
});