import IApiHandler, { Param } from "@/common/services/interfaces/IApiHandler";
import ISessionService from "@/common/services/interfaces/ISessionService";
import SessionService from "@/common/services/SessionService";
import Tweet from "@/common/types/Tweet";

export default class TweetService {
    apiHandler: IApiHandler;
    sessionService: ISessionService

    constructor(apiHandler: IApiHandler, sessionService: SessionService) {
        this.apiHandler = apiHandler;
        this.sessionService = sessionService;
    }

    getTweets() : Promise<Tweet[]> {
        return this.apiHandler.get("/tweet-service/tweet", [new Param("sdf","df")]).then(tweets => {
            console.log(tweets)
            return tweets;
        })
    }

    postTweet(content: string, author: string, userId: number): Promise<boolean> {
        return this.apiHandler.post("/tweet-service/tweet", `{
            "content": "${content}",
            "Author": "${author}",
            "userId": ${userId}
        }`).then(tweet => {
            console.log(tweet)
            return tweet;
        });
    }

}