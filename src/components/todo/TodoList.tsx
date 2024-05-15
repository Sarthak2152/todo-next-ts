import React from "react";
import { TodoItem } from "./TodoItem";
import { getUserDetails } from "@/lib/getUserWithoutRequest";
import TodoModel from "@/models/Todo";
import dbConnect from "@/lib/dbConnect";
import { title } from "process";

export const TodoList = async () => {
  try {
    await dbConnect();
    const jwtPayload = await getUserDetails();
    const todos = await TodoModel.find({ user: jwtPayload?.userId });

    return (
      <ul className="flex pr-4 pb-8 flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo.toObject()} />
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
