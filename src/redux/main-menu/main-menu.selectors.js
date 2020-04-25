import { createSelector } from "reselect";

const selectMainMenu = state => state.mainMenu;

export const selectSections = createSelector(
    [selectMainMenu],
    mainMenu => mainMenu.sections
);