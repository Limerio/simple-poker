import { AnimatedOutlet } from "@/components/layout/AnimateOutlet";
import { MainHeader } from "@/components/layout/MainHeader";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="main-background"></div>
      <MainHeader />
      <AnimatedOutlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
