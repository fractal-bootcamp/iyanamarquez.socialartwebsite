import { optionalUser } from "@/middleware/optionalUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = optionalUser(async (req, res) => {
  return Response.json({ data: "hEY I'm a thingy!" });
});

export const POST = optionalUser(async (req, res) => {
  if (req.method === "POST") {
    const data = await req.json();
    const jsonData = JSON.stringify(data.postData);
    if (!req.user) {
      return Response.json({ data: "user not logged in" });
    }

    try {
      console.log("trying tooo ", jsonData);
      const newPost = await prisma.post.create({
        data: {
          title: data.title,
          postData: jsonData,
          authorId: req.user.id,
        },
      });

      return Response.json({
        message: "made new post success",
        newPost: newPost,
      });
    } catch (error) {
      return Response.json({ data: error });
    }
  } else {
    return Response.json({ data: "something weird happened" });
  }
});
