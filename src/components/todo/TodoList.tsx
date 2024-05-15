import React from "react";
import { TodoItem } from "./TodoItem";
import { getUserDetails } from "@/lib/getUserWithoutRequest";
import TodoModel from "@/models/Todo";
import dbConnect from "@/lib/dbConnect";
import { unstable_noStore as noStore } from "next/cache";

export const TodoList = async () => {
  noStore();
  try {
    await dbConnect();
    const jwtPayload = await getUserDetails();
    const todos = await TodoModel.find({ user: jwtPayload?.userId });
    const plainTodos = todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      deadline: todo.deadline,
    }));
    if (plainTodos.length === 0) {
      return (
        <div>
          <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
            You have no todo&apos;s
          </h3>
          <p className="text-center mt-4">Add todo to get started</p>
        </div>
      );
    }
    return (
      <ul className="flex pr-4 pb-8 flex-col gap-3">
        {plainTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    );
  } catch (error: any) {
    console.log("🚀 ~ TodoList ~ error:", error);
    return (
      <div>
        <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          Error occurred while fetching todo&apos;s
        </h3>
        <p className="text-center mt-4">{error?.message}</p>
      </div>
    );
  }
};
