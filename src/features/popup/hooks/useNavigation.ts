import { useState, useCallback } from 'react';

type Page = 'enhancer' | 'settings';

interface UseNavigationReturn {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  isOnPage: (page: Page) => boolean;
}

export function useNavigation(initialPage: Page = 'enhancer'): UseNavigationReturn {
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const isOnPage = useCallback((page: Page) => {
    return currentPage === page;
  }, [currentPage]);

  return {
    currentPage,
    navigateTo,
    isOnPage
  };
}