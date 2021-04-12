import { START } from './actionTypes'

interface StartAction {
    type: typeof START
}
export type SocialsTypes = StartAction

export interface SystemState {
    count: {
        value: number
    }
}
