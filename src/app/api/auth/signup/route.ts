import { userSignUpSchema } from "@/app/schemas/userSignUpSchema";
import { NextRequest } from "next/server";
import { fromZodError } from "zod-validation-error";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/lib/managePasswords";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedUserData = userSignUpSchema.safeParse(body);
    if (!validatedUserData.success) {
      return Response.json(
        {
          success: false,
          message: fromZodError(validatedUserData.error).toString(),
        },
        { status: 400 }
      );
    }
    // checking if user already exists
    const user = await User.findOne({ email: validatedUserData.data.email });
    console.log("🚀 ~ POST ~ user:", user);
    if (user) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(validatedUserData.data.password);
    const newUser = await User.create({
      ...validatedUserData.data,
      password: hashedPassword,
    });
    return Response.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}
