import { useAuth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { useEffect } from "react";
import { NextApiHandler } from "next";
import { optionalUser } from "@/middleware/optionalUser";
import { redirect } from "next/navigation";

export const GET = optionalUser(async (req, res) => {
  console.log(req.user);
  return redirect("/");
});
