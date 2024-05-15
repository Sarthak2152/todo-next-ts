import { todoSchema, Todo } from "@/schemas/todoSchema";
import dbConnect from "@/lib/dbConnect";
import { getUserOnServer } from "@/lib/getUserOnServer";
import { NextRequest } from "next/server";
import TodoModel from "@/models/Todo";
import { fromZodError } from "zod-validation-error";

dbConnect();
export async function GET(request: NextRequest) {
  try {
    const jwtPayload = await getUserOnServer(request);
    console.log("🚀 ~ GET ~ jwtPayload:", jwtPayload);
    const allTodos = await TodoModel.find({ user: jwtPayload.userId });
    console.log("🚀 ~ GET ~ allTodos:", allTodos);
    return Response.json({
      data: allTodos,
      success: true,
      message: "Fetched all todos",
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedTodo = todoSchema.safeParse(body);
    if (!validatedTodo.success) {
      return Response.json(
        {
          success: false,
          message: fromZodError(validatedTodo.error).toString(),
        },
        { status: 400 }
      );
    }
    const jwtPayload = await getUserOnServer(request);
    console.log("🚀 ~ POST ~ jwtPayload:", jwtPayload);
    const newTodo = await TodoModel.create({
      ...validatedTodo.data,
      user: jwtPayload.userId,
    });
    console.log("🚀 ~ POST ~ newTodo:", newTodo);

    return Response.json(
      { data: newTodo, message: "New todo created", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
