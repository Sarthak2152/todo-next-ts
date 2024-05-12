import React from "react";
import { ToggleTheme } from "../ToggleTheme";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center py-8 px-6">
      <Link className="text-3xl font-semibold" href="/">
        Todo App
      </Link>
      <div>
        <ToggleTheme />
      </div>
    </div>
  );
};
