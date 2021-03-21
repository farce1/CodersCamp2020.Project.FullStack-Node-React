import User from "./user.interface";

export interface Restaurant {
    _id: string
    name: string
    email: string
    address: string
    owner?: string
    description?: string
    siteUrl?: string
    opened?: boolean
    verified?: boolean
    cuisine?: string[]
    socials?: string[]
    comments?: string[]
    likeCount?: number
    dislikeCount?: number
}

export type RestaurantSiteUrl = string | null;

export type RestaurantOwner = User | null