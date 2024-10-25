import {
  getRouterContext,
  Outlet,
  Router,
  useMatch,
  useMatches,
} from "@tanstack/react-router";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { forwardRef, useContext, useRef } from "react";

export const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
  const RouterContext = getRouterContext();
  const routerContext = useContext(RouterContext);
  const renderedContext = useRef(routerContext);
  const isPresent = useIsPresent();
  const matches = useMatches();
  const match = useMatch({ strict: false });
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  const nextMatch = matches[nextMatchIndex];

  if (isPresent) {
    const clone = { ...routerContext } as Router<
      any,
      any,
      Record<string, any>,
      Record<string, any>
    >;
    renderedContext.current = clone;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={nextMatch.pathname}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <RouterContext.Provider value={renderedContext.current}>
          <Outlet />
        </RouterContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
});
