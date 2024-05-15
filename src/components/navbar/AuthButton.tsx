"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";

function AuthButton() {
  const pathName = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  if (pathName === "/login" || pathName === "/signup") {
    return;
  }
  const BASE_URL = process.env.BASE_URL!;
  const onLogoutHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/auth/logout`);
      toast({
        title: "Logged out successfully",
        description: "You were logged out!",
      });
      router.push("/login");
    } catch (error: any) {
      console.log("🚀 ~ onLogoutHandler ~ error:", error);
      toast({
        title: "Error",
        description: error?.data?.response?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={onLogoutHandler}
      disabled={loading}
      type="button"
      variant="default">
      {!loading ? (
        "Logout"
      ) : (
        <>
          <svg
            className="text-black animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"></svg>
          Logging out...
        </>
      )}
    </Button>
  );
}

export default AuthButton;
