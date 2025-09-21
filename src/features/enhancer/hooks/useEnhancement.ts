import { useState } from "react";
import { useLLM } from "../../../data-access/llm/LLMProvider";
import { EnhancementService } from "../../../services/enhancementService";

interface UseEnhancementReturn {
  isEnhancing: boolean;
  message: string;
  enhanceContent: () => Promise<void>;
  clearMessage: () => void;
}

export function useEnhancement(): UseEnhancementReturn {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [message, setMessage] = useState("");
  const { generateEnchencement } = useLLM();

  const enhancementService = new EnhancementService(generateEnchencement);

  const enhanceContent = async () => {
    setIsEnhancing(true);
    setMessage("Enhancing content...");

    try {
      const result = await enhancementService.enhanceCurrentPage();
      setMessage(result.message);

      if (result.success) {
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setIsEnhancing(false);
    }
  };

  const clearMessage = () => setMessage("");

  return {
    isEnhancing,
    message,
    enhanceContent,
    clearMessage,
  };
}
