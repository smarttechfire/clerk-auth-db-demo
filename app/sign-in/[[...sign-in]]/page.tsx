import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SignIn/>
      <div className=" text-sm mt-2 flex">
        <p>Forgot Password? </p>{" "}
        <Link href="/forgot-password">
          Reset Here
        </Link>
      </div>
    </div>
  )
}

export default page
