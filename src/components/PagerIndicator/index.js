import React from "react";

const PagerIndicator = ({
  className,
  activeCss,
  inactiveCss,
  sliderRef,
  count,
  activeIndex,
  selectedWrapperCss = "",
  unselectedWrapperCss = "",
}) => {
  const [slidesToShow, setSlidesToShow] = React.useState();

  React.useEffect(() => {
    const _slidesToShow = sliderRef?.current?.state?.itemsInSlide;
    setSlidesToShow(_slidesToShow);
  }, [sliderRef]);

  return (
    <div className={className}>
      {Array(count)
        .fill(0)
        .map((_, i) => {
          let isActive = false;
          if (
            activeIndex >= i * slidesToShow &&
            activeIndex < (i + 1) * slidesToShow
          ) {
            isActive = true;
          }

          return (
            <div
              key={"indicator" + i}
              className={`${
                isActive ? selectedWrapperCss : unselectedWrapperCss
              } `}
            >
              <span
                className={`${
                  isActive ? activeCss : inactiveCss
                } slider-indicator`}
                onClick={() => sliderRef?.current?.slideTo(i * slidesToShow)}
              />
            </div>
          );
        })}
    </div>
  );
};

export { PagerIndicator };
