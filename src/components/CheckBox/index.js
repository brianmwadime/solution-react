import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const variants = {
  OutlineBluegray100:
    "bg-white_A700 outline outline-[1px] outline-bluegray_100",
  FillTealA400b4: "bg-teal_A400_b4",
};
const shapes = { RoundedBorder5: "rounded-radius5" };
const sizes = { sm: "p-[3px]" };

const CheckBox = React.forwardRef(
  (
    {
      inputClassName,
      className,
      name,
      children,
      label,
      errors = [],
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div className={className}>
          <input
            className={`${inputClassName} ${shapes[shape] || ""} ${variants[variant] || ""
              } ${sizes[size] || ""}`}
            ref={ref}
            type="checkbox"
            name={name}
            {...restProps}
          />
          {label}
        </div>
        <ErrorMessage errors={errors} />
        {children}
      </>
    );
  }
);

CheckBox.propTypes = {
  inputClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  shape: PropTypes.oneOf(["RoundedBorder5"]),
  variant: PropTypes.oneOf(["OutlineBluegray100", "FillTealA400b4"]),
  size: PropTypes.oneOf(["sm"]),
};
CheckBox.defaultProps = {
  inputClassName: "",
  className: "",
  name: "",
  label: "",
  shape: "",
  variant: "OutlineBluegray100",
  size: "",
};

export { CheckBox };
