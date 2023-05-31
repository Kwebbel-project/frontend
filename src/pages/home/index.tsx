import ApiHandler from "@/common/services/ApiHandler";
import SessionService from "@/common/services/SessionService";
import Tweet from "@/common/types/Tweet";
import TweetService from "@/modules/TweetService"
import React, { useEffect, useState } from 'react'

let tweetService: TweetService = new TweetService(new ApiHandler(), new SessionService());
export default function index() {
  const [tweet, setTweet] = useState("")
  const [tweets, setTweets] = useState<Tweet[]>()

  useEffect(() => {
    let socket = new WebSocket("ws://localhost:5003/ws");

    socket.onopen = (event) => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setTweets(newData)
      console.log(newData)
    };
  }, [])
  
  function postTweet() {
    tweetService.postTweet(tweet, "authortest", 1);
  }

  return (
    <div>
      
      <div className="grid grid-cols-3 place-content-center mt-3">
        <div className="col-span-1">
        </div>
        <div className="col-span-1">
          <label className="relative block">
            <span className="sr-only">Tweet</span>
            <input value={tweet} onChange={(e) => setTweet(e.currentTarget.value)} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Tweet about something..." type="text" name="tweet"/>
          </label>
          <button onClick={postTweet} className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-full w-4/12 mt-2">
            Tweeten
          </button>
        <div>    
          {tweets?.map((tweet) => {
            return (
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    {tweet.Author}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{tweet.Content}</p>
              </div>
            )
            
          })}
        </div>
        </div>
        <div className="col-span-1">

        </div>
        
      </div>
      </div>
  )
}