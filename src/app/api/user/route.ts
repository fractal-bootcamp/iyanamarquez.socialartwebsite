import { optionalUser } from "@/middleware/optionalUser";
import { redirect } from "next/navigation";

export const GET = optionalUser(async (req, res) => {
  return Response.json({ data: "hEY I'm a thingy!" });
});
