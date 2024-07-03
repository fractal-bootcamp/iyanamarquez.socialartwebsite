import { optionalUser } from "@/middleware/optionalUser";
import { redirect } from "next/navigation";

export const GET = optionalUser(async (req, res) => {
  console.log(req.user);
  return redirect("/");
});
