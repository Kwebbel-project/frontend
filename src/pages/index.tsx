import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from "react"

import ApiHandler from "@/common/services/ApiHandler"
import UserService from "@/modules/users/UserService"
import User from "@/common/types/User"

let userService: UserService = new UserService(new ApiHandler());
export default function Home() {

  useEffect(() => {
      console.log(userService.getUsers());
      // let user = new User(null, "test123", "test123@gmail.com", "password123");
      // userService.register(user);

  }, [])

  return (
    <h1>test</h1>
  )
}
