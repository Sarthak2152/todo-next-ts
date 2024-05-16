"use client";

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
      const response = await axios.get(`/api/auth/logout`);
      router.push("/login");
      toast({
        title: "Logged out successfully",
        description: "You were logged out!",
      });
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
      {!loading ? "Logout" : "Logging out..."}
    </Button>
  );
}

export default AuthButton;
