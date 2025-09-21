import { Badge, Flex, Text } from "@radix-ui/themes";
import type React from "react";

interface WebsiteStatusCardProps {
  supported: boolean;
  websiteName: string;
  isLoading?: boolean;
}

const WebsiteStatusCard: React.FC<WebsiteStatusCardProps> = ({
  supported,
  websiteName,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Flex
        direction="column"
        gap="2"
        p="3"
        style={{ backgroundColor: "var(--gray-2)", borderRadius: "8px" }}
      >
        <Text size="2" color="gray">
          Checking website...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      gap="2"
      p="3"
      style={{
        backgroundColor: supported ? "var(--green-2)" : "var(--orange-2)",
        borderRadius: "8px",
      }}
    >
      <Flex align="center" gap="2">
        <Badge color={supported ? "green" : "orange"} variant="soft">
          {supported ? "Supported" : "Not Supported"}
        </Badge>
        <Text size="2">
          {supported
            ? `${websiteName} detected`
            : "Navigate to Amazon or Shopify store"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default WebsiteStatusCard;
