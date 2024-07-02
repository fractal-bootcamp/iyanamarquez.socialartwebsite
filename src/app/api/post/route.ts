import { optionalUser } from "@/middleware/optionalUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true, // Ensure body parsing is enabled
  },
};

export const GET = optionalUser(async (req, res) => {
  return Response.json({ data: "hEY I'm a thingy!" });
});

export const POST = optionalUser(
  async (req: NextRequest, res: NextResponse) => {
    if (req.method === "POST") {
      const data = await req.json();
      const jsonData = JSON.stringify(data.postData);

      try {
        console.log("trying tooo ", jsonData);
        const newPost = await prisma.post.create({
          data: {
            title: data.title,
            postData: jsonData,
            authorId: req.user.id,
          },
        });

        return Response.json({ data: "made new post success" });
      } catch (error) {
        return Response.json({ data: error });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      return Response.json({ data: "something weird happened" });
    }
  }
);
