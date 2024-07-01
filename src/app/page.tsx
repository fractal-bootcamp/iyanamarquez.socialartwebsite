"use client";
import Navbar from "./components/Navbar";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";



const Home = () => {
  const { userId, sessionId } = useAuth();
  const { isSignedIn, user, } = useUser();


  // const user = await currentUser();
  // 
  console.log(user)

  return (
    <>
      <Navbar />
      {userId && <span>
        hello there {userId}
      </span>}
      <h1>
        {/* {!user && <div>Not signed in</div>} */}
      </h1>
    </>
  );
}
export default Home