import { CreateTodoModal } from "@/components/todo/CreateTodoModal";
import { TodoList } from "@/components/todo/TodoList";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <main className="p-8">
      <div className="max-w-lg mx-auto">
        <Input placeholder="Search todo's " />
      </div>
      <div className="mt-6 max-w-lg mx-auto">
        <CreateTodoModal />
      </div>
      <ScrollArea className="max-w-lg mx-auto mt-8 h-96 rounded-sm">
        <TodoList />
      </ScrollArea>
    </main>
  );
}
