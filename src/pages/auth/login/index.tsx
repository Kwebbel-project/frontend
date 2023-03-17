import ApiHandler from "@/common/services/ApiHandler";
import SessionService from "@/common/services/SessionService";
import UserService from "@/modules/users/UserService";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import React, { useState } from 'react'
import styles from "./index.module.scss"

let userService: UserService = new UserService(new ApiHandler(), new SessionService());
export default function index(props:any) {
    const [email, setEmail] = useState<string>("test123@gmail.com");
    const [password, setPassword] = useState<string>("password123");

    function login() {
        userService.login(email, password)
        console.log(userService.authorizedRequestTest());
        
        // if success redirect 
    }

  return (
    <div>
        <h1>login</h1>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => login()}>Login</button>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const cookieHeader = req.headers.cookie
  const cookie = require('cookie')
  const cookies = cookie.parse(cookieHeader || '')

  const jwtToken = cookies.jwtToken
  console.log(jwtToken)
  return {
    props: { jwtToken },
  }
}