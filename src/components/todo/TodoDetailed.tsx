import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Todo } from "@/util/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, Todo as todoType } from "@/schemas/todoSchema";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

type TodoDetailedProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  todo: Todo;
};

export default function TodoDetailed({
  isOpen,
  todo,
  setIsOpen,
}: TodoDetailedProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(todo.deadline);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    if (open) setIsOpen(true);
    else {
      setIsOpen(false);
      reset();
      setEdit(false);
    }
  };
  // FORM LOGIC
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<todoType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      completed: todo.completed,
      deadline: todo.deadline,
      description: todo.description,
      title: todo.title,
    },
  });

  // Edit todo
  const onSubmit: SubmitHandler<todoType> = async (data) => {
    console.log("🚀 ~ constonSubmit:SubmitHandler<todoType>= ~ data:", data);
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `http://localhost:3000/api/todo/${todo.id}`,
        data
      );
      toast({
        title: "Todo Updated Successfully",
        description: "Todo has been updated",
      });
      router.refresh();
    } catch (error: any) {
      console.log(
        "🚀 ~ constonSubmit:SubmitHandler<todoType>= ~ error:",
        error
      );
      toast({
        title: "Cannot Update Todo",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setEdit(false);
      setIsLoading(false);
    }
  };

  // Managing deadline
  useEffect(() => {
    setValue("deadline", date!, { shouldValidate: true });
  }, [date, setValue]);

  // Delete todo
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/todo/${todo.id}`);
      console.log("🚀 ~ handleDelete ~ response:", response);
      setIsOpen(false);
      toast({
        title: "Todo Deleted Successfully",
        description: "Todo has been deleted",
      });
      router.refresh();
    } catch (error: any) {
      console.log("🚀 ~ handleDelete ~ error:", error);
      toast({
        title: "Cannot delete todo",
        description:
          error?.message || "Something went wrong while deleting todo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <Label htmlFor="title">Title</Label>
              <Input id="title" readOnly={!edit} {...register("title")} />
              {errors && errors.title && (
                <p className="text-red-500 absolute -bottom-5 text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="description">Description</Label>
              <Textarea
                readOnly={!edit}
                {...register("description")}
                id="description"
              />
              {errors && errors.description && (
                <p className="text-red-500 absolute -bottom-5 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="relative">
              <div {...register("deadline")}>
                <Label htmlFor="date">Deadline</Label>
                <DatePicker disabled={!edit} setDate={setDate} date={date} />
                {errors && errors.deadline && (
                  <p className="text-red-500 absolute -bottom-5 text-xs">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-4 sm:gap-0">
            {edit ? (
              <>
                <Button
                  onClick={() => setEdit(false)}
                  disabled={isLoading}
                  type="button"
                  variant="secondary">
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Save changes
                </Button>
              </>
            ) : (
              <>
                <div>
                  {" "}
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={handleDelete}
                    variant="destructive">
                    Delete
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setEdit(true);
                    }}
                    type="button"
                    disabled={isLoading}
                    variant="default">
                    Edit
                  </Button>
                </div>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
