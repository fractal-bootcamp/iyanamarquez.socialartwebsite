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
        // Fetch the post to check if the user is already in the likedBy list
        const post = await prisma.post.findUnique({
          where: { id: data.postId },
          select: { likedBy: { select: { id: true } } },
        });

        if (!post) {
          return Response.json({ data: "Post not found" });
        }

        const userAlreadyLiked = post.likedBy.some(
          (likedUser) => likedUser.id === user.id
        );

        let updatedPost;
        if (userAlreadyLiked) {
          // Remove the user from the likedBy field
          updatedPost = await prisma.post.update({
            where: {
              id: data.postId,
            },
            data: {
              likedBy: {
                disconnect: { id: user.id },
              },
            },
            include: {
              _count: {
                select: { likedBy: true },
              },
            },
          });
        } else {
          // Add the user to the likedBy field
          updatedPost = await prisma.post.update({
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
        }

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
