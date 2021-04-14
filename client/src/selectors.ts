import { RestaurantsState } from './features/restaurants/types'

export type AppState = {
    restaurants: RestaurantsState
}

export const getRestaurantsState = (state: AppState): RestaurantsState => state.restaurants;
