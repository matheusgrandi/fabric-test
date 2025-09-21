import { useEffect, useState } from "react";
import { getWebsiteConfig } from "../../../config/websites";
import { getCurrentTab } from "../../../utils/tabUtils";

interface WebsiteInfo {
  url: string;
  supported: boolean;
  websiteName: string;
}

interface UseWebsiteDetectionReturn {
  websiteInfo: WebsiteInfo | null;
  isLoading: boolean;
  refreshWebsiteInfo: () => Promise<void>;
}

export function useWebsiteDetection(): UseWebsiteDetectionReturn {
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkCurrentWebsite = async () => {
    try {
      const tab = await getCurrentTab();

      if (!tab?.url) {
        setWebsiteInfo(null);
        return;
      }

      const config = getWebsiteConfig(tab.url);

      setWebsiteInfo({
        url: tab.url,
        supported: !!config,
        websiteName: config?.name || "Unknown",
      });
    } catch (error) {
      console.error("Error checking website:", error);
      setWebsiteInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkCurrentWebsite();

    const handleTabUpdated = (
      _tabId: number,
      changeInfo: { url?: string; status?: string }
    ) => {
      if (changeInfo.url || changeInfo.status === "complete") {
        checkCurrentWebsite();
      }
    };

    const handleTabActivated = () => {
      checkCurrentWebsite();
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdated);
    chrome.tabs.onActivated.addListener(handleTabActivated);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdated);
      chrome.tabs.onActivated.removeListener(handleTabActivated);
    };
  }, []);

  const refreshWebsiteInfo = async () => {
    setIsLoading(true);
    await checkCurrentWebsite();
  };

  return {
    websiteInfo,
    isLoading,
    refreshWebsiteInfo,
  };
}
