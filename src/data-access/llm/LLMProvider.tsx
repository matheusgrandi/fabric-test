import {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from "react";
import type { EnhancementType } from "../../features/enhancer/hooks/useEnhancementOptions";
import { EnhancementService } from "../../services/enhancementService";
import type { LLMRequest } from "./llm.models";
import { initState, LLMReducer } from "./llm.reducer";
import { getPrompt } from "./prompts";

interface LLMProviderProps {
  isLoading: boolean;
  error: string | null;
  currentAPIKey: string;
  defaultAPIKey: string;
  isEnhancing: boolean;
  enhancementMessage: string | null;
  setAPIKey: (key: string) => void;
  generateEnchencement: (config: LLMRequest) => Promise<string>;
  enhancePageContent: (selectedTypes: EnhancementType[]) => Promise<void>;
}

const LLMContext = createContext<LLMProviderProps | undefined>(undefined);

type OwnProps = PropsWithChildren<{ defaultAPIKey: string }>;

export const LLMProvider: React.FC<OwnProps> = ({
  children,
  defaultAPIKey,
}) => {
  const [state, dispatch] = useReducer(LLMReducer, {
    ...initState,
    config: {
      ...initState.config,
      apiKey: defaultAPIKey,
    },
  });

  const setAPIKey: LLMProviderProps["setAPIKey"] = (key) => {
    dispatch({ type: "SET_API_KEY", payload: { apiKey: key } });
  };

  const enhancePageContent: LLMProviderProps["enhancePageContent"] = async (
    selectedTypes
  ) => {
    dispatch({ type: "ENHANCEMENT_INIT" });

    try {
      const enhancementService = new EnhancementService(generateEnchencement);
      const result = await enhancementService.enhanceCurrentPage(selectedTypes);

      if (result.success) {
        dispatch({
          type: "ENHANCEMENT_SUCCESS",
          payload: { message: result.message },
        });
      } else {
        dispatch({
          type: "ENHANCEMENT_FAILURE",
          payload: { message: result.message },
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      dispatch({
        type: "ENHANCEMENT_FAILURE",
        payload: { message: `Error: ${errorMessage}` },
      });
    }
  };

  const generateEnchencement: LLMProviderProps["generateEnchencement"] = async (
    config
  ) => {
    dispatch({ type: "LLM_REQUEST_INIT" });
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.config.apiKey}`,
          },
          body: JSON.stringify({
            max_tokens: state.config.maxTokens,
            model: state.config.model,
            temperature: state.config.temperature,
            messages: [{ role: "user", content: getPrompt(config) }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate enhancement");
      }
      dispatch({ type: "LLM_REQUEST_SUCCESS" });

      const data = await response.json();

      let content = data.choices.at(0)?.message?.content?.trim() || "";

      if (
        (content.startsWith('"') && content.endsWith('"')) ||
        (content.startsWith("'") && content.endsWith("'"))
      ) {
        content = content.slice(1, -1);
      }

      return content;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch({
        type: "LLM_REQUEST_FAILURE",
        payload: { error: errorMessage },
      });
      throw error;
    }
  };

  return (
    <LLMContext.Provider
      value={{
        ...state,
        currentAPIKey: state.config.apiKey,
        defaultAPIKey,
        setAPIKey,
        generateEnchencement,
        enhancePageContent,
      }}
    >
      {children}
    </LLMContext.Provider>
  );
};

export const useLLM = () => {
  const context = useContext(LLMContext);
  if (context === undefined) {
    throw new Error("useLLM must be used within a LLMProvider");
  }

  return context;
};
