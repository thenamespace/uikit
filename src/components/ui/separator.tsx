"use client";

import type * as react from "react";

import { cn } from "@/utils";
import * as separatorPrimitive from "@radix-ui/react-separator";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: react.ComponentProps<typeof separatorPrimitive.Root>) {
  return (
    <separatorPrimitive.Root
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        className,
      )}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
