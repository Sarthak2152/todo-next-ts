import { userSignUpSchema } from "@/app/schemas/userSignUpSchema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedUserData = userSignUpSchema.safeParse(body);
    if (!validatedUserData.success) {
    }
  } catch (error) {}
}
