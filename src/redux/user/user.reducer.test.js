import userReducer from './user.reducer';
import { requestUserUpdatesFromFirebase, signUp, signIn, signOut, setCurrentUser } from './user.actions';

const initialState = {
    currentUser: null
};

const userReducerWithNoState = action => userReducer(undefined, action);

describe('User Reducer', () => {


    beforeEach( () => {
        initialState.currentUser = null;
    });


    it( 'should return the initialState if no state is set and the action is not valid' , () => {
        expect( userReducerWithNoState({}) ).toEqual(initialState);

        expect( userReducerWithNoState({
            action: 'UNKOWN_ACTION'
        })).toEqual(initialState);

        expect( userReducerWithNoState({
            action: 'ANOTHER_UNKOWN_ACTION',
            payload: "useless payload"
        })).toEqual(initialState);
    });


    it( 'should update the state on setCurrentUser' , () => {
        const jestTestUser = {
            "id": "123abc",
            "email": "testuser.test@test.test",
            "createdAt": {
              "seconds": 123,
              "nanoseconds": 456
            },
            "displayName": "JestTest User"
        };

        const updatedState = userReducerWithNoState(setCurrentUser(jestTestUser));

        expect( updatedState ).toEqual({
            currentUser: jestTestUser
        });

        const anotherJestTestUser = {
            "id": "890abc",
            "email": "test.user.test@com",
            "createdAt": {
              "seconds": 890,
              "nanoseconds": 890
            },
            "displayName": "Jest-Test"
        };

        const newUpdatedState = userReducer(
            updatedState,
            setCurrentUser(anotherJestTestUser)
        );

        expect(newUpdatedState).toEqual({
            currentUser: anotherJestTestUser
        });
    });


    it( 'should ignore the saga-only actions' , () => {
        initialState.currentUser = {
                "id": "890abc",
                "email": "john@email.test.co.uk",
                "createdAt": {
                    "seconds": 111,
                    "nanoseconds": 222
                },
                "displayName": "John Test"
        };
        let updatedState;

        updatedState = userReducer(initialState,requestUserUpdatesFromFirebase());
        expect(updatedState).toEqual(initialState);

        const signUpData = {
            displayName: "Jest React Test User",
            email: "jesttestuser@react.test",
            password: "password",
            confirmPassword: "passWord"
        };
        updatedState = userReducer(initialState,signUp(signUpData));
        expect(updatedState).toEqual(initialState);

        const signInOptions = { 
            withEmailAndPassword: {
                email: "jesttestuser@react.test",
                password: "password"
            }
        };
        updatedState = userReducer(initialState,signIn(signInOptions));
        expect(updatedState).toEqual(initialState);

        updatedState = userReducer(initialState,signOut());
        expect(updatedState).toEqual(initialState);
    });


});