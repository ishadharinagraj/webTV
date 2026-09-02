import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import "./styles.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children, autoSlideInterval = 7000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = React.Children.count(children);

  const updateIndex = (newIndex) => {
    if (count === 0) return;
    if (newIndex < 0) {
      newIndex = count - 1;
    } else if (newIndex >= count) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (!children || count <= 1 || paused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    }, autoSlideInterval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [children, count, paused, autoSlideInterval]);

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="carousel-login"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        {React.Children.map(children, (child, index) => {
          return (
            <div
              className={index === activeIndex ? "active-indicator" : "indicator"}
              onClick={() => {
                updateIndex(index);
              }}
            >
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
