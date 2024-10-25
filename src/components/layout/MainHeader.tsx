import { Text } from "@radix-ui/themes";

const WIDTH_AND_HEIGHT_POKER_ICON = 55;

export const MainHeader = () => {
  return (
    <header className="p-5">
      <div className="flex items-center gap-2">
        <img
          src="/poker-game.svg"
          alt="Poker game icon"
          width={WIDTH_AND_HEIGHT_POKER_ICON}
          height={WIDTH_AND_HEIGHT_POKER_ICON}
        />
        <Text as="span" className="inter-title text-4xl text-white">
          Simple Poker
        </Text>
      </div>
    </header>
  );
};
