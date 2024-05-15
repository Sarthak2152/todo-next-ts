"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignUp, userSignUpSchema } from "@/schemas/userSignUpSchema";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSignUp>({ resolver: zodResolver(userSignUpSchema) });

  const onSubmit: SubmitHandler<UserSignUp> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        data
      );
      toast({
        title: "Sign up successful",
        description: "Your account has been created",
      });
      router.push("/login");
    } catch (error: any) {
      console.log("🚀 ~ SignUpForm ~ error:", error);
      toast({
        title: "Sign up failed",
        description: error?.data?.response?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mx-auto  max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  {...register("firstName")}
                />
                {errors && errors.firstName && (
                  <span className="text-xs text-red-500 -mt-1">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  {...register("lastName")}
                />
                {errors && errors.lastName && (
                  <span className="text-xs text-red-500 -mt-1">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors && errors.email && (
                <span className="text-xs text-red-500 -mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors && errors.password && (
                <span className="text-xs text-red-500 -mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {!loading ? "Create an account" : "Creating account..."}
            </Button>
          </div>
          <div className="mt-4 text-center text-xs">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default SignUpForm;
