import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
const syncuser = async() => {
    const {userId} = await auth()
    if(!userId){
        throw new Error("User not found")
    }
    const Client = await clerkClient()
    const user = await Client.users.getUser(userId)
    if(!user.emailAddresses[0]?.emailAddress){
        return notFound()

    }
    await db.user.upsert({
        where:{
            email_address:user.emailAddresses[0].emailAddress
        },
        update:{
            firstName:user.firstName,
            image:user.imageUrl,
            lastName:user.lastName,
        },
        create:{
            id:userId,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.imageUrl,
            email:user.emailAddresses[0].emailAddress
        }
    })
    return redirect('/dashboard')
}
        
  
export default syncuser
