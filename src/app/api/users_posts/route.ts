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

//  Get all posts from current user
export const GET = optionalUser(async (req: NextRequest, res: NextResponse) => {
  if (req.method === "GET") {
    console.log(req.user);
    try {
      const allUsersPosts = await prisma.post.findMany({
        where: {
          authorId: req.user.id,
        },
      });
      console.log("grabbed posts");
      console.log(allUsersPosts);
      return Response.json({ data: allUsersPosts });
    } catch (error) {
      return Response.json({ data: "error grabbing posts" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return Response.json({ data: "something weird happened" });
  }
});
