import React from "react";
import { Todo } from "@/util/types";
import { TodoItem } from "./TodoItem";
const staticData: Todo[] = [
  {
    id: "1",
    title: "Demo todo one",
    description:
      "Demo todo one lorem ipsum dolor sit amet in con laoreet et justo",
    deadline: new Date(),
    completed: false,
  },
  {
    id: "2",
    title: "Demo todo two",
    description:
      "Demo todo one lorem ipsum dolor sit amet in con laoreet et justo",
    deadline: new Date(),
    completed: true,
  },
  {
    id: "3",
    title: "Demo todo three",
    description:
      "Demo todo one lorem ipsum dolor sit amet in con laoreet et justo",
    deadline: new Date(),
    completed: false,
  },
  {
    id: "4",
    title: "Demo todo four",
    description:
      "Demo todo one lorem ipsum dolor sit amet in con laoreet et justo",
    deadline: new Date(),
    completed: false,
  },
  {
    id: "5",
    title: "Demo todo five",
    description:
      "Demo todo one lorem ipsum dolor sit amet in con laoreet et justo",
    deadline: new Date(),
    completed: false,
  },
  {
    id: "6",
    title: "Demo todo six",
    description:
      "Demo todo one lorem ipsum dolor sit amet in con laoreet et justo",
    deadline: new Date(),
    completed: false,
  },
];
export const TodoList = () => {
  return (
    <ul className="flex pr-4 pb-8 flex-col gap-3">
      {staticData.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
