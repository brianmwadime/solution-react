import { SelectBox } from "Components";
export default {
  title: "solution_react_frontend/SelectBox",
  component: SelectBox,
  argTypes: {
    options: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
};

export const SampleSelectbox = (args) => <SelectBox {...args} />;

SampleSelectbox.args = {
  placeholder: "Select",
  shape: "RoundedBorder4",
  variant: "OutlineGray800",
  size: "sm",
  className: "w-[300px]",
};
