import { User } from "@prisma/client";
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user?: User;
  }
}
