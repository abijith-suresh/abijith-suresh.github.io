declare module "@pagefind/default-ui" {
  interface PagefindUIOptions {
    element?: string | HTMLElement;
    showImages?: boolean;
    showEmptyFilters?: boolean;
    showSubResults?: boolean;
    highlightParam?: string;
    excerptLength?: number;
    pageSize?: number;
    resetStyles?: boolean;
    translations?: Record<string, string>;
    processResult?: (result: unknown) => unknown;
  }

  class PagefindUI {
    constructor(options?: PagefindUIOptions);
    destroy(): void;
  }

  export { PagefindUI, PagefindUIOptions };
  export default PagefindUI;
}
