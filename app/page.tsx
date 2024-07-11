import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();
  // console.log(user);
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className=" flex flex-col items-center text-center">{user?.username}</div>
    </div>
  );
}
