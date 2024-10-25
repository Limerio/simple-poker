import { Button, Heading } from "@radix-ui/themes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    const navigate = useNavigate();
    const goToPlayPage = () =>
      void navigate({
        to: "/play",
      });

    return (
      <main className="fixed flex items-center justify-between p-7 h-full w-full">
        <div className="flex flex-col items-start gap-5">
          <Heading size="9" className="text-white">
            Ready to play?
          </Heading>
          <Button
            className="bg-[var(--red-card)] px-8 py-7 text-2xl font-semibold"
            size="4"
            onClick={goToPlayPage}
          >
            Yes!
          </Button>
        </div>
      </main>
    );
  },
});
