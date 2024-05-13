"use client";
import * as React from "react";
import { Todo } from "@/util/types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";
import TodoDetailed from "./TodoDetailed";
import { Checkbox } from "../ui/checkbox";
type TodoItemProps = {
  todo: Todo;
};
export function TodoItem({ todo }: TodoItemProps) {
  const { title, id, deadline, completed } = todo;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <li key={id} className="flex border rounded-lg p-4 justify-between">
      <div>
        <h2
          onClick={() => setIsOpen(true)}
          className={`scroll-m-20 text-xl font-semibold tracking-tight ${
            completed ? "line-through" : ""
          }`}>
          {title}
        </h2>
        <p className="leading-7">{format(deadline, "PPP")}</p>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="mt-3"
          size="sm">
          View Details
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center  gap-4">
        {completed ? (
          <span className="text-green-500 px-3">Done</span>
        ) : (
          <span className="text-orange-500">Pending</span>
        )}
        <Checkbox checked={completed} className="w-6 h-6" />
      </div>
      <TodoDetailed todo={todo} isOpen={isOpen} setIsOpen={setIsOpen} />
    </li>
  );
}
