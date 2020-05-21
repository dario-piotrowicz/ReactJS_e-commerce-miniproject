import shopReducer from './shop.reducer';
import { setShopData, requestShopDataUpdatesFromFirestore } from './shop.actions';

const initialState = {
    collections: null
};

const shopData = {
    "hats": {
      "routeName": "hats",
      "items": [
        {
          "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png",
          "price": 25,
          "name": "Brown Brim",
          "id": 1
        }
      ],
      "title": "Hats",
      "id": "2YOFEqxK8MLqXz07M2Zl"
    },
    "womens": {
      "routeName": "womens",
      "items": [
        {
          "id": 23,
          "imageUrl": "https://i.ibb.co/7CQVJNm/blue-tank.png",
          "price": 25,
          "name": "Blue Tanktop"
        },
        {
          "imageUrl": "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
          "price": 80,
          "name": "Red Dots Dress",
          "id": 26
        }
      ],
      "title": "Womens",
      "id": "E29hEx8qpTXBKVxaVW0D"
    },
    "mens": {
      "routeName": "mens",
      "items": [
        {
          "name": "Camo Down Vest",
          "id": 30,
          "imageUrl": "https://i.ibb.co/xJS0T3Y/camo-vest.png",
          "price": 325
        }
      ],
      "title": "Mens",
      "id": "FqSN5ExKqR4Y74psQvQd"
    },
    "sneakers": {
      "routeName": "sneakers",
      "items": [
        {
          "imageUrl": "https://i.ibb.co/w4k6Ws9/nike-funky.png",
          "price": 190,
          "name": "Air Jordan Limited",
          "id": 16
        },
        {
          "imageUrl": "https://i.ibb.co/Mhh6wBg/timberlands.png",
          "price": 200,
          "name": "Timberlands",
          "id": 17
        }
      ],
      "title": "Sneakers",
      "id": "MZCeTQozqSzhXJh388HL"
    },
    "jackets": {
      "routeName": "jackets",
      "items": [
        {
            "id": 20,
            "imageUrl": "https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
            "price": 90,
            "name": "Grey Jean Jacket"
        }
      ],
      "title": "Jackets",
      "id": "P8bQ8g0y2CESxwHipaJf"
    }
};

const shopReducerWithNoState = action => shopReducer(undefined, action);

describe('Shop Reducer', () => {


    beforeEach( () => {
        initialState.collections = null;
    });


    it( 'should return the initialState if no state is set and the action is not valid' , () => {
        expect( shopReducerWithNoState({}) ).toEqual(initialState);

        expect( shopReducerWithNoState({
            action: 'UNKOWN_ACTION'
        })).toEqual(initialState);

        expect( shopReducerWithNoState({
            action: 'ANOTHER_UNKOWN_ACTION',
            payload: "useless payload"
        })).toEqual(initialState);
    });


    it( 'should update the state on setShopData' , () => {
        const updatedState = shopReducer(
            initialState,
            setShopData(shopData)
        );

        const expectedState = {
            collections: shopData
        };

        expect(updatedState).toEqual(expectedState);
    });


    it( 'should ignore the requestShopDataUpdatesFromFirestore saga-only action' , () => {
        initialState.collections = shopData;

        const updatedState = shopReducer(
            initialState,
            requestShopDataUpdatesFromFirestore()
        );

        expect(updatedState).toEqual(initialState);
    });


});