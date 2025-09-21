import { Flex } from "@radix-ui/themes";
import EnhancementButton from "./components/EnhancementButton";
import EnhancementOptions from "./components/EnhancementOptions";
import ReadyStatusCard from "./components/ReadyStatusCard";
import StatusMessage from "./components/StatusMessage";
import WebsiteStatusCard from "./components/WebsiteStatusCard";
import { useEnhancement } from "./hooks/useEnhancement";
import { useEnhancementOptions } from "./hooks/useEnhancementOptions";
import { useWebsiteDetection } from "./hooks/useWebsiteDetection";

const EnhancerPage = () => {
  const { websiteInfo, isLoading } = useWebsiteDetection();
  const { isEnhancing, message, enhanceContent } = useEnhancement();
  const { options, toggleOption, selectAll, deselectAll, hasSelections } =
    useEnhancementOptions(websiteInfo?.url);

  const isDisabled = !websiteInfo?.supported || isEnhancing || !hasSelections;

  const handleEnhance = () => {
    enhanceContent();
  };

  return (
    <Flex direction="column" gap="4">
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

      <StatusMessage message={message} />
    </Flex>
  );
};

export default EnhancerPage;
