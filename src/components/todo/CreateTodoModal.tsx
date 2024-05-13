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

export const CreateTodoModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Input type="text" placeholder="Title" />
          <Input type="text" placeholder="Description" />
          <DatePicker target={undefined} disabled={false} />
        </div>
        <div className="w-full text-center">
          <Button type="submit" className="text-center max-w-sm w-full px-3">
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
