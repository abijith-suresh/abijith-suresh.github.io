/**
 * Search Modal Logic Module
 *
 * Handles all the interactive functionality for the search modal component,
 * including Pagefind UI initialization, keyboard navigation, and event handling.
 */

import { PagefindUI } from "@pagefind/default-ui";

// Transition durations (matching CSS variables from global.css)
const TRANSITION_FAST = 150; // --transition-fast: 150ms

// Module state
let pagefindInstance: InstanceType<typeof PagefindUI> | null = null;
let mutationObserver: MutationObserver | null = null;
const seenTagResults = new Map<string, Element>(); // Track tag results globally
let focusedIndex = -1; // Track currently focused result (-1 = none)

// Event handler references for cleanup
let keyboardNavHandler: ((e: KeyboardEvent) => void) | null = null;
let openButtonClickHandler: (() => void) | null = null;
let closeButtonDesktopClickHandler: (() => void) | null = null;
let modalClickHandler: ((e: Event) => void) | null = null;
let resultClickHandler: ((e: Event) => void) | null = null;
let escKeyHandler: ((e: KeyboardEvent) => void) | null = null;
let cmdKKeyHandler: ((e: KeyboardEvent) => void) | null = null;

/**
 * Update visual state of focused result
 */
function updateFocusedResult() {
  const results = Array.from(document.querySelectorAll(".pagefind-ui__result"));
  results.forEach((result, index) => {
    if (index === focusedIndex) {
      result.setAttribute("data-focused", "true");
      result.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else {
      result.removeAttribute("data-focused");
    }
  });
}

/**
 * Handle keyboard navigation within search results
 */
function handleKeyboardNavigation(e: KeyboardEvent) {
  const results = Array.from(document.querySelectorAll(".pagefind-ui__result"));
  if (results.length === 0) return;

  const searchInput = document.querySelector(".pagefind-ui__search-input");

  // Arrow keys: navigate results
  if (e.key === "ArrowDown") {
    e.preventDefault();
    focusedIndex = Math.min(focusedIndex + 1, results.length - 1);
    updateFocusedResult();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    focusedIndex = Math.max(focusedIndex - 1, -1);
    updateFocusedResult();
    // If we're back at -1, refocus the input
    if (focusedIndex === -1 && searchInput instanceof HTMLElement) {
      searchInput.focus();
    }
  } else if (e.key === "Enter" && focusedIndex >= 0) {
    // Enter: navigate to focused result
    e.preventDefault();
    const link = results[focusedIndex].querySelector(
      ".pagefind-ui__result-link"
    ) as HTMLAnchorElement;
    if (link) {
      link.click();
    }
  }
}

/**
 * Attach keyboard navigation event listener
 */
function attachKeyboardNavigation() {
  if (keyboardNavHandler) return; // Already attached

  keyboardNavHandler = handleKeyboardNavigation;
  document.addEventListener("keydown", keyboardNavHandler);
}

/**
 * Detach keyboard navigation event listener
 */
function detachKeyboardNavigation() {
  if (keyboardNavHandler) {
    document.removeEventListener("keydown", keyboardNavHandler);
    keyboardNavHandler = null;
  }
}

/**
 * Reset focused index when search query changes
 */
function resetFocusedIndex() {
  focusedIndex = -1;
  updateFocusedResult();
}

/**
 * Open the search modal
 */
export function openModal() {
  const modal = document.getElementById("search-modal");
  const modalContent = modal?.querySelector('[role="dialog"]');
  if (!modal || !modalContent) return;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("data-state", "open");
  modalContent.setAttribute("data-state", "open");
  document.body.classList.add("search-modal-open");

  // Initialize Pagefind UI if not already initialized
  if (!pagefindInstance) {
    pagefindInstance = new PagefindUI({
      element: "#search-container",
      showImages: false,
      highlightParam: "highlight",
      excerptLength: 30,
      showSubResults: false,
      showEmptyFilters: false,
      // No pageSize limit - show all results with scrolling
      translations: {
        zero_results: `No results found for "[query]"

Try:
• Using different keywords
• Checking your spelling
• <a href="/blog" class="pagefind-ui__action-link">Browse all blog posts</a>
• <a href="/projects" class="pagefind-ui__action-link">Browse all projects</a>`,
      },
    });

    // Add content type data attributes and keyboard navigation to results
    mutationObserver = new MutationObserver(() => {
      const results = document.querySelectorAll(".pagefind-ui__result");

      // Reset focused index when results change
      resetFocusedIndex();

      results.forEach((result) => {
        if (!result.hasAttribute("data-content-type")) {
          // Extract content type from the result link
          const link = result.querySelector(".pagefind-ui__result-link") as HTMLAnchorElement;
          if (link) {
            const href = link.getAttribute("href") || "";

            if (href.includes("/blog/") && !href.endsWith("/blog") && !href.endsWith("/blog/")) {
              result.setAttribute("data-content-type", "blog");
            } else if (
              href.includes("/projects/") &&
              !href.endsWith("/projects") &&
              !href.endsWith("/projects/")
            ) {
              result.setAttribute("data-content-type", "project");
            } else if (
              href.includes("/tags/") &&
              !href.endsWith("/tags") &&
              !href.endsWith("/tags/")
            ) {
              result.setAttribute("data-content-type", "tag");

              // Deduplicate tag pages (case-insensitive)
              const title = link.textContent?.trim() || "";
              const titleLower = title.toLowerCase();

              if (titleLower && seenTagResults.has(titleLower)) {
                // Remove this duplicate completely from DOM to fix pageSize counting
                result.remove();
              } else if (titleLower) {
                // Track this as the first occurrence
                seenTagResults.set(titleLower, result);
              }
            }
          }
        }
      });
    });

    // Observe the search container for changes
    const searchContainer = document.getElementById("search-container");
    if (searchContainer) {
      mutationObserver.observe(searchContainer, {
        childList: true,
        subtree: true,
      });
    }
  }

  // Attach keyboard navigation handler
  attachKeyboardNavigation();

  // Focus the search input
  setTimeout(() => {
    const searchInput = document.querySelector<HTMLInputElement>(".pagefind-ui__search-input");
    searchInput?.focus();
  }, TRANSITION_FAST);
}

/**
 * Close the search modal
 */
export function closeModal() {
  const modal = document.getElementById("search-modal");
  const modalContent = modal?.querySelector('[role="dialog"]');
  if (!modal || !modalContent) return;

  // Detach keyboard navigation
  detachKeyboardNavigation();
  resetFocusedIndex();

  modal.setAttribute("data-state", "closed");
  modalContent.setAttribute("data-state", "closed");

  // Wait for animation to complete before hiding
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-modal-open");
  }, TRANSITION_FAST);
}

/**
 * Initialize search modal event listeners
 */
export function initSearchModal() {
  const openButton = document.getElementById("open-search-modal");
  const closeButtonDesktop = document.getElementById("close-search-modal-desktop");
  const modal = document.getElementById("search-modal");

  // Open modal
  openButtonClickHandler = openModal;
  openButton?.addEventListener("click", openButtonClickHandler);

  // Close modal buttons
  closeButtonDesktopClickHandler = closeModal;
  closeButtonDesktop?.addEventListener("click", closeButtonDesktopClickHandler);

  // Close on backdrop click
  modalClickHandler = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };
  modal?.addEventListener("click", modalClickHandler);

  // Close on search result click (using event delegation)
  resultClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.closest(".pagefind-ui__result-link")) {
      closeModal();
    }
  };
  modal?.addEventListener("click", resultClickHandler);

  // Close on ESC key
  escKeyHandler = (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("search-modal");
      if (modal && !modal.classList.contains("hidden")) {
        closeModal();
      }
    }
  };
  document.addEventListener("keydown", escKeyHandler);

  // Open search modal with Cmd/Ctrl+K
  cmdKKeyHandler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openModal();
    }
  };
  document.addEventListener("keydown", cmdKKeyHandler);
}

/**
 * Cleanup search modal event listeners and state
 */
export function cleanupSearchModal() {
  const openButton = document.getElementById("open-search-modal");
  const closeButtonDesktop = document.getElementById("close-search-modal-desktop");
  const modal = document.getElementById("search-modal");

  // Remove open button handler
  if (openButtonClickHandler && openButton) {
    openButton.removeEventListener("click", openButtonClickHandler);
    openButtonClickHandler = null;
  }

  // Remove close button handler
  if (closeButtonDesktopClickHandler && closeButtonDesktop) {
    closeButtonDesktop.removeEventListener("click", closeButtonDesktopClickHandler);
    closeButtonDesktopClickHandler = null;
  }

  // Remove modal click handler
  if (modalClickHandler && modal) {
    modal.removeEventListener("click", modalClickHandler);
    modalClickHandler = null;
  }

  // Remove result click handler
  if (resultClickHandler && modal) {
    modal.removeEventListener("click", resultClickHandler);
    resultClickHandler = null;
  }

  // Remove ESC key handler
  if (escKeyHandler) {
    document.removeEventListener("keydown", escKeyHandler);
    escKeyHandler = null;
  }

  // Remove Cmd/Ctrl+K handler
  if (cmdKKeyHandler) {
    document.removeEventListener("keydown", cmdKKeyHandler);
    cmdKKeyHandler = null;
  }

  // Disconnect MutationObserver
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }

  // Remove keyboard navigation handler
  detachKeyboardNavigation();

  // Clear tag tracking
  seenTagResults.clear();

  // Reset focused index
  focusedIndex = -1;

  // Reset pagefind instance
  pagefindInstance = null;
}
