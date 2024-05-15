import TodoModel from "@/models/Todo";
import { todoSchema } from "@/schemas/todoSchema";
import { fromZodError } from "zod-validation-error";
export async function GET(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;

    const todo = await TodoModel.findById(todoId);
    if (!todo) {
      return Response.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true, data: todo }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    //   console.log("🚀 ~ todoId:", todoId);
    const body = await request.json();
    const validatedTodoData = todoSchema.partial().safeParse(body);
    console.log("🚀 ~ validatedTodoData:", validatedTodoData);
    if (!validatedTodoData.success) {
      return Response.json({
        success: false,
        message: fromZodError(validatedTodoData.error).toString(),
      });
    }
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      validatedTodoData.data,
      { new: true }
    );
    if (!updatedTodo) {
      return Response.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, data: updatedTodo, message: "Todo updated" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return Response.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true, data: deletedTodo }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
