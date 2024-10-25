import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="main-background"></div>
      <Outlet />
    </>
  ),
});
