import mainMenuReducer from './main-menu.reducer';


describe('User Reducer', () => {


    it( 'should return the initial/constant State if no state is set' , () => {
        const outputState = mainMenuReducer(undefined,{});

        expect(outputState).toBeTruthy();

        const outputSections = outputState.sections;
        expect(outputSections).toBeTruthy();
        expect(outputSections.length).toBe(5);
        ['hats', 'jackets', 'sneakers', 'womens', 'mens'].forEach(
            (title, idx) => expect(outputSections[idx].title).toEqual(title)
        );
    });


    it( 'should always return the input state regarless on the action' , () => {
        expect( mainMenuReducer(null,{}) ).toEqual(null);

        const randomState = {
            random: true,
            sections: ['1', '2', '3']
        };

        let outputState = mainMenuReducer( randomState, { type: 'UNKOWN_ACTION' })
        expect( outputState ).toEqual(randomState);

        outputState = mainMenuReducer(
            randomState,
            {
             type: 'ANOTHER_UNKOWN_ACTION',
             payload: "useless payload"
            }
        );
        expect(outputState).toEqual(randomState);
    });


});