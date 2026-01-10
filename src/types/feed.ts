type FeedType = "REVIEW_CREATED" | "REVIEW_LIKED" | "USER_FOLLOWED" | "WATCHLIST_UPDATED";



export interface Feed {
    
        "actorUserId": string,
        "createdAt": Date,
        "id": string,
        "ownerUserId": string,
        "payload": string,
        "type": FeedType
    
}

export interface FeedPayloadParsed {
    "userId": string,
    "mediaId": number,
    "mediaType": string,
    "reviewText": string,
    "rating": number,
    "createdAt": Date
}
