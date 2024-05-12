import * as React from "react";
import { Todo } from "@/util/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TodoItemProps = {
  todo: Todo;
};
export function TodoItem({ todo }: TodoItemProps) {
  const { id, title, deadline, description, completed } = todo;
  return (
    <li className="flex border rounded-lg p-4 justify-between">
      <div>
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="leading-7">{"12/04/2021"}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        {todo.completed ? (
          <span className="text-green-500">Done</span>
        ) : (
          <span className="text-orange-500">Pending</span>
        )}
        {!todo.completed && <Button size="sm">Mark as Done</Button>}
        {todo.completed && <Button size="sm">Mark as Un Done</Button>}
      </div>
    </li>
  );
}
