"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [format, setFormat] = React.useState("Normal");

  const handleBoldClick = () => {
    document.execCommand("bold", false);
  };

  const handleItalicClick = () => {
    document.execCommand("italic", false);
  };

  const handleUnderlineClick = () => {
    document.execCommand("underline", false);
  };

  return (
    <div className="border rounded-lg">
      <div className="flex items-center gap-2 border-b p-2">
        <select 
          className="text-sm bg-transparent border-none focus:ring-0"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option>Normal</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
        </select>
        <div className="flex items-center gap-1 border-l pl-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleBoldClick}
          >
            <span className="font-bold">B</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleItalicClick}
          >
            <span className="italic">I</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleUnderlineClick}
          >
            <span className="underline">U</span>
          </Button>
        </div>
      </div>
      <div
        contentEditable
        className={cn(
          "min-h-[100px] p-3 focus:outline-none",
          !value && "before:content-[attr(data-placeholder)] before:text-gray-400"
        )}
        data-placeholder={placeholder}
        onInput={(e) => onChange(e.currentTarget.textContent || "")}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
