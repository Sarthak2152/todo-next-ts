import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Successfully logged out",
      },
      { status: 200 }
    );
    response.cookies.delete("token");
    response.cookies.delete("user");
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while logging out",
      },
      { status: 500 }
    );
  }
}
