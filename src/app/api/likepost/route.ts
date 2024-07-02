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

export const POST = optionalUser(
  async (req: NextRequest, res: NextResponse) => {
    if (req.method === "POST") {
      const data = await req.json();
      const user = req.user;

      try {
        // Update the post with the new like count
        console.log("help");
        const updatedPost = await prisma.post.update({
          where: {
            id: data.postId,
          },
          data: {
            likedBy: {
              connect: { id: user.id },
            },
          },
          include: {
            _count: {
              select: { likedBy: true },
            },
          },
        });
        return Response.json({
          data: updatedPost,
          likeCount: updatedPost._count.likedBy,
        });
      } catch (error) {
        console.log("something failed");
        return Response.json({ data: error });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      return Response.json({ data: "something weird happened" });
    }
  }
);
