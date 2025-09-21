import { Flex, Text, TextField } from "@radix-ui/themes";

interface ApiKeySectionProps {
  currentAPIKey: string;
  defaultAPIKey: string;
  onUpdateApiKey: (key: string) => void;
}

const ApiKeySection: React.FC<ApiKeySectionProps> = ({
  currentAPIKey,
  defaultAPIKey,
  onUpdateApiKey,
}) => (
  <Flex direction="column" gap="3">
    <Text size="2" weight="medium">
      OpenAI API Key
    </Text>

    <Text size="1" color="gray">
      {currentAPIKey === defaultAPIKey
        ? "Using default API key"
        : "Using custom API key"}
    </Text>

    <TextField.Root
      value={currentAPIKey}
      onChange={(e) => onUpdateApiKey(e.target.value)}
      placeholder="Enter custom API key (optional)"
      type="password"
    />

    <Text size="1" color="gray">
      API key is automatically saved by the LLM provider
    </Text>
  </Flex>
);

export default ApiKeySection;
