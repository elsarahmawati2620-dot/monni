"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className:
          "font-display font-bold border-pixel border-ink bg-paper text-ink shadow-pixel",
      }}
    />
  );
}
