import cartReducer from './cart.reducer';
import { toggleHeaderDropdownHidden, addItem, removeItem, clearItem, clearAllItems } from './cart.actions';

const initialState = {
    headerDropdownHidden: true,
    items: []
};

const blueJacket = {
    "imageUrl": "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
    "price": 90,
    "name": "Blue Jean Jacket",
    "id": 19,
    "quantity": 1
};

const timberlands = {
    "imageUrl": "https://i.ibb.co/Mhh6wBg/timberlands.png",
    "price": 200,
    "name": "Timberlands",
    "id": 17,
    "quantity": 1
};

const pinkTshirt = {
    "imageUrl": "https://i.ibb.co/RvwnBL8/pink-shirt.png",
    "price": 25,
    "name": "Pink T-shirt",
    "id": 33,
    "quantity": 1
};

const cartReducerWithNoState = action => cartReducer(undefined, action);

describe('Cart Reducer', () => {


    beforeEach( () => {
        initialState.headerDropdownHidden = true;
        initialState.items = [];
    });


    it( 'should return the initialState if no state is set and the action is not valid' , () => {
        expect( cartReducerWithNoState({}) ).toEqual(initialState);

        expect( cartReducerWithNoState({
            type: 'UNKOWN_ACTION'
        })).toEqual(initialState);

        expect( cartReducerWithNoState({
            type: 'ANOTHER_UNKOWN_ACTION',
            payload: "useless payload"
        })).toEqual(initialState);
    });


    it( 'should toggle the headerDropdownHidden value on toggleHeaderDropdownHidden' , () => {
        let updatedState = cartReducer(initialState, toggleHeaderDropdownHidden() );
        expect(updatedState.headerDropdownHidden).toBe(false);
        updatedState = cartReducer(updatedState, toggleHeaderDropdownHidden() );
        expect(updatedState.headerDropdownHidden).toBe(true);
    });


    it( 'should update the itmes array accordingly on addItem' , () => {
        let updatedState = cartReducerWithNoState(addItem(blueJacket));
        expect(updatedState.items).toEqual([blueJacket]);

        updatedState = cartReducer(updatedState,addItem(timberlands));
        expect(updatedState.items).toEqual([blueJacket, timberlands]);

        updatedState = cartReducer(updatedState,addItem(blueJacket));
        expect(updatedState.items).toEqual([
            { ...blueJacket, quantity: 2 },
            timberlands
        ]);

        updatedState = cartReducer(updatedState,addItem(timberlands));
        updatedState = cartReducer(updatedState,addItem(timberlands));
        expect(updatedState.items).toEqual([
            { ...blueJacket, quantity: 2 },
            { ...timberlands, quantity: 3 }
        ]);
    });


    it( 'should update the itmes array accordingly on removeItem' , () => {
        initialState.items = [
            { ...blueJacket , quantity: 5 },
            { ...timberlands },
            { ...pinkTshirt , quantity: 3 }
        ];

        let updatedState = cartReducer(initialState,removeItem(blueJacket));
        expect(updatedState.items).toEqual([
            { ...blueJacket , quantity: 4 },
            { ...timberlands },
            { ...pinkTshirt , quantity: 3 }
        ]);

        updatedState = cartReducer(updatedState,removeItem(pinkTshirt));
        updatedState = cartReducer(updatedState,removeItem(pinkTshirt));
        expect(updatedState.items).toEqual([
            { ...blueJacket , quantity: 4 },
            { ...timberlands },
            { ...pinkTshirt }
        ]);

        updatedState = cartReducer(updatedState,removeItem(timberlands));
        expect(updatedState.items).toEqual([
            { ...blueJacket , quantity: 4 },
            { ...pinkTshirt }
        ]);
    });


    it( 'should update the itmes array accordingly on clearItem' , () => {
        initialState.items = [
            { ...blueJacket , quantity: 7 },
            { ...pinkTshirt , quantity: 3 },
            { ...timberlands, quantity: 5 }
        ];

        let updatedState = cartReducer(initialState,clearItem(pinkTshirt));
        expect(updatedState.items).toEqual([
            { ...blueJacket , quantity: 7 },
            { ...timberlands, quantity: 5 }
        ]);

        updatedState = cartReducer(updatedState,clearItem(pinkTshirt));
        expect(updatedState.items).toEqual([
            { ...blueJacket , quantity: 7 },
            { ...timberlands, quantity: 5 }
        ]);

        updatedState = cartReducer(updatedState,clearItem(timberlands));
        expect(updatedState.items).toEqual([
            { ...blueJacket , quantity: 7 }
        ]);

        updatedState = cartReducer(updatedState,clearItem(blueJacket));
        expect(updatedState.items).toEqual([]);

        updatedState = cartReducer(updatedState,clearItem(timberlands));
        expect(updatedState.items).toEqual([]);
    });


    it( 'should update the state on clearAllItems' , () => {
        initialState.items = [
            { ...blueJacket , quantity: 7 },
            { ...pinkTshirt , quantity: 3 },
            { ...timberlands, quantity: 5 }
        ];

        let updatedState = cartReducer(initialState,clearAllItems());
        expect(updatedState.items).toEqual([]);

        updatedState = cartReducer(updatedState,clearAllItems());
        expect(updatedState.items).toEqual([]);
    });


});