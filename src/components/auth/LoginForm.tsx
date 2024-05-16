"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { userLogin, loginSchema } from "@/schemas/userLoginSchema";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<userLogin>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    toast({
      title: "Login With Demo Credentials",
      description: "Click on button to add demo credentials",
      action: (
        <ToastAction
          onClick={() => {
            setValue("email", "sarthak@gmail.com");
            setValue("password", "Hello@1234");
          }}
          altText="Add info">
          Add Credentials
        </ToastAction>
      ),
    });
  }, [toast, setValue]);

  const onSubmit: SubmitHandler<userLogin> = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      const response = await axios.post("/api/auth/login", data);
      console.log("🚀 ~ onSubmit ~ response:", response.data);
      toast({
        title: "Login successful",
        description: `You have successfully logged in as ${response.data.data.firstName} ${response.data.data.lastName}`,
      });
      reset();
      router.push("/");
    } catch (error: any) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors && errors.email && (
                <span className="text-sm text-red-500 -mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" {...register("password")} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {!loading ? "Login" : "Logging in..."}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setValue("email", "sarthak@gmail.com");
                setValue("password", "Hello@1234");
              }}
              variant="outline">
              Add Demo Credentials
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default LoginForm;
