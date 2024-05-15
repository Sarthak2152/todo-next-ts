"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo, todoSchema } from "@/schemas/todoSchema";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Textarea } from "../ui/textarea";

export const CreateTodoModal = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Todo>({
    resolver: zodResolver(todoSchema),
  });
  const { toast } = useToast();
  useEffect(() => {
    setValue("deadline", date!);
  }, [date, setValue]);

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    console.log("🚀 ~ CreateTodoModal ~ data:", data);
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/todo", data);
      reset();
      setIsOpen(false);
      toast({
        description: "Todo created",
      });
    } catch (error: any) {
      console.log("🚀 ~ CreateTodoModal ~ error:", error);
      toast({
        title: "Failed to Create Todo",
        description: error?.data?.response?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleOpen = (open: boolean) => {
    if (open) {
      setIsOpen(true);
    }
    if (!open) {
      reset();
      setDate(undefined);
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center gap-8">
            <div className="w-full relative">
              <Input type="text" placeholder="Title" {...register("title")} />
              {errors && errors.title && (
                <span className="text-red-500 text-xs absolute -bottom-5">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="w-full relative">
              <Textarea
                placeholder="Description"
                {...register("description")}
              />
              {errors && errors.description && (
                <span className="text-red-500 text-xs absolute -bottom-5">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="w-full relative" {...register("deadline")}>
              <DatePicker disabled={false} date={date} setDate={setDate} />
              {errors && errors.deadline && (
                <p className="text-red-500 text-xs absolute -bottom-5">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full text-center">
            <Button
              disabled={loading}
              type="submit"
              className="text-center max-w-sm w-full px-3">
              {!loading ? "Add Todo" : "Adding Todo ..."}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
