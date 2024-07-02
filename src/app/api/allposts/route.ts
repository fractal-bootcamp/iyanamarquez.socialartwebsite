import { optionalUser } from "@/middleware/optionalUser";
import { redirect } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true, // Ensure body parsing is enabled
  },
};

//  Get all posts
export const GET = optionalUser(async (req: NextRequest, res: NextResponse) => {
  if (req.method === "GET") {
    try {
      const allPosts = await prisma.post.findMany();
      console.log("grabbed posts");
      console.log(allPosts);
      return Response.json({ data: allPosts });
    } catch (error) {
      return Response.json({ data: "error grabbing posts" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return Response.json({ data: "something weird happened" });
  }
});
