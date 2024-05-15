import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "@/util/types";
export async function getUserDetails() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
      const jwtPayload: JwtPayload = await (<JwtPayload>(
        jwt.verify(token.value, process.env.JWT_SECRET!)
      ));
      return jwtPayload;
    }
  } catch (error: any) {
    throw new Error(
      error.message || "Something went wrong when getting user details"
    );
  }
}
