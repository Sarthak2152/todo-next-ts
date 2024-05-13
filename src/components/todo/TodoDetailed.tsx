import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Todo } from "@/util/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date-picker";

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
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={todo.title} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={todo.description} />
          </div>
          <div>
            <Label htmlFor="date">Deadline</Label>
            <DatePicker disabled target={todo.deadline} />
          </div>
        </div>
        <DialogFooter className="gap-4 sm:gap-0">
          {edit ? (
            <>
              <Button
                onClick={() => setEdit(false)}
                type="button"
                variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </>
          ) : (
            <>
              <Button variant="destructive">Delete</Button>
              <Button
                onClick={() => {
                  setEdit(true);
                }}
                variant="default">
                Edit
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
