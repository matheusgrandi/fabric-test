import type { LLMConfig } from "./llm.models";

export interface LLMState {
  config: LLMConfig;
  isLoading: boolean;
  error: string | null;
  isEnhancing: boolean;
  enhancementMessage: string | null;
}

export const initState: LLMState = {
  config: {
    apiKey: "",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 150,
  },
  isLoading: false,
  error: null,
  isEnhancing: false,
  enhancementMessage: "",
};

export type LLMAction =
  | { type: "SET_CONFIG"; payload: Partial<LLMConfig> }
  | { type: "SET_API_KEY"; payload: { apiKey: string } }
  | { type: "LLM_REQUEST_INIT" }
  | { type: "LLM_REQUEST_SUCCESS" }
  | { type: "LLM_REQUEST_FAILURE"; payload: { error: string } }
  | { type: "ENHANCEMENT_INIT" }
  | { type: "ENHANCEMENT_SUCCESS"; payload: { message: string } }
  | { type: "ENHANCEMENT_FAILURE"; payload: { message: string } };

export function LLMReducer(state: LLMState, action: LLMAction): LLMState {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    case "SET_API_KEY":
      return {
        ...state,
        config: { ...state.config, apiKey: action.payload.apiKey },
      };
    case "LLM_REQUEST_INIT":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LLM_REQUEST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case "LLM_REQUEST_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case "ENHANCEMENT_INIT":
      return {
        ...state,
        isEnhancing: true,
        enhancementMessage: null,
      };
    case "ENHANCEMENT_SUCCESS":
      return {
        ...state,
        isEnhancing: false,
        enhancementMessage: action.payload.message,
      };
    case "ENHANCEMENT_FAILURE":
      return {
        ...state,
        isEnhancing: false,
        enhancementMessage: action.payload.message,
      };
    default:
      return state;
  }
}
