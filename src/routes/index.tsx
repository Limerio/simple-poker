import { Header } from "@/components/Header";
import { Button } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <>
        <Header />
        <main>
          <Button>Get started</Button>
        </main>
      </>
    );
  },
});
