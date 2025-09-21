export async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  try {
    const strategies = [
      { active: true, lastFocusedWindow: true },
      { active: true, currentWindow: true },
      { active: true },
    ];

    for (let i = 0; i < strategies.length; i++) {
      const queryOptions = strategies[i];
      console.log(`TabUtils: Trying strategy ${i + 1}:`, queryOptions);

      try {
        const tabs = await chrome.tabs.query(queryOptions);

        if (tabs.length > 0) {
          return tabs.at(0);
        }
      } catch (error) {
        console.error(`TabUtils: Strategy ${i + 1} failed:`, error);
      }
    }

    return undefined;
  } catch (error) {
    console.error("TabUtils: getCurrentTab() error:", error);
    return undefined;
  }
}
