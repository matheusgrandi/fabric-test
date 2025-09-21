import { Badge, Flex, Text } from "@radix-ui/themes";

const ReadyStatusCard = () => (
  <Flex
    align="center"
    justify="between"
    p="3"
    style={{ backgroundColor: "var(--green-2)", borderRadius: "8px" }}
  >
    <Flex align="center" gap="2">
      <Badge color="green" variant="soft">
        Ready
      </Badge>
      <Text size="2">Extension is ready for use</Text>
    </Flex>
  </Flex>
);

export default ReadyStatusCard;