import { convertCollectionsToArray, convertBasicShopDataArrayToShopDataMap } from './shop.utils';

const hatsItems = [
    {
        id: 3,
        imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
        name: "Brown Cowboy",
        price: 35
    },
    {
        id: 8,
        imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
        name: "Wolf Cap",
        price: 14
    }
];
const hatsObj = { title: 'Hats', id: 'test_hats', items: hatsItems };

const mensItems = [
    {
        id: 34,
        imageUrl: "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png",
        name: "Jean Long Sleeve",
        price: 40
    }
];
const mensObj = { title: 'Mens', id: 'test_mens', items: mensItems };

const jacketsItems = [
    {
        id: 18,
        imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
        name: "Black Jean Shearling",
        price: 125
    },
    {
        id: 19,
        imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
        name: "Blue Jean Jacket",
        price: 90
    },
    {
        id: 22,
        imageUrl: "https://i.ibb.co/M6hHc3F/brown-trench.png",
        name: "Tan Trench",
        price: 185
    }
];
const jacketsObj = { title: 'Jackets', id: 'test_jackets', items: jacketsItems };

const shopDataArray = [ hatsObj, mensObj, jacketsObj ];

const shopDataMap = {
    hats: hatsObj,
    mens: mensObj,
    jackets: jacketsObj
};

describe('Shop Utils', () => {

    afterEach( () => {
        delete shopDataMap.hats.routeName;
        delete shopDataMap.mens.routeName;
        delete shopDataMap.jackets.routeName;
    });


    it( 'convertCollectionsToArray returns an empty array if no input is provided' , () => {
        expect( convertCollectionsToArray() ).toEqual([]);
        expect( convertCollectionsToArray(undefined) ).toEqual([]);
        expect( convertCollectionsToArray(null) ).toEqual([]);
    });


    it( 'convertBasicShopDataArrayToShopDataMap returns an empty object if no input is provided' , () => {
        expect( convertBasicShopDataArrayToShopDataMap() ).toEqual({});
        expect( convertBasicShopDataArrayToShopDataMap(undefined) ).toEqual({});
        expect( convertBasicShopDataArrayToShopDataMap(null) ).toEqual({});
    });


    it( 'convertCollectionsToArray converts correctly a given object to an array' , () => {
        const result = convertCollectionsToArray(shopDataMap);
        expect( result ).toEqual( shopDataArray );
    });


    it( 'convertBasicShopDataArrayToShopDataMap converts correctly a given array to an object' , () => {
        shopDataMap.hats.routeName = 'hats';
        shopDataMap.mens.routeName = 'mens';
        shopDataMap.jackets.routeName = 'jackets';
        
        const result = convertBasicShopDataArrayToShopDataMap(shopDataArray);
        expect( result ).toEqual( shopDataMap );
    });


});