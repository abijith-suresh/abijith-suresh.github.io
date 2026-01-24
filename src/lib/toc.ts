type HeadingConfig = {
  headingSelector: string;
  headerOffset: number;
};

type DesktopTocConfig = HeadingConfig & {
  containerSelector: string;
  linkSelector: string;
  activeClass: string;
};

type MobileTocConfig = HeadingConfig & {
  overviewText: string;
  progressCircleId: string;
  currentSectionId: string;
  listId: string;
  containerSelector: string;
};

type TocController = {
  init: () => void;
  cleanup: () => void;
};

function getVisibleHeadingIds(headingElements: HTMLElement[], headerOffset: number): string[] {
  if (headingElements.length === 0) return [];

  const viewportTop = window.scrollY + headerOffset;
  const visibleIds: string[] = [];

  for (let i = headingElements.length - 1; i >= 0; i--) {
    const heading = headingElements[i];
    if (heading.offsetTop <= viewportTop) {
      visibleIds.push(heading.id);
      break;
    }
  }

  if (visibleIds.length === 0 && headingElements.length > 0) {
    visibleIds.push(headingElements[0].id);
  }

  return visibleIds;
}

function areIdsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

export function createDesktopTocController(config: DesktopTocConfig): TocController {
  const state = {
    links: [] as Element[],
    headings: [] as HTMLElement[],
    activeIds: [] as string[],
  };

  const refreshHeadings = () => {
    state.headings = Array.from(document.querySelectorAll<HTMLElement>(config.headingSelector));
  };

  const refreshLinks = () => {
    state.links = Array.from(
      document.querySelectorAll(`${config.containerSelector} ${config.linkSelector}`)
    );
  };

  const updateLinks = (headingIds: string[]) => {
    state.links.forEach((link) => {
      link.classList.remove(config.activeClass);
    });

    headingIds.forEach((id) => {
      if (!id) return;
      const activeLink = document.querySelector(
        `${config.containerSelector} ${config.linkSelector}[data-heading-link="${id}"]`
      );
      if (activeLink) {
        activeLink.classList.add(config.activeClass);
      }
    });
  };

  const updateActiveIds = () => {
    const newActiveIds = getVisibleHeadingIds(state.headings, config.headerOffset);
    if (!areIdsEqual(newActiveIds, state.activeIds)) {
      state.activeIds = newActiveIds;
      updateLinks(state.activeIds);
    }
  };

  const handleScroll = () => {
    updateActiveIds();
  };

  const handleResize = () => {
    refreshHeadings();
    updateActiveIds();
  };

  const init = () => {
    refreshLinks();
    refreshHeadings();
    updateActiveIds();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
  };

  const cleanup = () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    state.activeIds = [];
    state.headings = [];
  };

  return { init, cleanup };
}

export function createMobileTocController(config: MobileTocConfig): TocController {
  const PROGRESS_CIRCLE_RADIUS = 10;
  const PROGRESS_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_CIRCLE_RADIUS;

  const state = {
    progressCircle: null as HTMLElement | null,
    currentSectionText: null as HTMLElement | null,
    detailsElement: null as HTMLDetailsElement | null,
    listElement: null as HTMLElement | null,
    headings: [] as HTMLElement[],
    activeIds: [] as string[],
  };

  const reset = () => {
    state.progressCircle = document.getElementById(config.progressCircleId);
    state.currentSectionText = document.getElementById(config.currentSectionId);
    state.detailsElement = document.querySelector(config.containerSelector);
    state.listElement = document.getElementById(config.listId);
    state.headings = [];
    state.activeIds = [];

    if (state.progressCircle) {
      state.progressCircle.style.strokeDasharray = PROGRESS_CIRCLE_CIRCUMFERENCE.toString();
      state.progressCircle.style.strokeDashoffset = PROGRESS_CIRCLE_CIRCUMFERENCE.toString();
    }
  };

  const refreshHeadings = () => {
    state.headings = Array.from(document.querySelectorAll<HTMLElement>(config.headingSelector));
  };

  const updateCurrentSectionText = (headingIds: string[]) => {
    if (!state.currentSectionText) return;

    let textToShow = config.overviewText;

    if (headingIds.length > 0) {
      const activeHeading = state.headings.find((heading) => heading.id === headingIds[0]);
      if (activeHeading?.textContent) {
        textToShow = activeHeading.textContent.trim();
      }
    }

    state.currentSectionText.textContent = textToShow;
  };

  const updateLinks = (headingIds: string[]) => {
    if (!state.listElement) return;

    state.listElement.querySelectorAll(".mobile-toc-item").forEach((item) => {
      const tocItem = item as HTMLElement;
      const headingId = tocItem.dataset.headingId;
      if (headingId && headingIds.includes(headingId)) {
        tocItem.classList.add("text-foreground");
      } else {
        tocItem.classList.remove("text-foreground");
      }
    });

    updateCurrentSectionText(headingIds);
  };

  const updateProgressCircle = () => {
    if (!state.progressCircle) return;

    const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress =
      scrollableDistance > 0 ? Math.min(Math.max(window.scrollY / scrollableDistance, 0), 1) : 0;

    state.progressCircle.style.strokeDashoffset = (
      PROGRESS_CIRCLE_CIRCUMFERENCE *
      (1 - scrollProgress)
    ).toString();
  };

  const updateActiveIds = () => {
    const newActiveIds = getVisibleHeadingIds(state.headings, config.headerOffset);

    if (!areIdsEqual(newActiveIds, state.activeIds)) {
      state.activeIds = newActiveIds;
      updateLinks(state.activeIds);
    }
  };

  const setupInteraction = () => {
    if (!state.listElement) return;

    state.listElement.querySelectorAll(".mobile-toc-item").forEach((item) => {
      item.addEventListener("click", () => {
        if (state.detailsElement) state.detailsElement.open = false;
      });
    });
  };

  const handleScroll = () => {
    updateActiveIds();
    updateProgressCircle();
  };

  const handleResize = () => {
    refreshHeadings();
    updateActiveIds();
    updateProgressCircle();
  };

  const init = () => {
    reset();
    refreshHeadings();

    if (!state.currentSectionText) return;

    if (state.headings.length === 0) {
      state.currentSectionText.textContent = config.overviewText;
      window.addEventListener("scroll", updateProgressCircle, { passive: true });
      updateProgressCircle();
      return;
    }

    updateActiveIds();
    updateProgressCircle();
    setupInteraction();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
  };

  const cleanup = () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("scroll", updateProgressCircle);
    window.removeEventListener("resize", handleResize);
    state.activeIds = [];
    state.headings = [];
  };

  return { init, cleanup };
}
