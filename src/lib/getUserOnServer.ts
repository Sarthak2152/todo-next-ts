import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "@/util/types";
export async function getUserOnServer(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  try {
    if (token) {
      const jwtPayload: JwtPayload = <JwtPayload>(
        jwt.verify(token, process.env.JWT_SECRET!)
      );
      return jwtPayload;
    } else {
      throw new Error("Token not found");
    }
  } catch (error) {
    throw error;
  }
}
