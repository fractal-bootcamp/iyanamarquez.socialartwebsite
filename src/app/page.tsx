"use client";
import Navbar from "./components/Navbar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";


export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <>
      <Navbar />
      {userId && <span>
        Hello, {userId} your current active session is {sessionId}

      </span>}
      <h1>
        main pageefrnlvnw
      </h1>
    </>
  );
}
