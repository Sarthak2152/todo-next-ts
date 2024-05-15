import { NextResponse } from "next/server";
import { loginSchema } from "@/schemas/userLoginSchema";
import { fromZodError } from "zod-validation-error";
import userModel from "@/models/User";
import { comparePasswords } from "@/lib/managePasswords";
import * as jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import type { JwtPayload } from "@/util/types";

dbConnect();
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedLoginData = loginSchema.safeParse(body);
    console.log("🚀 ~ POST ~ validatedLoginData:", validatedLoginData);
    if (!validatedLoginData.success) {
      return Response.json(
        {
          success: false,
          message: fromZodError(validatedLoginData.error).message,
        },
        { status: 400 }
      );
    }
    const user = await userModel.findOne({
      email: validatedLoginData.data.email,
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
      validatedLoginData.data.password
    );

    if (!validPassword) {
      return Response.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }
    const jwtPayload: JwtPayload = { userId: user._id, email: user.email };
    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      { success: true, data: user, message: "User logged in successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: error.message ? error.message : error,
      },
      { status: 500 }
    );
  }
}
