import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import { LLMProvider } from "./data-access/llm/LLMProvider.tsx";

const openAIDefaultKey = import.meta.env.VITE_DEFAULT_OPENAI_API_KEY || "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="pink">
      <LLMProvider defaultAPIKey={openAIDefaultKey}>
        <App />
      </LLMProvider>
    </Theme>
  </StrictMode>
);
