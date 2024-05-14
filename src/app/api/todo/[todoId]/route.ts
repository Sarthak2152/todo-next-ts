import { todoSchema } from "@/app/schemas/todoSchema";
import { todoData } from "../staticData";
import { fromZodError } from "zod-validation-error";
export async function GET(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const { todoId } = params;

  const todo = todoData.find((todo) => todo.id === todoId);
  if (!todo) {
    return Response.json(
      { success: false, message: "Todo not found" },
      { status: 404 }
    );
  }
  return Response.json({ success: true, data: todo }, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const { todoId } = params;
  //   console.log("🚀 ~ todoId:", todoId);
  const body = await request.json();
  const validatedTodoData = todoSchema.partial().safeParse(body);
  console.log("🚀 ~ validatedTodoData:", validatedTodoData);
  if (!validatedTodoData.success) {
    return Response.json({
      success: false,
      error: fromZodError(validatedTodoData.error).toString(),
    });
  }
  const index = todoData.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    return Response.json(
      { success: false, message: "Todo not found" },
      { status: 404 }
    );
  }

  todoData[index] = { ...todoData[index], ...validatedTodoData.data };
  return Response.json(
    { success: true, data: todoData[index] },
    { status: 200 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const { todoId } = params;
  const index = todoData.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    return Response.json(
      { success: false, message: "Todo not found" },
      { status: 404 }
    );
  }
  const todo = todoData.splice(index, 1);
  return Response.json({ success: true, data: todo }, { status: 200 });
}
