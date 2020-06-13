import loadingActionTypes from './loading.types';

export const setLoading = value => ({
    type: loadingActionTypes.SET_LOADING,
    payload: value
});