# Fabric AI Content Enhancer - Chrome Extension

This is a take-home test project for [Fabric Inc](https://fabric.inc/).

## Description

A Chrome extension that enhances e-commerce content using AI. The extension works across merchant websites (specifically tested with Amazon and Shopify stores) to scrape and improve:

- Product titles
- Product descriptions
- Shipping information
- Returns policies

The extension uses OpenAI's API to generate more engaging, SEO-friendly, and customer-focused content while maintaining accuracy to the original product information.

## Features

- **Multi-platform support**: Works on Amazon and Shopify stores
- **Selective enhancement**: Choose which content types to enhance
- **Real-time feedback**: Status messages with success/error states
- **Website detection**: Automatically detects supported e-commerce platforms
- **Clean UI**: Built with Radix UI components for accessibility and consistency

## Tech Stack

- **React + TypeScript + Vite** - Modern React development setup
- **Chrome Extension Manifest V3** - Latest Chrome extension standard
- **Radix UI** - Accessible component library
- **OpenAI API** - AI content generation
- **Chrome Storage API** - Persistent settings storage

## Setup

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run build
```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

## Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Type check with tsc and build for production
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview the production build locally

### Development Workflow

1. Start the development server:
```bash
npm run dev
```

2. Make your changes to the source code

3. Build and reload the extension:
```bash
npm run build
```

4. Reload the extension in Chrome (`chrome://extensions/`)

## Architecture

### Project Structure

```
src/
├── features/           # Feature-based organization
│   ├── enhancer/      # Content enhancement feature
│   ├── settings/      # Settings management
│   └── popup/         # Popup container logic
├── data-access/       # Data layer
│   └── llm/          # LLM provider and state management
├── services/          # Business logic services
├── config/           # Website configurations
├── utils/            # Utility functions
└── types/            # TypeScript type definitions
```

### Key Components

- **LLM Provider**: Centralized state management for AI operations
- **Enhancement Service**: Handles content scraping and replacement
- **Website Config**: Defines selectors for different e-commerce platforms
- **Feature Components**: Modular UI components following single responsibility principle

## Usage

1. Navigate to a supported e-commerce website (Amazon or Shopify store)
2. Click the extension icon in the Chrome toolbar
3. Select which content types you want to enhance
4. Click "Enhance Content" to improve the selected content with AI
5. The enhanced content will be displayed on the page with visual indicators

## Supported Websites

- **Amazon**: Product pages with `/dp/` or general amazon.com URLs
- **Shopify**: Stores built on the Shopify platform

## Configuration

The extension can be configured by modifying `src/config/websites.ts` to add support for additional e-commerce platforms by defining appropriate DOM selectors.