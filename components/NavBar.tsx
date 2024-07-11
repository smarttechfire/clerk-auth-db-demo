import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

const NavBar = async () => {
    const { userId } = await auth();
    const isAuth = !!userId;
    return (
        <div className=" mt-5">
            <ul className=" flex justify-between items-center">
                <div className="">
                    <Link href="/">
                        <li>Home</li>
                    </Link>
                </div>
                <div className=" flex gap-10">
                    {!isAuth ? (
                        <>
                            <Link href="/sign-in">
                                <li>Login</li>
                            </Link>
                            <Link href="/sign-up">
                                <li>Sign Up</li>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/profile">
                                <li>Profile</li>
                            </Link>
                            <li>
                                <UserButton afterSwitchSessionUrl="/" />
                            </li>
                        </>
                    )}


                </div>
            </ul>
        </div>
    )
}

export default NavBar
