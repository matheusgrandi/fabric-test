import type { LLMRequest } from "./llm.models";

const GLOBAL_INSTRUCTIONS = `
You are an expert content writer and SEO specialist. Your task is to enhance various types of e-commerce content to make it more engaging, clear, and persuasive while maintaining all important information. Follow the specific instructions for each content type carefully. Just return the improved content without any additional commentary or formatting.
`;

export const getPrompt = (config: LLMRequest) => {
  switch (config.type) {
    case "title":
      return enhenceTitle(config.content);
    case "description":
      return enhenceDescription(config.content);
    case "shipping":
      return enhenceShipping(config.content);
    case "returns":
      return enhenceReturns(config.content);
    default:
      throw new Error("Invalid content type");
  }
};

const enhenceTitle = (content: string) => `
${GLOBAL_INSTRUCTIONS}
Improve this product title to be more engaging and SEO-friendly while keeping it concise and accurate.
    Original title: "${content}"

    Requirements:
    - Keep it under 60 characters
    - Make it more compelling and descriptive
    - Maintain accuracy to the original product
    - Optimize for search engines

    Return only the improved title, nothing else.`;

const enhenceDescription = (content: string) => `
${GLOBAL_INSTRUCTIONS}
Rewrite this product description to be more engaging, clear, and persuasive while maintaining all important product information.

    Original description: "${content}"

    Requirements:
    - Make it more engaging and customer-focused
    - Highlight key benefits and features
    - Use persuasive language that drives conversions
    - Keep all important technical specifications
    - Structure it with clear paragraphs or bullet points
    - Maintain accuracy to the original product

    Return only the improved description, nothing else.`;

const enhenceShipping = (content: string) =>
  `
${GLOBAL_INSTRUCTIONS}
  Rewrite this shipping information to be clearer, more customer-friendly, and more reassuring.

    Original shipping info: "${content}"

    Requirements:
    - Make it clear and easy to understand
    - Highlight any fast shipping or free shipping benefits
    - Use reassuring and customer-friendly language
    - Keep all important details like timeframes and costs
    - Make it more concise if possible

    Return only the improved shipping information, nothing else.`;

const enhenceReturns = (content: string) => `
${GLOBAL_INSTRUCTIONS}
Rewrite this returns policy to be more customer-friendly and reassuring while maintaining the same terms.

    Original returns info: "${content}"

    Requirements:
    - Make it sound more welcoming and customer-friendly
    - Highlight any customer benefits (like free returns, easy process)
    - Use reassuring language that builds trust
    - Keep all important policy details
    - Make it clearer and more concise

    Return only the improved returns information, nothing else.`;
