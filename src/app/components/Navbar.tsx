"use client";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";

import Link from 'next/link'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'



const Navbar = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    return (<header className="mb-auto flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
        <nav className="w-full px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex items-center justify-between ">
                <Link href={"/"} className="flex-none text-xl font-semibold text-black no-wrap">
                    Art Gen App
                </Link>
                <div className="sm:hidden">
                    <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-lg border border-gray-700 hover:border-gray-600 font-medium text-gray-300 hover:text-white shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-600 transition-all text-sm " data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                        <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>
            <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                    <Link href={"/"} className="font-medium text-black focus:outline-none focus:ring-1 focus:ring-gray-600">Home</Link>
                    <Link href={"/pages/newpost"} className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 ">Create</Link>
                    <Link href={"/pages/feed"} className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 ">Explore</Link>
                    <Link href={"/pages/profile"} className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 ">My Art</Link>

                    <span>
                        <SignedOut>
                            <SignInButton signUpForceRedirectUrl={"/api/signupcallback"} />
                        </SignedOut>
                        <SignedIn >
                            <UserButton />
                        </SignedIn>
                    </span>
                </div>
            </div>
        </nav>
    </header >)
}

export default Navbar