import { optionalUser } from "@/middleware/optionalUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true, // Ensure body parsing is enabled
  },
};

//  Get all posts
export const GET = optionalUser(async (req, res) => {
  console.log("HELLLOO");
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  if (req.method === "GET") {
    try {
      const pageNumber = page ? parseInt(page, 10) : 1;
      const limitNumber = limit ? parseInt(limit, 10) : 10;
      const skip = (pageNumber - 1) * limitNumber;
      const take = limitNumber;

      const posts = await prisma.post.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc", // Order by creation date in descending order
        },
        include: {
          author: {
            select: {
              username: true,
            },
          },
          _count: true,
        },
      });

      const totalPosts = await prisma.post.count(); // Get the total number of posts in the database

      return Response.json({ data: posts, total: totalPosts }); // Include total in the response
    } catch (error) {
      return Response.json({ data: "error grabbing posts" });
    }
  } else {
    // res.setHeader("Allow", ["POST"]);
    return Response.json({ data: "something weird happened" });
  }
});
