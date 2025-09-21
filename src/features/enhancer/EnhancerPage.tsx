import { Flex } from "@radix-ui/themes";
import { useLLM } from "../../data-access/llm/LLMProvider";
import EnhancementButton from "./components/EnhancementButton";
import EnhancementOptions from "./components/EnhancementOptions";
import ReadyStatusCard from "./components/ReadyStatusCard";
import StatusMessage from "./components/StatusMessage";
import WebsiteStatusCard from "./components/WebsiteStatusCard";
import { useEnhancementOptions } from "./hooks/useEnhancementOptions";
import { useWebsiteDetection } from "./hooks/useWebsiteDetection";

const EnhancerPage = () => {
  const { websiteInfo, isLoading } = useWebsiteDetection();
  const { isEnhancing, enhancePageContent, enhancementStatus } = useLLM();
  const {
    options,
    selectedTypes,
    toggleOption,
    selectAll,
    deselectAll,
    hasSelections,
  } = useEnhancementOptions(websiteInfo?.url);

  const isDisabled = !websiteInfo?.supported || isEnhancing || !hasSelections;

  const handleEnhance = () => {
    enhancePageContent(selectedTypes);
  };

  return (
    <Flex
      direction={"column"}
      justify={"between"}
      width={"100%"}
      height={"100%"}
      gap={"4"}
    >
      <WebsiteStatusCard
        supported={websiteInfo?.supported || false}
        websiteName={websiteInfo?.websiteName || "Unknown"}
        isLoading={isLoading}
      />
      <ReadyStatusCard />
      {websiteInfo?.supported && (
        <EnhancementOptions
          options={options}
          onToggleOption={toggleOption}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
          hasSelections={hasSelections}
        />
      )}
      <EnhancementButton
        onEnhance={handleEnhance}
        disabled={isDisabled}
        isEnhancing={isEnhancing}
      />
      <StatusMessage status={enhancementStatus} />
    </Flex>
  );
};

export default EnhancerPage;
