import { CheckBox } from "Components";
export default {
  title: "solution_react_frontend/CheckBox",
  component: CheckBox,
};

export const SampleCheckbox = (args) => <CheckBox {...args} />;

SampleCheckbox.args = {
  label: "Checkbox",
  shape: "RoundedBorder5",
  variant: "OutlineBluegray100",
  size: "sm",
  inputClassName: "mr-1",
};
