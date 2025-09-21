import { Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import type { EnhancementType } from "../hooks/useEnhancementOptions";

interface EnhancementOption {
  type: EnhancementType;
  label: string;
  available: boolean;
  selected: boolean;
}

interface EnhancementOptionsProps {
  options: EnhancementOption[];
  onToggleOption: (type: EnhancementType) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  hasSelections: boolean;
}

const EnhancementOptions: React.FC<EnhancementOptionsProps> = ({
  options,
  onToggleOption,
  onSelectAll,
  onDeselectAll,
  hasSelections,
}) => {
  const availableOptions = options.filter((option) => option.available);

  if (!availableOptions.length) {
    return (
      <Flex
        direction="column"
        gap="2"
        p="3"
        style={{
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px",
        }}
      >
        <Text size="2" color="gray">
          No content types available for enhancement on this website
        </Text>
      </Flex>
    );
  }

  const allSelected = availableOptions.every((option) => option.selected);

  return (
    <Flex
      direction="column"
      gap="3"
      p="3"
      style={{
        backgroundColor: "var(--blue-2)",
        borderRadius: "8px",
      }}
    >
      <Flex align="center" justify="between">
        <Text size="2" weight="medium">
          Content to Enhance
        </Text>

        {!allSelected && (
          <Button
            variant="soft"
            size="1"
            onClick={allSelected ? onDeselectAll : onSelectAll}
          >
            {!allSelected && "Select All"}
          </Button>
        )}
      </Flex>

      <Flex direction="column" gap="2">
        {availableOptions.map((option) => (
          <Flex key={option.type} align="center" gap="2">
            <Checkbox
              checked={option.selected}
              onCheckedChange={() => onToggleOption(option.type)}
            />
            <Text size="2">{option.label}</Text>
          </Flex>
        ))}
      </Flex>

      {!hasSelections && (
        <Text size="1" color="orange">
          Select at least one content type to enhance
        </Text>
      )}
    </Flex>
  );
};

export default EnhancementOptions;
