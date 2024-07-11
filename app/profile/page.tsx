import { UserProfile } from "@clerk/nextjs"

const page = () => {
  return (
    <div className=" flex items-center justify-center mb-5">
        <UserProfile />
    </div>
  )
}

export default page
