import { GearIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

interface PopupHeaderProps {
  onOpenSettings: () => void;
}

const PopupHeader: React.FC<PopupHeaderProps> = ({ onOpenSettings }) => (
  <Flex align="center" justify="between">
    <Flex direction="column" gap="1">
      <Heading size="4">Fabric AI Enhancer</Heading>
      <Text size="1" color="gray">
        Enhance product content with AI
      </Text>
    </Flex>
    <Button
      variant="ghost"
      size="2"
      onClick={onOpenSettings}
      style={{ padding: "8px" }}
    >
      <GearIcon width="16" height="16" />
    </Button>
  </Flex>
);

export default PopupHeader;
