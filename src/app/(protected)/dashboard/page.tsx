'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
const dashboard = () => {
  const {user} = useUser()
   return (
    <div>
      <div>{user?.firstName }</div>
      <div>{user?.lastName }</div>
    </div>
  )
}

export default dashboard
