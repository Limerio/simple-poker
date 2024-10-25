import { Text } from "@radix-ui/themes";
import { useNavigate } from "@tanstack/react-router";

const WIDTH_AND_HEIGHT_POKER_ICON = 55;

export const MainHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    void navigate({
      to: "/",
    });
  };

  return (
    <header className="p-5">
      <div className="flex items-center gap-2" onClick={goBack}>
        <img
          src="/poker-game.svg"
          alt="Poker game icon"
          width={WIDTH_AND_HEIGHT_POKER_ICON}
          height={WIDTH_AND_HEIGHT_POKER_ICON}
        />
        <Text as="span" className="inter-title text-4xl text-white select-none">
          Simple Poker
        </Text>
      </div>
    </header>
  );
};
