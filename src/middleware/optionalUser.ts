import { useAuth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { useEffect } from "react";
import { NextApiHandler } from "next";
import prisma from "../../client";

export function optionalUser(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const clerkId = auth().userId;

    if (!clerkId) {
      return handler(req, res);
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (user) {
      // append user to request context
      req.user = user;
    } else {
      const curr = await currentUser();

      // otherwise create a new user and append to request context
      req.user = await prisma.user.create({
        data: {
          clerkId: clerkId,
          email: curr?.emailAddresses[0].emailAddress || "",
          username: curr?.username,
        },
      });
    }

    return handler(req, res);
  };
}