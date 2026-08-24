import { useState, useRef, useEffect } from "react";
import "./styles.css";

const Scrollable = ({ children, style, showArrows = true }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator?.userAgent));
  }, []);

  const listRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const updateScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      const isOverflowing = scrollWidth > clientWidth + 10;
      setCanScrollLeft(isOverflowing && scrollLeft > 5);
      setCanScrollRight(isOverflowing && scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    updateScroll();
    const el = listRef.current;
    if (el) {
      el.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("resize", updateScroll, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [children]);

  const handleRedirect = (action) => {
    if (listRef.current && listRef.current.childNodes) {
      listRef.current.childNodes.forEach((el) => {
        if (el.style) el.style.pointerEvents = action;
      });
    }
  };

  const stopDragging = () => {
    isMouseDownRef.current = false;
    handleRedirect("auto");
    setTimeout(updateScroll, 100);
  };

  const handleListDown = (e) => {
    if (!listRef.current) return;
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - listRef.current.offsetLeft;
    scrollLeftRef.current = listRef.current.scrollLeft;
  };

  const handlelistMove = (e) => {
    if (isMouseDownRef.current && listRef.current) {
      e.preventDefault();
      const x = e.pageX - listRef.current.offsetLeft;
      const scroll = x - startXRef.current;
      listRef.current.scrollLeft = scrollLeftRef.current - scroll;
      handleRedirect("none");
      updateScroll();
    }
  };

  const handleTouchStart = (e) => {
    if (!listRef.current) return;
    isMouseDownRef.current = true;
    startXRef.current = e.touches[0].clientX - listRef.current.offsetLeft;
    scrollLeftRef.current = listRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (isMouseDownRef.current && listRef.current) {
      const x = e.touches[0].clientX - listRef.current.offsetLeft;
      const scroll = x - startXRef.current;
      listRef.current.scrollLeft = scrollLeftRef.current - scroll;
      updateScroll();
    }
  };

  const scrollByAmount = (direction) => {
    if (listRef.current) {
      const amount = 550;
      listRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
      setTimeout(updateScroll, 350);
    }
  };

  return (
    <div className="scrollable-container" style={{ position: "relative" }}>
      {showArrows && (
        <>
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount("left")}
              className="row-scroll-arrow left"
              title="Scroll Left"
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollByAmount("right")}
              className="row-scroll-arrow right"
              title="Scroll Right"
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </>
      )}
      <div
        style={style}
        className="scrollable-list"
        onMouseDown={!isMobile ? handleListDown : () => {}}
        onMouseUp={!isMobile ? stopDragging : () => {}}
        onMouseLeave={!isMobile ? stopDragging : () => {}}
        onMouseMove={!isMobile ? handlelistMove : () => {}}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDragging}
        ref={listRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Scrollable;