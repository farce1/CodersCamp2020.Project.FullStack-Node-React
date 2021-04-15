export enum AppConsts {
    APP_TITLE = "#CoOtwarte?"
}

const BACKEND_URL = 'http://localhost:8080'; // TEMPORARY - LATER SWITCH TO .ENV

const GET_ALL_RESTAURANTS = ():string => `${BACKEND_URL}/restaurants`;
const GET_RESTAURANT = (restaurantID: number):string => `${BACKEND_URL}/restaurants/${restaurantID}`;

export const API = {
    endpoints: {
        restaurants: {
            getAllRestaurants: GET_ALL_RESTAURANTS,
            getRestaurant: GET_RESTAURANT
        },
        users: {},
        addresses: {},
        favourites: {},
        comments: {},
    }
}