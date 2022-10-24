import React from "react";
import PropTypes from "prop-types";

const shapes = {
  RoundedBorder5: "rounded-radius5",
  RoundedBorder8: "rounded-radius8",
  RoundedBorder2: "rounded-radius2",
  icbCircleBorder8: "rounded-radius8",
  icbCircleBorder28: "rounded-radius28",
  icbRoundedBorder3: "rounded-radius3",
  icbRoundedBorder21: "rounded-radius215",
};
const variants = {
  OutlineTealA400: "border-bw075 border-solid border-teal_A400 text-teal_A400",
  FillTealA400: "bg-teal_A400 text-white_A700",
  OutlineWhiteA700: "border border-solid border-white_A700 text-white_A700",
  OutlineGray401:
    "bg-gray_100 border border-gray_401 border-solid text-gray_800",
  FillGray50: "bg-gray_50 text-bluegray_400",
  OutlineGray601: "border border-gray_601 border-solid text-bluegray_400",
  FillYellowA700: "bg-yellow_A700 text-bluegray_900",
  FillBlack901: "bg-black_901 text-white_A700",
  OutlineGray6011_2:
    "bg-white_A700 border border-gray_601 border-solid text-bluegray_400",
  OutlineGray4011_2: "border-bw05 border-gray_401 border-solid",
  icbOutlineGray200: "border border-gray_200 border-solid",
  icbFillTealA400: "bg-teal_A400",
  icbFillGray507e: "bg-gray_50_7e",
  icbFillBluegray40019: "bg-bluegray_400_19",
  icbFillDeeppurpleA400: "bg-deep_purple_A400",
  icbFillLightblue300: "bg-light_blue_300",
  icbFillGreenA200: "bg-green_A200",
};
const sizes = {
  upload: 'py-[8px]',
  sm: "p-[8px]",
  md: "p-[11px]",
  lg: "p-[14px]",
  smIcn: "p-[4px]",
  mdIcn: "p-[11px]",
  lgIcn: "p-[17px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${shapes[shape] || ""} ${variants[variant] || ""
        } ${sizes[size] || ""} common-button `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf([
    "RoundedBorder5",
    "RoundedBorder8",
    "RoundedBorder2",
    "icbCircleBorder8",
    "icbCircleBorder28",
    "icbRoundedBorder3",
    "icbRoundedBorder21",
  ]),
  variant: PropTypes.oneOf([
    "OutlineTealA400",
    "FillTealA400",
    "OutlineWhiteA700",
    "OutlineGray401",
    "FillGray50",
    "OutlineGray601",
    "FillYellowA700",
    "FillBlack901",
    "OutlineGray6011_2",
    "OutlineGray4011_2",
    "icbOutlineGray200",
    "icbFillTealA400",
    "icbFillGray507e",
    "icbFillBluegray40019",
    "icbFillDeeppurpleA400",
    "icbFillLightblue300",
    "icbFillGreenA200",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "smIcn", "mdIcn", "lgIcn"]),
};
Button.defaultProps = {
  className: "",
  shape: "RoundedBorder5",
  variant: "icbOutlineGray200",
  size: "sm",
};

export { Button };
