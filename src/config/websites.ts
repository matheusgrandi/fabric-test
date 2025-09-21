export interface WebsiteSelectors {
  title: string;
  description: string;
  shipping?: string;
  returns?: string;
}

export interface WebsiteConfig {
  domain: string;
  name: string;
  selectors: WebsiteSelectors;
}

export const websiteConfigs: WebsiteConfig[] = [
  {
    domain: "amazon.com",
    name: "Amazon",
    selectors: {
      title: "#productTitle",
      description: "#feature-bullets ul, #aplus",
      shipping: '[data-feature-name="delivery"] .a-declarative',
      returns: '[data-feature-name="returns"] .a-declarative',
    },
  },
  {
    domain: "myshopify.com",
    name: "Shopify Store",
    selectors: {
      title: '.product__title, .product-single__title, h1[class*="title"]',
      description:
        '.product__description, .product-single__description, [class*="description"]',
      shipping: '.shipping-policy, .delivery-info, [class*="shipping"]',
      returns: '.return-policy, .returns-info, [class*="return"]',
    },
  },
];

export function getWebsiteConfig(url: string): WebsiteConfig | null {
  const normalizedUrl = url.toLowerCase();

  for (const config of websiteConfigs) {
    if (config.domain === "amazon.com") {
      const isAmazon = normalizedUrl.includes("amazon.");

      if (isAmazon) {
        return config;
      }
    } else if (normalizedUrl.includes(config.domain)) {
      return config;
    }
  }

  return null;
}
