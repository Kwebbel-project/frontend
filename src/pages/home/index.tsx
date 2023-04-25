import ApiHandler from "@/common/services/ApiHandler";
import SessionService from "@/common/services/SessionService";
import Tweet from "@/common/types/Tweet";
import TweetService from "@/modules/TweetService"
import React, { useEffect, useState } from 'react'
import { useAuth } from 'reactfire';
import { getAuth, signOut} from "firebase/auth";

let tweetService: TweetService = new TweetService(new ApiHandler(), new SessionService());
export default function index() {
  const [tweet, setTweet] = useState("")
  const [tweets, setTweets] = useState<Tweet[]>()
  const auth = useAuth();

  useEffect(() => {
    tweetService.getTweets().then(tweets => {
      setTweets(tweets);
    });
  }, [])
  
  function signOutFromAccount() {
    signOut(auth);
  }

  function postTweet() {
    tweetService.postTweet(tweet, "authortest", 1);
  }

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-sky-400 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Kwebbel</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
              Home
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
              1
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
              2
            </a>
          </div>
          <div>
          </div>
        </div>
      </nav>
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
        <button onClick={signOutFromAccount} className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-full w-4/12 mt-2">
            sign out
        </button>
        <div>
          {tweets?.map((tweet) => {
            return <div>{tweet.content}</div>
          })}
        </div>
        </div>
        <div className="col-span-1">

        </div>
        
      </div>
      </div>
  )
}