import { useEffect, useState } from "react";
import { getWebsiteConfig } from "../../../config/websites";

export type EnhancementType = "title" | "description" | "shipping" | "returns";

interface EnhancementOption {
  type: EnhancementType;
  label: string;
  available: boolean;
  selected: boolean;
}

interface UseEnhancementOptionsReturn {
  options: EnhancementOption[];
  selectedTypes: EnhancementType[];
  toggleOption: (type: EnhancementType) => void;
  selectAll: () => void;
  deselectAll: () => void;
  hasSelections: boolean;
}

const ENHANCEMENT_LABELS: Record<EnhancementType, string> = {
  title: "Product Title",
  description: "Product Description",
  shipping: "Shipping Information",
  returns: "Returns Policy",
};

export function useEnhancementOptions(
  websiteUrl?: string
): UseEnhancementOptionsReturn {
  const [options, setOptions] = useState<EnhancementOption[]>([]);

  useEffect(() => {
    if (!websiteUrl) {
      setOptions([]);
      return;
    }

    const config = getWebsiteConfig(websiteUrl);
    if (!config) {
      setOptions([]);
      return;
    }

    const newOptions: EnhancementOption[] = [
      {
        type: "title",
        label: ENHANCEMENT_LABELS.title,
        available: !!config.selectors.title,
        selected: !!config.selectors.title,
      },
      {
        type: "description",
        label: ENHANCEMENT_LABELS.description,
        available: !!config.selectors.description,
        selected: !!config.selectors.description,
      },
      {
        type: "shipping",
        label: ENHANCEMENT_LABELS.shipping,
        available: !!config.selectors.shipping,
        selected: !!config.selectors.shipping,
      },
      {
        type: "returns",
        label: ENHANCEMENT_LABELS.returns,
        available: !!config.selectors.returns,
        selected: !!config.selectors.returns,
      },
    ];

    setOptions(newOptions);
  }, [websiteUrl]);

  const toggleOption = (type: EnhancementType) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.type === type
          ? { ...option, selected: option.available ? !option.selected : false }
          : option
      )
    );
  };

  const selectAll = () => {
    setOptions((prev) =>
      prev.map((option) => ({
        ...option,
        selected: option.available,
      }))
    );
  };

  const deselectAll = () => {
    setOptions((prev) =>
      prev.map((option) => ({
        ...option,
        selected: false,
      }))
    );
  };

  const selectedTypes = options
    .filter((option) => option.selected)
    .map((option) => option.type);

  const hasSelections = selectedTypes.length > 0;

  return {
    options,
    selectedTypes,
    toggleOption,
    selectAll,
    deselectAll,
    hasSelections,
  };
}
