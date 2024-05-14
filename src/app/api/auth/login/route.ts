import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/app/schemas/userLoginSchema";
import { fromZodError } from "zod-validation-error";
import userModel from "@/models/User";
import { comparePasswords } from "@/lib/managePasswords";
import * as jwt from "jsonwebtoken";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedLoginDate = loginSchema.safeParse(body);
    if (!validatedLoginDate.success) {
      return Response.json(
        {
          success: false,
          message: fromZodError(validatedLoginDate.error).message,
        },
        { status: 400 }
      );
    }
    const user = await userModel.findOne({
      email: validatedLoginDate.data.email,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const validPassword = await comparePasswords(
      user.password,
      validatedLoginDate.data.password
    );
    console.log("🚀 ~ POST ~ validPassword:", validPassword);

    if (!validPassword) {
      return Response.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }
    const jwtPayload = { userId: user.id, email: user.email };
    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      { success: true, message: "User logged in successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message ? error.message : error,
      },
      { status: 500 }
    );
  }
}
