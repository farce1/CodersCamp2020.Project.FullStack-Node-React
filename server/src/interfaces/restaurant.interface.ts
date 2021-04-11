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
    socials?: Socials
    comments?: string[]
    likeCount?: number
    dislikeCount?: number
}

export interface Socials {
    facebook: string | null,
    instagram: string | null,
    socialImage: string | null
}

export type RestaurantSiteUrl = string | null;

export type RestaurantOwner = User | null