import { getWebsiteConfig } from "../config/websites";
import type { LLMRequest } from "../data-access/llm/llm.models";
import type { EnhancementType } from "../features/enhancer/hooks/useEnhancementOptions";
import { getCurrentTab } from "../utils/tabUtils";

interface EnhancementResult {
  success: boolean;
  message: string;
  error?: string;
}

export class EnhancementService {
  private generateEnhancement: (config: LLMRequest) => Promise<string>;

  constructor(generateEnhancement: (config: LLMRequest) => Promise<string>) {
    this.generateEnhancement = generateEnhancement;
  }

  async enhanceCurrentPage(
    selectedTypes: EnhancementType[] = ["title"]
  ): Promise<EnhancementResult> {
    try {
      const tab = await getCurrentTab();
      if (!tab?.id || !tab?.url) {
        return {
          success: false,
          message: "No active tab found",
          error: "No active tab found",
        };
      }

      const config = getWebsiteConfig(tab.url);
      if (!config) {
        return {
          success: false,
          message: "This website is not supported",
          error: "Website not supported",
        };
      }

      if (selectedTypes.length === 0) {
        return {
          success: false,
          message: "Please select at least one content type to enhance",
          error: "No content types selected",
        };
      }

      const enhancedCount = await this.enhanceMultipleTypes(
        tab.id,
        config,
        selectedTypes
      );

      if (enhancedCount === 0) {
        return {
          success: false,
          message: "No content could be enhanced on this page",
          error: "No content found to enhance",
        };
      }

      const contentText =
        enhancedCount === 1 ? "content type" : "content types";
      return {
        success: true,
        message: `✅ Successfully enhanced ${contentText}!`,
      };
    } catch (error) {
      console.error("Enhancement error:", error);
      return {
        success: false,
        message: `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private async enhanceMultipleTypes(
    tabId: number,
    config: any,
    selectedTypes: EnhancementType[]
  ): Promise<number> {
    let enhancedCount = 0;

    for (const type of selectedTypes) {
      const selector = this.getSelectorForType(config, type);
      if (!selector) continue;

      try {
        const content = await this.extractContentFromPage(tabId, selector);
        if (!content) continue;

        const enhancedContent = await this.generateEnhancement({
          content,
          type,
        });

        await this.updateContentInDOM(tabId, selector, enhancedContent, type);
        enhancedCount++;
      } catch (error) {
        console.error(`Failed to enhance ${type}:`, error);
      }
    }

    return enhancedCount;
  }

  private getSelectorForType(
    config: any,
    type: EnhancementType
  ): string | null {
    switch (type) {
      case "title":
        return config.selectors.title || null;
      case "description":
        return config.selectors.description || null;
      case "shipping":
        return config.selectors.shipping || null;
      case "returns":
        return config.selectors.returns || null;
      default:
        return null;
    }
  }

  private async extractContentFromPage(
    tabId: number,
    selector: string
  ): Promise<string | null> {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: (sel: string) => {
        const element = document.querySelector(sel);
        return element?.textContent?.trim() || null;
      },
      args: [selector],
    });

    return results.at(0)?.result || null;
  }

  private async updateContentInDOM(
    tabId: number,
    selector: string,
    newContent: string,
    contentType: EnhancementType
  ): Promise<void> {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: (sel: string, content: string, type: string) => {
        const element = document.querySelector(sel) as HTMLElement;
        if (element) {
          const originalContent = element.textContent || "";

          element.textContent = content;

          element.setAttribute(
            "title",
            `Enhanced by Fabric AI\n\nOriginal: ${originalContent}\n\nEnhanced: ${content}`
          );

          const indicatorClass = `fabric-ai-indicator-${type}`;
          const existingIndicator = element.parentNode?.querySelector(
            `.${indicatorClass}`
          );

          if (!existingIndicator) {
            const indicator = document.createElement("div");
            indicator.className = `fabric-ai-indicator ${indicatorClass}`;
            indicator.textContent = `Enhanced with Fabric AI ✨ (${type})`;
            indicator.style.cssText = `
              font-size: 11px;
              color: #666;
              font-weight: normal;
              margin-top: 4px;
              opacity: 0.8;
              font-style: italic;
              line-height: 1.2;
            `;
            element.parentNode?.insertBefore(indicator, element.nextSibling);
          }
        }
      },
      args: [selector, newContent, contentType],
    });
  }
}
