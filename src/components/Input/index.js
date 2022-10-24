import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const variants = {
  OutlineBluegray400: "bg-white_A700 border border-bluegray_400 border-solid",
  OutlineBluegray100:
    "bg-white_A700 outline outline-[1px] outline-bluegray_100",
  edittext2: "",
  OutlineBluegray1001_2: "outline outline-[1px] outline-bluegray_100",
  srcOutlineGray30066: "bg-teal_A400_26 border border-gray_300_66 border-solid",
};
const shapes = {
  RoundedBorder5: "rounded-radius5",
  srcCircleBorder29: "rounded-radius29",
};
const sizes = {
  sm: "",
  md: "lg:pb-[27px] xl:pb-[31px] pb-[35px] 3xl:pb-[42px]",
  smSrc: "p-[20px]",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`${wrapClassName} ${shapes[shape] || ""} ${variants[variant] || ""
            } ${sizes[size] || ""}`}>
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            placeholder={placeholder}
            {...restProps} />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf(["RoundedBorder5", "srcCircleBorder29"]),
  variant: PropTypes.oneOf([
    "OutlineBluegray400",
    "OutlineBluegray100",
    "edittext2",
    "OutlineBluegray1001_2",
    "srcOutlineGray30066",
  ]),
  size: PropTypes.oneOf(["sm", "md", "smSrc"]),
};
Input.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  shape: "RoundedBorder5",
  variant: "OutlineBluegray400",
  size: "",
};

export { Input };
