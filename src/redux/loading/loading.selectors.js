import { createSelector } from 'reselect';

const selectLoadingState = state => state.loading;

export const selectLoading = createSelector(
    [selectLoadingState],
    loadingState => loadingState.loading
);
