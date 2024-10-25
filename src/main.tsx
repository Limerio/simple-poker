import "@/index.css";
import { routeTree } from "@/routeTree.gen";
import { Theme } from "@radix-ui/themes";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </MotionConfig>
    </StrictMode>
  );
}
