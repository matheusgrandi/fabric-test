export interface LLMConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface LLMRequest {
  content: string;
  type: "title" | "description" | "shipping" | "returns";
}
