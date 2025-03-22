"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskDialog } from "./task-dialog";

export function AddTaskButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-[#c026d3] hover:bg-[#c026d3]/90 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Plus className="w-6 h-6 mr-2" />
        Add Task
      </Button>
      <TaskDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
