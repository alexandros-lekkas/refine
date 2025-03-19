"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export const COLORS = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
    hover: "hover:bg-blue-50",
    label: "Blue",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    hover: "hover:bg-green-50",
    label: "Green",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
    hover: "hover:bg-red-50",
    label: "Red",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
    hover: "hover:bg-purple-50",
    label: "Purple",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-200",
    hover: "hover:bg-orange-50",
    label: "Orange",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
    hover: "hover:bg-yellow-50",
    label: "Yellow",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-800",
    border: "border-pink-200",
    hover: "hover:bg-pink-50",
    label: "Pink",
  },
} as const;

export type ColorKey = keyof typeof COLORS;

interface ColorSelectorProps {
  value: ColorKey;
  onChange: (color: ColorKey) => void;
  className?: string;
  asDropdown?: boolean;
}

function ColorButton({
  color,
  colorKey,
  selected,
  onClick,
}: {
  color: (typeof COLORS)[ColorKey];
  colorKey: ColorKey;
  selected: boolean;
  onClick: () => void;
}) {
  const button = (
    <button
      className={cn(
        "w-6 h-6 rounded-md border transition-all relative",
        color.bg,
        color.border,
        color.hover,
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      )}
      onClick={onClick}
    >
      {selected && (
        <Check
          className={cn(
            "w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            color.text
          )}
        />
      )}
    </button>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{color.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ColorSelector({
  value,
  onChange,
  className,
  asDropdown = false,
}: ColorSelectorProps) {
  const content = (
    <div className={cn("flex gap-1 flex-wrap", className)}>
      {Object.entries(COLORS).map(([colorKey, color]) => (
        <ColorButton
          key={colorKey}
          color={color}
          colorKey={colorKey as ColorKey}
          selected={value === colorKey}
          onClick={() => onChange(colorKey as ColorKey)}
        />
      ))}
    </div>
  );

  if (asDropdown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn(
              "w-6 h-6 rounded-md border transition-all",
              COLORS[value].bg,
              COLORS[value].border,
              COLORS[value].hover,
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="p-2">
          {content}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return content;
}
