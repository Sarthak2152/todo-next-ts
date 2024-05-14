import { todoData } from "@/app/api/todo/staticData";
import { todoSchema, Todo } from "@/app/schemas/todoSchema";
export async function GET() {
  return Response.json({ data: todoData });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validatedTodo = todoSchema.safeParse(body);
  if (!validatedTodo.success) {
    return Response.json({ error: validatedTodo.error }, { status: 400 });
  }
  const newTodo: Todo = {
    ...validatedTodo.data,
    id: (todoData.length + 1).toString(),
  };
  todoData.push(newTodo);
  return Response.json({ data: todoData }, { status: 200 });
}
