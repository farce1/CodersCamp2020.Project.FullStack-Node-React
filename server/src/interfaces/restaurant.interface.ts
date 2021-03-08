export interface Restaurant {
    _id: string
    name: string
    email: string
    address: Address
    description: string
    siteUrl: string
    opened: boolean
    verified: boolean
    cuisine: []
    socials: []
    comments: []
    likeCount: number
    dislikeCount: number
}