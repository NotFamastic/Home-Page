//!
import React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group";
//*For searchbar.tsx
export function SearchInput({
  className,
  icon,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  icon: React.ReactNode;
}) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none!">
        <InputGroupAddon>{icon}</InputGroupAddon>
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "min-w-0 flex-1 bg-transparent px-2 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </InputGroup>
    </div>
  );
}