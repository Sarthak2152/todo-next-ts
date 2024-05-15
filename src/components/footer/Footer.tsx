import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="p-8 w-full absolute bg-background  bottom-0">
      <h3 className="text-md text-muted-foreground text-center italic ">
        - Developed by
        <Link
          className="text-foreground px-1"
          target="_blank"
          href="https://github.com/Sarthak2152">
          Sarthak Kapoor
        </Link>
      </h3>
    </div>
  );
};
