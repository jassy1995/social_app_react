import { useEffect, useState } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export const useScrollForFetching = (hasNextPage, fetchNextPage, isFetchingNextPage) => {
  useEffect(() => {
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      if (!isFetchingNextPage && ((scrollHeight - scrollTop) <= clientHeight * 1.5)) {
        if (hasNextPage) await fetchNextPage();
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);
};


export const useScrollMessageContainer = (containerRef, messages) => {
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [containerRef, messages]);
};