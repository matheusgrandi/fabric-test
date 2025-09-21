import { Button, Flex, Heading, Separator } from "@radix-ui/themes";
import { useLLM } from "../../data-access/llm/LLMProvider";
import ApiKeySection from "./components/ApiKeySection";

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { currentAPIKey, defaultAPIKey, setAPIKey } = useLLM();

  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Heading size="4">Settings</Heading>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </Flex>
      <Separator />
      <ApiKeySection
        currentAPIKey={currentAPIKey}
        defaultAPIKey={defaultAPIKey}
        onUpdateApiKey={setAPIKey}
      />
    </Flex>
  );
};

export default SettingsPage;
