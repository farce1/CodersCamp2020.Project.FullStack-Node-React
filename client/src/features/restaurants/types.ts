import { START } from './actionTypes'
import {Restaurant} from "../../../../server/src/interfaces/restaurant.interface";

interface StartAction {
    type: typeof START
    payload: Restaurant[]
}
export type SocialsTypes = StartAction

export type RestaurantsState =  Restaurant[]
