"use client";
import * as React from "react";
import { Todo } from "@/util/types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";
import TodoDetailed from "./TodoDetailed";
import { Checkbox } from "../ui/checkbox";
import axios from "axios";
type TodoItemProps = {
  todo: Todo;
};
export function TodoItem({ todo }: TodoItemProps) {
  const { title, id, deadline, completed } = todo;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean | "indeterminate">(
    completed
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeCompleted = async (checked: boolean | "indeterminate") => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `http://localhost:3000/api/todo/${id}`,
        { completed: checked }
      );
      console.log("🚀 ~ handleChangeCompleted ~ response:", response);
      setIsCompleted(checked);
    } catch (error) {
      console.log("🚀 ~ handleChangeCompleted ~ error:", error);
      setIsCompleted(!checked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li key={id} className="flex border rounded-lg p-4 justify-between">
      <div>
        <h2
          onClick={() => setIsOpen(true)}
          className={`scroll-m-20 text-xl font-semibold transition-all duration-400 tracking-tight ${
            isCompleted ? "line-through" : ""
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
        {isCompleted ? (
          <span className="text-green-500 px-3">Done</span>
        ) : (
          <span className="text-orange-500">Pending</span>
        )}
        <Checkbox
          disabled={isLoading}
          checked={isCompleted}
          onCheckedChange={handleChangeCompleted}
          className="w-6 h-6"
        />
      </div>
      <TodoDetailed todo={todo} isOpen={isOpen} setIsOpen={setIsOpen} />
    </li>
  );
}
