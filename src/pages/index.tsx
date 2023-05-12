import Router from "next/router";
import React, { useEffect } from 'react'

let domain = process.env.DOMAIN;


function index() {
    useEffect(() => {
        Router.push(`${domain}/auth/login`);
        })
      
  return (
    <div></div>
  )
}

export default index