import React from "react";
import { ToggleTheme } from "../ToggleTheme";
import Link from "next/link";

import AuthButton from "./AuthButton";

export const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center py-8 px-6">
      <Link
        className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl"
        href="/">
        Todo App
      </Link>
      <div className="flex gap-3 items-center">
        <AuthButton />

        <ToggleTheme />
      </div>
    </div>
  );
};
